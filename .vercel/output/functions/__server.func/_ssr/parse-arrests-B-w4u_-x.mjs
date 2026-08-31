import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parse-arrests-B-w4u_-x.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var imageSchema = object({
	id: string(),
	mime: _enum(["image/jpeg", "image/png"]),
	dataBase64: string().max(9e5),
	width: number(),
	height: number(),
	kind: _enum(["mugshot", "page"])
});
var inputSchema = object({
	fileName: string(),
	pageCount: number(),
	text: string().max(3e4),
	images: array(imageSchema).max(16)
});
function normalizeGender(value) {
	const s = String(value ?? "").trim().toLowerCase();
	if (s === "m" || s === "male" || s === "man") return "male";
	if (s === "f" || s === "female" || s === "woman") return "female";
	return "unknown";
}
function normalizeDate(value) {
	if (value == null) return null;
	const raw = String(value).trim();
	if (!raw || raw.toLowerCase() === "null") return null;
	const parsed = new Date(raw);
	if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
	return raw;
}
function asString(value) {
	if (value == null) return "";
	return String(value).trim();
}
function extractJson(text) {
	const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(text);
	const body = fenced ? fenced[1] : text;
	const start = body.indexOf("{");
	const end = body.lastIndexOf("}");
	if (start === -1 || end === -1 || end <= start) throw new Error("Model did not return JSON");
	return JSON.parse(body.slice(start, end + 1));
}
function toRecords(raw, imageCount) {
	const obj = raw;
	return (Array.isArray(obj?.records) ? obj.records : Array.isArray(raw) ? raw : []).map((item) => {
		const row = item ?? {};
		const photoRaw = row.photoIndex;
		let photoIndex = null;
		if (typeof photoRaw === "number" && Number.isInteger(photoRaw)) photoIndex = photoRaw;
		else if (typeof photoRaw === "string" && photoRaw.trim() !== "") {
			const n = Number(photoRaw);
			if (Number.isInteger(n)) photoIndex = n;
		}
		if (photoIndex != null && (photoIndex < 0 || photoIndex >= imageCount)) photoIndex = null;
		return {
			fullName: asString(row.fullName || row.name),
			gender: normalizeGender(row.gender ?? row.sex),
			caseNumber: asString(row.caseNumber ?? row.case_number ?? row.incidentNumber),
			arrestedAt: normalizeDate(row.arrestedAt ?? row.dateTime ?? row.date),
			retailer: asString(row.retailer ?? row.store ?? row.locationName),
			charges: asString(row.charges ?? row.charge ?? row.offense),
			location: asString(row.location ?? row.address),
			notes: asString(row.notes),
			photoIndex
		};
	}).filter((r) => r.fullName || r.caseNumber);
}
var parseArrestReport_createServerFn_handler = createServerRpc({
	id: "50d1bb6c986facb34819b7c6ac7af7d5c568288f14b544b214543a24800755dd",
	name: "parseArrestReport",
	filename: "src/lib/parse-arrests.ts"
}, (opts) => parseArrestReport.__executeServer(opts));
var parseArrestReport = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(parseArrestReport_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI extraction is not available in this environment."
	};
	const imageNote = data.images.map((img, i) => `Image ${i}: ${img.kind} (${img.width}×${img.height}) id=${img.id}`).join("\n");
	const content = [{
		type: "text",
		text: `You extract structured arrest records from retail loss-prevention / police bulletin PDFs.

The document filename is: ${data.fileName}
Page count: ${data.pageCount}

Images attached (in order). photoIndex must be the 0-based index into this list, or null if none fits:
${imageNote || "(no images)"}

Extracted text (may be empty if the PDF is scanned):
${data.text || "(no selectable text — rely on the images)"}

Return ONLY a JSON object with this shape:
{
  "agency": "string or empty",
  "notes": "short document-level note or empty",
  "records": [
    {
      "fullName": "First Last",
      "gender": "male" | "female" | "unknown",
      "caseNumber": "police / case / incident number",
      "arrestedAt": "ISO 8601 datetime if possible, else original date string, else null",
      "retailer": "store or retailer name",
      "charges": "charge / offense if listed",
      "location": "store address or location line",
      "notes": "anything else useful",
      "photoIndex": 0
    }
  ]
}

Rules:
- One object per arrested person. A bulletin may contain several.
- gender: use the document's sex/gender field (M/F/Male/Female). If it is not stated, use "unknown". Do not guess from the name.
- photoIndex: the image that is THAT person's mugshot. Prefer kind=mugshot. If only page images are present and the page is clearly one person, use that page index. Otherwise null.
- Do not invent case numbers, names, or stores. Empty string if missing.
- Ignore logos, headers, and officer photos.`
	}];
	for (const img of data.images) content.push({
		type: "image_url",
		image_url: { url: `data:${img.mime};base64,${img.dataBase64}` }
	});
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			messages: [{
				role: "user",
				content
			}],
			temperature: .1,
			max_tokens: 6e3
		})
	});
	if (!res.ok) {
		const detail = await res.text().catch(() => "");
		return {
			ok: false,
			error: `Could not read this report (${res.status}). ${detail.slice(0, 180)}`.trim()
		};
	}
	const text = (await res.json()).choices?.[0]?.message?.content ?? "";
	if (!text) return {
		ok: false,
		error: "The extractor returned an empty response."
	};
	try {
		const parsed = extractJson(text);
		const records = toRecords(parsed, data.images.length);
		if (records.length === 0) return {
			ok: false,
			error: "No arrest records were found in this file. You can add people manually from the extracted text."
		};
		return {
			ok: true,
			records,
			agency: asString(parsed.agency),
			notes: asString(parsed.notes)
		};
	} catch {
		return {
			ok: false,
			error: "Could not parse the extractor response. Try another file, or add records by hand."
		};
	}
});
//#endregion
export { parseArrestReport_createServerFn_handler };
