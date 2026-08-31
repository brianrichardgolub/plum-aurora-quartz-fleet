import { formatArrestDateTime, formatGender } from "@/lib/format";
import type { ArrestRecord } from "@/lib/types";

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

export function recordsToCsv(records: ArrestRecord[]): string {
  const header = [
    "Name",
    "Gender",
    "Case number",
    "Arrested",
    "Retailer",
    "Charges",
    "Location",
    "Notes",
    "Source file",
  ];
  const rows = records.map((r) =>
    [
      r.fullName,
      formatGender(r.gender),
      r.caseNumber,
      formatArrestDateTime(r.arrestedAt),
      r.retailer,
      r.charges,
      r.location,
      r.notes,
      r.sourceFileName,
    ]
      .map(csvEscape)
      .join(","),
  );
  return [header.join(","), ...rows].join("\n");
}

export function downloadText(filename: string, contents: string, mime: string) {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
