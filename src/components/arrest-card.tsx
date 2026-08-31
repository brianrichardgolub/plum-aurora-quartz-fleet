import { formatArrestDate, formatGender } from "@/lib/format";
import type { ArrestRecord } from "@/lib/types";
import { Portrait } from "@/components/portrait";
import { Badge } from "@/components/ui/badge";

export function ArrestCard({
  record,
  onOpen,
}: {
  record: ArrestRecord;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-xl bg-card text-left shadow-border transition-[box-shadow,transform] duration-150 ease-out hover:shadow-border-hover active:scale-[0.99]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Portrait name={record.fullName} photo={record.photo} />
        {record.isSample && (
          <Badge className="absolute left-2 top-2" variant="secondary">
            Sample
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <h3 className="font-serif text-lg font-medium leading-snug tracking-tight text-foreground">
          {record.fullName || "Unnamed"}
        </h3>
        <p className="text-xs tabular-nums tracking-wide text-muted-foreground">
          {record.caseNumber || "No case number"}
        </p>
        <p className="truncate text-sm text-foreground/80">{record.retailer || "Retailer unknown"}</p>
        <div className="mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>{formatArrestDate(record.arrestedAt)}</span>
          <span>{formatGender(record.gender)}</span>
        </div>
      </div>
    </button>
  );
}
