import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, FilePlus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ArrestCard } from "@/components/arrest-card";
import { ArrestDetail } from "@/components/arrest-detail";
import { ArrestTable } from "@/components/arrest-table";
import { FiltersBar } from "@/components/filters-bar";
import { ManualRecordDialog } from "@/components/manual-record-dialog";
import { UploadDialog } from "@/components/upload-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { downloadText, recordsToCsv } from "@/lib/export";
import { filterRecords, useCasefile } from "@/store/casefile";
import type { ArrestRecord } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const ready = useCasefile((s) => s.ready);
  const records = useCasefile((s) => s.records);
  const documents = useCasefile((s) => s.documents);
  const filters = useCasefile((s) => s.filters);
  const sortKey = useCasefile((s) => s.sortKey);
  const sortDir = useCasefile((s) => s.sortDir);
  const viewMode = useCasefile((s) => s.viewMode);
  const selectedId = useCasefile((s) => s.selectedId);
  const hydrate = useCasefile((s) => s.hydrate);
  const setFilters = useCasefile((s) => s.setFilters);
  const resetFilters = useCasefile((s) => s.resetFilters);
  const setSort = useCasefile((s) => s.setSort);
  const setViewMode = useCasefile((s) => s.setViewMode);
  const setSelectedId = useCasefile((s) => s.setSelectedId);
  const addBatch = useCasefile((s) => s.addBatch);
  const updateRecord = useCasefile((s) => s.updateRecord);
  const removeRecord = useCasefile((s) => s.removeRecord);
  const clearSamples = useCasefile((s) => s.clearSamples);

  const [uploadOpen, setUploadOpen] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const visible = useMemo(
    () => filterRecords(records, filters, sortKey, sortDir),
    [records, filters, sortKey, sortDir],
  );
  const retailers = useMemo(() => {
    const set = new Set(records.map((r) => r.retailer).filter(Boolean));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [records]);
  const selected = records.find((r) => r.id === selectedId) ?? null;
  const sampleCount = records.filter((r) => r.isSample).length;
  const caseNumbers = useMemo(() => {
    const set = new Set<string>();
    for (const r of records) {
      if (r.caseNumber) set.add(r.caseNumber.trim().toLowerCase());
    }
    return set;
  }, [records]);

  const male = records.filter((r) => r.gender === "male").length;
  const female = records.filter((r) => r.gender === "female").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-y-0 left-0 w-1.5 bg-rule" aria-hidden />
      <header className="border-b border-border/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Local case desk
              </p>
              <h1 className="mt-1 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                Casefile
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                Upload arrest bulletins one at a time. Search the compiled file by name, retailer, date, or
                gender. Records stay on this device.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setManualOpen(true)}>
                <Plus />
                Add record
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      downloadText("casefile.csv", recordsToCsv(visible), "text/csv;charset=utf-8")
                    }
                  >
                    Download CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      downloadText(
                        "casefile.json",
                        JSON.stringify(stripPhotos(visible), null, 2),
                        "application/json",
                      )
                    }
                  >
                    Download JSON
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {sampleCount > 0 && (
                    <DropdownMenuItem onClick={() => void clearSamples()}>
                      <Trash2 className="size-4" />
                      Remove sample records
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setUploadOpen(true)}>
                <FilePlus />
                Upload report
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="On file" value={records.length} />
            <Stat label="Retailers" value={retailers.length} />
            <Stat label="Male / Female" value={`${male} / ${female}`} />
            <Stat label="Reports" value={documents.length} />
          </dl>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <FiltersBar
          filters={filters}
          retailers={retailers}
          documents={documents}
          viewMode={viewMode}
          sortKey={sortKey}
          onFilters={setFilters}
          onReset={resetFilters}
          onViewMode={setViewMode}
          onSortKey={(key) => {
            if (sortKey === key) setSort(key);
            else {
              useCasefile.setState({
                sortKey: key,
                sortDir: key === "fullName" || key === "retailer" ? "asc" : "desc",
              });
            }
          }}
        />

        {!ready ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <EmptyState onUpload={() => setUploadOpen(true)} onManual={() => setManualOpen(true)} />
        ) : viewMode === "cards" ? (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((record) => (
              <ArrestCard key={record.id} record={record} onOpen={() => setSelectedId(record.id)} />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <ArrestTable
              records={visible}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={setSort}
              onOpen={setSelectedId}
            />
          </div>
        )}

        {ready && visible.length > 0 && (
          <p className="mt-6 text-center text-sm tabular-nums text-muted-foreground">
            Showing {visible.length} of {records.length}
          </p>
        )}
      </main>

      <ArrestDetail
        record={selected}
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
        onSave={updateRecord}
        onDelete={async (id) => {
          await removeRecord(id);
          toast.success("Record removed");
        }}
      />
      <UploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        existingCaseNumbers={caseNumbers}
        hasSamples={sampleCount > 0}
        onCommit={addBatch}
      />
      <ManualRecordDialog
        open={manualOpen}
        onOpenChange={setManualOpen}
        onSave={async (record) => {
          await addBatch(
            record.sourceId === "manual" && !documents.some((d) => d.id === "manual")
              ? [
                  {
                    id: "manual",
                    fileName: "Manual entry",
                    uploadedAt: record.createdAt,
                    recordCount: 1,
                    pageCount: 0,
                  },
                ]
              : [],
            [record],
            false,
          );
        }}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-card px-4 py-3 shadow-border">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-serif text-2xl tabular-nums tracking-tight">{value}</dd>
    </div>
  );
}

function EmptyState({ onUpload, onManual }: { onUpload: () => void; onManual: () => void }) {
  return (
    <div className="mt-10 rounded-xl bg-card px-6 py-16 text-center shadow-border">
      <h2 className="font-serif text-2xl font-medium">No matching records</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Adjust the filters, upload another bulletin, or add someone by hand.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button onClick={onUpload}>
          <FilePlus />
          Upload report
        </Button>
        <Button variant="outline" onClick={onManual}>
          <Plus />
          Add record
        </Button>
      </div>
    </div>
  );
}

function stripPhotos(records: ArrestRecord[]) {
  return records.map(({ photo: _photo, ...rest }) => rest);
}
