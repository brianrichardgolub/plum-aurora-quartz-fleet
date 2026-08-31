import type { ExtractedImage, ExtractedPdf } from "@/lib/types";

const MAX_PAGES = 12;
const MAX_MUGSHOTS = 16;
const PAGE_WIDTH = 720;
const MUGSHOT_MIN = 72;
const RICH_TEXT_CHARS = 350;

function canvasToJpeg(canvas: HTMLCanvasElement, quality = 0.55): string {
  return canvas.toDataURL("image/jpeg", quality).split(",")[1] ?? "";
}

function getPageObject(
  page: { objs: { get: (id: string, cb?: (v: unknown) => void) => unknown } },
  name: string,
): Promise<unknown> {
  return new Promise((resolve) => {
    try {
      page.objs.get(name, resolve);
    } catch {
      resolve(null);
    }
  });
}

function imageDataToJpeg(
  width: number,
  height: number,
  data: Uint8ClampedArray | Uint8Array,
): string | null {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const imageData = ctx.createImageData(width, height);
  if (data.length === width * height * 4) {
    imageData.data.set(data);
  } else if (data.length === width * height * 3) {
    for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
      imageData.data[j] = data[i]!;
      imageData.data[j + 1] = data[i + 1]!;
      imageData.data[j + 2] = data[i + 2]!;
      imageData.data[j + 3] = 255;
    }
  } else if (data.length === width * height) {
    for (let i = 0, j = 0; i < data.length; i += 1, j += 4) {
      const v = data[i]!;
      imageData.data[j] = v;
      imageData.data[j + 1] = v;
      imageData.data[j + 2] = v;
      imageData.data[j + 3] = 255;
    }
  } else {
    return null;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvasToJpeg(canvas, 0.72);
}

function shrinkBase64(dataBase64: string, mime: "image/jpeg" | "image/png", maxEdge: number, quality: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataBase64);
        return;
      }
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality).split(",")[1] ?? dataBase64);
    };
    img.onerror = () => resolve(dataBase64);
    img.src = `data:${mime};base64,${dataBase64}`;
  });
}

export function resizeDataUrl(dataUrl: string, maxEdge = 360): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.fillStyle = "#1a1814";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export async function extractPdf(file: File): Promise<ExtractedPdf> {
  const pdfjs = await import("pdfjs-dist");
  const workerUrl = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const pageCount = doc.numPages;
  const pagesToRead = Math.min(pageCount, MAX_PAGES);

  const textParts: string[] = [];
  const mugshots: ExtractedImage[] = [];
  const pages: ExtractedImage[] = [];

  for (let i = 1; i <= pagesToRead; i += 1) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (pageText) textParts.push(`--- Page ${i} ---\n${pageText}`);

    try {
      const ops = await page.getOperatorList();
      const seen = new Set<string>();
      for (let k = 0; k < ops.fnArray.length; k += 1) {
        if (ops.fnArray[k] !== pdfjs.OPS.paintImageXObject) continue;
        const args = ops.argsArray[k] as unknown[] | undefined;
        const name = typeof args?.[0] === "string" ? args[0] : undefined;
        if (!name || seen.has(name)) continue;
        seen.add(name);
        try {
          const img = (await getPageObject(page, name)) as {
            width?: number;
            height?: number;
            data?: Uint8ClampedArray | Uint8Array;
          } | null;
          if (!img?.data || !img.width || !img.height) continue;
          if (img.width < MUGSHOT_MIN || img.height < MUGSHOT_MIN) continue;
          const ratio = img.width / img.height;
          if (ratio > 2.4 || ratio < 0.35) continue;
          const jpeg = imageDataToJpeg(img.width, img.height, img.data);
          if (!jpeg) continue;
          const shrunk = await shrinkBase64(jpeg, "image/jpeg", 420, 0.7);
          mugshots.push({
            id: `mug-${i}-${mugshots.length}`,
            mime: "image/jpeg",
            dataBase64: shrunk,
            width: img.width,
            height: img.height,
            kind: "mugshot",
          });
          if (mugshots.length >= MAX_MUGSHOTS) break;
        } catch {
          // Image object not ready or unsupported color space.
        }
      }
    } catch {
      // Operator list unavailable on some PDFs.
    }

    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: PAGE_WIDTH / base.width });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      await page.render({ canvasContext: ctx, viewport }).promise;
      pages.push({
        id: `page-${i}`,
        mime: "image/jpeg",
        dataBase64: canvasToJpeg(canvas, 0.48),
        width: canvas.width,
        height: canvas.height,
        kind: "page",
      });
    }
  }

  const text = textParts.join("\n\n").slice(0, 24000);
  const textIsRich = text.length >= RICH_TEXT_CHARS;
  let images: ExtractedImage[] = [];
  if (mugshots.length > 0) {
    images = mugshots;
  } else if (!textIsRich) {
    images = pages.slice(0, 6);
  }

  return {
    fileName: file.name,
    pageCount,
    text,
    images,
  };
}

export function imageToDataUrl(image: ExtractedImage): string {
  return `data:${image.mime};base64,${image.dataBase64}`;
}
