import type { ReactNode } from "react";
import { fromDatetimeLocal, toDatetimeLocal } from "@/lib/format";
import type { ArrestRecord, Gender } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type RecordDraft = Omit<
  ArrestRecord,
  "id" | "createdAt" | "sourceId" | "sourceFileName" | "isSample" | "photo"
> & {
  photo: string | null;
};

export function emptyDraft(): RecordDraft {
  return {
    fullName: "",
    gender: "unknown",
    caseNumber: "",
    arrestedAt: null,
    retailer: "",
    charges: "",
    location: "",
    notes: "",
    photo: null,
  };
}

export function RecordForm({
  value,
  onChange,
}: {
  value: RecordDraft;
  onChange: (next: RecordDraft) => void;
}) {
  const set = (patch: Partial<RecordDraft>) => onChange({ ...value, ...patch });

  return (
    <div className="grid gap-4">
      <Field label="Name">
        <Input value={value.fullName} onChange={(e) => set({ fullName: e.target.value })} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Case number">
          <Input
            className="tabular-nums"
            value={value.caseNumber}
            onChange={(e) => set({ caseNumber: e.target.value })}
          />
        </Field>
        <Field label="Gender">
          <Select value={value.gender} onValueChange={(g) => set({ gender: g as Gender })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Arrested">
          <Input
            type="datetime-local"
            value={toDatetimeLocal(value.arrestedAt)}
            onChange={(e) => set({ arrestedAt: fromDatetimeLocal(e.target.value) })}
          />
        </Field>
        <Field label="Retailer">
          <Input value={value.retailer} onChange={(e) => set({ retailer: e.target.value })} />
        </Field>
      </div>
      <Field label="Charges">
        <Input value={value.charges} onChange={(e) => set({ charges: e.target.value })} />
      </Field>
      <Field label="Location">
        <Input value={value.location} onChange={(e) => set({ location: e.target.value })} />
      </Field>
      <Field label="Notes">
        <Textarea value={value.notes} onChange={(e) => set({ notes: e.target.value })} rows={3} />
      </Field>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
