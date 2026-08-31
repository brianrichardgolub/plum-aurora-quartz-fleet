import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { formatArrestDateTime, formatGender } from "@/lib/format";
import type { ArrestRecord } from "@/lib/types";
import { Portrait } from "@/components/portrait";
import { emptyDraft, RecordForm, type RecordDraft } from "@/components/record-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function ArrestDetail({
  record,
  open,
  onOpenChange,
  onSave,
  onDelete,
}: {
  record: ArrestRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, patch: Partial<ArrestRecord>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<RecordDraft>(emptyDraft());

  useEffect(() => {
    if (record) {
      setDraft({
        fullName: record.fullName,
        gender: record.gender,
        caseNumber: record.caseNumber,
        arrestedAt: record.arrestedAt,
        retailer: record.retailer,
        charges: record.charges,
        location: record.location,
        notes: record.notes,
        photo: record.photo,
      });
      setEditing(false);
    }
  }, [record]);

  if (!record) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{record.fullName || "Unnamed"}</SheetTitle>
          <SheetDescription className="tabular-nums">
            {record.caseNumber || "No case number"}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="space-y-5 p-6">
            <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
              <Portrait name={record.fullName} photo={record.photo} />
            </div>
            {record.isSample && <Badge variant="secondary">Sample record</Badge>}
            {editing ? (
              <RecordForm value={draft} onChange={setDraft} />
            ) : (
              <dl className="grid gap-4 text-sm">
                <Row label="Gender" value={formatGender(record.gender)} />
                <Row label="Arrested" value={formatArrestDateTime(record.arrestedAt)} />
                <Row label="Retailer" value={record.retailer || "—"} />
                <Row label="Charges" value={record.charges || "—"} />
                <Row label="Location" value={record.location || "—"} />
                <Row label="Source" value={record.sourceFileName} />
                {record.notes ? <Row label="Notes" value={record.notes} /> : null}
              </dl>
            )}
          </div>
        </ScrollArea>
        <SheetFooter className="flex-row gap-2 border-t border-border">
          {editing ? (
            <>
              <Button variant="outline" className="flex-1" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={async () => {
                  await onSave(record.id, draft);
                  setEditing(false);
                }}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="flex-1" onClick={() => setEditing(true)}>
                <Pencil />
                Edit
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={async () => {
                  await onDelete(record.id);
                  onOpenChange(false);
                }}
              >
                <Trash2 />
                Remove
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}
