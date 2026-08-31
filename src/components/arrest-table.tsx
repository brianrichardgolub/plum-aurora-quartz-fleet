import { ArrowDown, ArrowUp } from "lucide-react";
import { formatArrestDateTime, formatGender } from "@/lib/format";
import type { ArrestRecord, SortKey } from "@/lib/types";
import { Portrait } from "@/components/portrait";
import { cn } from "@/lib/utils";

const COLUMNS: { key: SortKey; label: string; className?: string }[] = [
  { key: "fullName", label: "Name" },
  { key: "caseNumber", label: "Case", className: "hidden sm:table-cell" },
  { key: "retailer", label: "Retailer", className: "hidden md:table-cell" },
  { key: "arrestedAt", label: "Arrested" },
];

export function ArrestTable({
  records,
  sortKey,
  sortDir,
  onSort,
  onOpen,
}: {
  records: ArrestRecord[];
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (key: SortKey) => void;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              {COLUMNS.map((col) => (
                <th key={col.key} className={cn("px-4 py-3 font-medium", col.className)}>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 hover:text-foreground"
                    onClick={() => onSort(col.key)}
                  >
                    {col.label}
                    {sortKey === col.key &&
                      (sortDir === "asc" ? (
                        <ArrowUp className="size-3.5" />
                      ) : (
                        <ArrowDown className="size-3.5" />
                      ))}
                  </button>
                </th>
              ))}
              <th className="hidden px-4 py-3 font-medium lg:table-cell">Gender</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                className="cursor-pointer border-b border-border last:border-0 hover:bg-accent/60"
                onClick={() => onOpen(record.id)}
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="size-10 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Portrait name={record.fullName} photo={record.photo} />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{record.fullName || "Unnamed"}</div>
                      <div className="truncate text-xs text-muted-foreground md:hidden">
                        {record.retailer}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-2.5 tabular-nums text-muted-foreground sm:table-cell">
                  {record.caseNumber || "—"}
                </td>
                <td className="hidden px-4 py-2.5 md:table-cell">{record.retailer || "—"}</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {formatArrestDateTime(record.arrestedAt)}
                </td>
                <td className="hidden px-4 py-2.5 text-muted-foreground lg:table-cell">
                  {formatGender(record.gender)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
