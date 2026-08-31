import { create } from "zustand";
import type { ArrestRecord, Filters, SortKey, SourceDocument, ViewMode } from "@/lib/types";
import {
  clearSamples as clearSamplesDb,
  deleteDocument as deleteDocumentDb,
  deleteRecord as deleteRecordDb,
  loadAll,
  putDocument,
  putRecords,
  replaceAll,
} from "@/lib/storage";
import { SAMPLE_DOCUMENT, SAMPLE_RECORDS } from "@/lib/sample-data";

const EMPTY_FILTERS: Filters = {
  query: "",
  retailer: "all",
  gender: "all",
  sourceId: "all",
  fromDate: "",
  toDate: "",
};

type CasefileState = {
  ready: boolean;
  records: ArrestRecord[];
  documents: SourceDocument[];
  filters: Filters;
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  viewMode: ViewMode;
  selectedId: string | null;
  hydrate: () => Promise<void>;
  setFilters: (patch: Partial<Filters>) => void;
  resetFilters: () => void;
  setSort: (key: SortKey) => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedId: (id: string | null) => void;
  addBatch: (docs: SourceDocument[], records: ArrestRecord[], dropSamples: boolean) => Promise<void>;
  updateRecord: (id: string, patch: Partial<ArrestRecord>) => Promise<void>;
  removeRecord: (id: string) => Promise<void>;
  removeDocument: (id: string) => Promise<void>;
  clearSamples: () => Promise<void>;
};

function matches(record: ArrestRecord, filters: Filters): boolean {
  const q = filters.query.trim().toLowerCase();
  if (q) {
    const hay = [
      record.fullName,
      record.caseNumber,
      record.retailer,
      record.charges,
      record.location,
      record.notes,
    ]
      .join(" ")
      .toLowerCase();
    if (!hay.includes(q)) return false;
  }
  if (filters.retailer !== "all" && record.retailer !== filters.retailer) return false;
  if (filters.gender !== "all" && record.gender !== filters.gender) return false;
  if (filters.sourceId !== "all" && record.sourceId !== filters.sourceId) return false;
  if (filters.fromDate) {
    const from = `${filters.fromDate}T00:00:00.000Z`;
    if ((record.arrestedAt ?? "") < from) return false;
  }
  if (filters.toDate) {
    const to = `${filters.toDate}T23:59:59.999Z`;
    if ((record.arrestedAt ?? "") > to) return false;
  }
  return true;
}

export function filterRecords(
  records: ArrestRecord[],
  filters: Filters,
  sortKey: SortKey,
  sortDir: "asc" | "desc",
): ArrestRecord[] {
  const next = records.filter((r) => matches(r, filters));
  next.sort((a, b) => {
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    const cmp = String(av).localeCompare(String(bv), undefined, { sensitivity: "base" });
    return sortDir === "asc" ? cmp : -cmp;
  });
  return next;
}

export const useCasefile = create<CasefileState>((set, get) => ({
  ready: false,
  records: [],
  documents: [],
  filters: EMPTY_FILTERS,
  sortKey: "arrestedAt",
  sortDir: "desc",
  viewMode: "cards",
  selectedId: null,

  hydrate: async () => {
    const data = await loadAll();
    if (data.records.length === 0 && data.documents.length === 0) {
      await replaceAll({ records: SAMPLE_RECORDS, documents: [SAMPLE_DOCUMENT] });
      set({
        ready: true,
        records: SAMPLE_RECORDS,
        documents: [SAMPLE_DOCUMENT],
      });
      return;
    }
    set({ ready: true, records: data.records, documents: data.documents });
  },

  setFilters: (patch) => set({ filters: { ...get().filters, ...patch } }),
  resetFilters: () => set({ filters: EMPTY_FILTERS }),
  setSort: (key) => {
    const { sortKey, sortDir } = get();
    if (sortKey === key) {
      set({ sortDir: sortDir === "asc" ? "desc" : "asc" });
    } else {
      set({
        sortKey: key,
        sortDir: key === "fullName" || key === "retailer" ? "asc" : "desc",
      });
    }
  },
  setViewMode: (mode) => set({ viewMode: mode }),
  setSelectedId: (id) => set({ selectedId: id }),

  addBatch: async (docs, records, dropSamples) => {
    let nextRecords = get().records;
    let nextDocs = get().documents;
    if (dropSamples) {
      await clearSamplesDb();
      nextRecords = nextRecords.filter((r) => !r.isSample);
      nextDocs = nextDocs.filter((d) => !d.id.startsWith("sample-"));
    }
    nextRecords = [...records, ...nextRecords];
    nextDocs = [...docs, ...nextDocs];
    await putRecords(records);
    for (const d of docs) await putDocument(d);
    set({ records: nextRecords, documents: nextDocs });
  },

  updateRecord: async (id, patch) => {
    const records = get().records.map((r) => (r.id === id ? { ...r, ...patch } : r));
    const updated = records.find((r) => r.id === id);
    if (updated) await putRecords([updated]);
    set({ records });
  },

  removeRecord: async (id) => {
    await deleteRecordDb(id);
    set({
      records: get().records.filter((r) => r.id !== id),
      selectedId: get().selectedId === id ? null : get().selectedId,
    });
  },

  removeDocument: async (id) => {
    await deleteDocumentDb(id);
    set({
      records: get().records.filter((r) => r.sourceId !== id),
      documents: get().documents.filter((d) => d.id !== id),
      selectedId: get().records.find((r) => r.id === get().selectedId)?.sourceId === id
        ? null
        : get().selectedId,
    });
  },

  clearSamples: async () => {
    await clearSamplesDb();
    set({
      records: get().records.filter((r) => !r.isSample),
      documents: get().documents.filter((d) => !d.id.startsWith("sample-")),
    });
  },
}));
