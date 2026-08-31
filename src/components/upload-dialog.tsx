import { useRef, useState } from "react";
import { FileUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { extractPdf, imageToDataUrl, resizeDataUrl } from "@/lib/pdf-extract";
import { parseArrestReport } from "@/lib/parse-arrests";
import { uid } from "@/lib/utils";
import type { ArrestRecord, ExtractedPdf, ParsedArrest, SourceDocument } from "@/lib/types";
import { Portrait } from "@/components/portrait";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatArrestDate, formatGender } from "@/lib/format";

type Stage = "idle" | "working" | "review" | "manual";

type ReviewRow = ParsedArrest & {
  included: boolean;
  photo: string | null;
  duplicate: boolean;
};

export function UploadDialog({
  open,
  onOpenChange,
  existingCaseNumbers,
  hasSamples,
  onCommit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingCaseNumbers: Set<string>;
  hasSamples: boolean;
  onCommit: (docs: SourceDocument[], records: ArrestRecord[], dropSamples: boolean) => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [status, setStatus] = useState("Reading PDF");
  const [error, setError] = useState<string | null>(null);
  const [extracted, setExtracted] = useState<ExtractedPdf | null>(null);
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [dropSamples, setDropSamples] = useState(true);
  const [dragOver, setDragOver] = useState(false);

  const reset = () => {
    setStage("idle");
    setStatus("Reading PDF");
    setError(null);
    setExtracted(null);
    setRows([]);
    setDropSamples(true);
  };

  const handleFiles = async (files: FileList | File[]) => {
    const file = Array.from(files).find((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
    if (!file) {
      setError("Please choose a PDF report.");
      return;
    }
    setError(null);
    setStage("working");
    setStatus("Reading pages and photos");
    try {
      const pdf = await extractPdf(file);
      setExtracted(pdf);
      setStatus("Identifying arrests");
      const result = await parseArrestReport({
        data: {
          fileName: pdf.fileName,
          pageCount: pdf.pageCount,
          text: pdf.text,
          images: pdf.images,
        },
      });
      if (!result.ok) {
        setError(result.error);
        setStage("manual");
        return;
      }
      const next: ReviewRow[] = [];
      for (const rec of result.records) {
        let photo: string | null = null;
        if (rec.photoIndex != null && pdf.images[rec.photoIndex]) {
          photo = await resizeDataUrl(imageToDataUrl(pdf.images[rec.photoIndex]!));
        }
        const caseKey = rec.caseNumber.trim().toLowerCase();
        next.push({
          ...rec,
          included: true,
          photo,
          duplicate: Boolean(caseKey) && existingCaseNumbers.has(caseKey),
        });
      }
      setRows(next);
      setStage("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read this PDF.");
      setStage("idle");
    }
  };

  const commit = async () => {
    if (!extracted) return;
    const selected = rows.filter((r) => r.included);
    if (selected.length === 0) {
      toast.error("Select at least one record to add.");
      return;
    }
    const sourceId = uid();
    const now = new Date().toISOString();
    const doc: SourceDocument = {
      id: sourceId,
      fileName: extracted.fileName,
      uploadedAt: now,
      recordCount: selected.length,
      pageCount: extracted.pageCount,
    };
    const records: ArrestRecord[] = selected.map((r) => ({
      id: uid(),
      fullName: r.fullName,
      gender: r.gender,
      caseNumber: r.caseNumber,
      arrestedAt: r.arrestedAt,
      retailer: r.retailer,
      charges: r.charges,
      location: r.location,
      notes: r.notes,
      photo: r.photo,
      sourceFileName: extracted.fileName,
      sourceId,
      createdAt: now,
    }));
    await onCommit([doc], records, hasSamples && dropSamples);
    toast.success(`Added ${records.length} ${records.length === 1 ? "record" : "records"}`);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden p-0">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle>Upload a report</DialogTitle>
            <DialogDescription>
              Drop one PDF. Casefile reads names, photos, case numbers, dates, retailers, and gender.
            </DialogDescription>
          </DialogHeader>
        </div>

        {stage === "idle" && (
          <div className="p-6">
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) void handleFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                void handleFiles(e.dataTransfer.files);
              }}
              className={`flex min-h-48 w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-10 text-center transition-colors ${
                dragOver ? "border-primary bg-accent" : "border-border bg-muted/40 hover:bg-accent"
              }`}
            >
              <FileUp className="size-8 text-muted-foreground" />
              <div>
                <p className="font-medium">Drop a PDF here</p>
                <p className="mt-1 text-sm text-muted-foreground">or click to choose a file</p>
              </div>
            </button>
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          </div>
        )}

        {stage === "working" && (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-10 text-center">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="font-medium">{status}</p>
            <p className="text-sm text-muted-foreground">This stays on your device until the extract step.</p>
          </div>
        )}

        {stage === "manual" && (
          <div className="space-y-4 p-6">
            <p className="text-sm text-destructive">{error}</p>
            {extracted?.text ? (
              <ScrollArea className="h-48 rounded-lg border border-border bg-muted/40 p-3">
                <pre className="whitespace-pre-wrap font-sans text-xs text-muted-foreground">
                  {extracted.text.slice(0, 4000)}
                </pre>
              </ScrollArea>
            ) : (
              <p className="text-sm text-muted-foreground">
                No selectable text was found. You can still add people with Add record after closing this.
              </p>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={reset}>
                Try another file
              </Button>
              <Button
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        )}

        {stage === "review" && (
          <div className="flex max-h-[70vh] flex-col">
            <p className="px-6 text-sm text-muted-foreground">
              {rows.length} {rows.length === 1 ? "person" : "people"} found in {extracted?.fileName}. Uncheck anyone you
              do not want to keep.
            </p>
            <ScrollArea className="mt-3 max-h-[46vh] px-6">
              <ul className="space-y-2 pb-2">
                {rows.map((row, i) => (
                  <li
                    key={`${row.caseNumber}-${i}`}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-2"
                  >
                    <Checkbox
                      checked={row.included}
                      onCheckedChange={(v) =>
                        setRows((prev) =>
                          prev.map((r, idx) => (idx === i ? { ...r, included: v === true } : r)),
                        )
                      }
                      className="ml-1"
                    />
                    <div className="size-14 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Portrait name={row.fullName} photo={row.photo} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-medium">{row.fullName || "Unnamed"}</p>
                        {row.duplicate && <Badge variant="outline">Already on file</Badge>}
                      </div>
                      <p className="truncate text-xs tabular-nums text-muted-foreground">
                        {row.caseNumber || "No case number"} · {formatGender(row.gender)}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {row.retailer || "Retailer unknown"} · {formatArrestDate(row.arrestedAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <div className="space-y-3 border-t border-border p-6">
              {hasSamples && (
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={dropSamples} onCheckedChange={(v) => setDropSamples(v === true)} />
                  Remove sample records when adding these
                </label>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={reset}>
                  Cancel
                </Button>
                <Button onClick={() => void commit()}>
                  Add {rows.filter((r) => r.included).length} to Casefile
                </Button>
              </DialogFooter>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
