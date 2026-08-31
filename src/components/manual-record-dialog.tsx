import { useState } from "react";
import { toast } from "sonner";
import { uid } from "@/lib/utils";
import type { ArrestRecord } from "@/lib/types";
import { emptyDraft, RecordForm, type RecordDraft } from "@/components/record-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ManualRecordDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (record: ArrestRecord) => Promise<void>;
}) {
  const [draft, setDraft] = useState<RecordDraft>(emptyDraft());

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setDraft(emptyDraft());
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a record</DialogTitle>
          <DialogDescription>Enter an arrest by hand when a report cannot be read.</DialogDescription>
        </DialogHeader>
        <RecordForm value={draft} onChange={setDraft} />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (!draft.fullName.trim() && !draft.caseNumber.trim()) {
                toast.error("Add a name or a case number.");
                return;
              }
              const now = new Date().toISOString();
              await onSave({
                id: uid(),
                ...draft,
                sourceFileName: "Manual entry",
                sourceId: "manual",
                createdAt: now,
              });
              toast.success("Record added");
              setDraft(emptyDraft());
              onOpenChange(false);
            }}
          >
            Save record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
