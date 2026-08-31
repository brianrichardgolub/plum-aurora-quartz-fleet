export type Gender = "male" | "female" | "unknown";

export type ViewMode = "cards" | "table";

export type SortKey = "arrestedAt" | "fullName" | "retailer" | "caseNumber";

export interface ArrestRecord {
  id: string;
  fullName: string;
  gender: Gender;
  caseNumber: string;
  arrestedAt: string | null;
  retailer: string;
  charges: string;
  location: string;
  notes: string;
  photo: string | null;
  sourceFileName: string;
  sourceId: string;
  createdAt: string;
  isSample?: boolean;
}

export interface SourceDocument {
  id: string;
  fileName: string;
  uploadedAt: string;
  recordCount: number;
  pageCount: number;
}

export interface ExtractedImage {
  id: string;
  mime: "image/jpeg" | "image/png";
  dataBase64: string;
  width: number;
  height: number;
  kind: "mugshot" | "page";
}

export interface ExtractedPdf {
  fileName: string;
  pageCount: number;
  text: string;
  images: ExtractedImage[];
}

export interface ParsedArrest {
  fullName: string;
  gender: Gender;
  caseNumber: string;
  arrestedAt: string | null;
  retailer: string;
  charges: string;
  location: string;
  notes: string;
  photoIndex: number | null;
}

export interface ParseResult {
  ok: true;
  records: ParsedArrest[];
  agency: string;
  notes: string;
}

export interface ParseFailure {
  ok: false;
  error: string;
}

export type Filters = {
  query: string;
  retailer: string;
  gender: Gender | "all";
  sourceId: string;
  fromDate: string;
  toDate: string;
};
