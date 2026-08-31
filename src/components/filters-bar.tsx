import { LayoutGrid, List, Search, X } from "lucide-react";
import type { Filters, Gender, SortKey, SourceDocument, ViewMode } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function FiltersBar({
  filters,
  retailers,
  documents,
  viewMode,
  sortKey,
  onFilters,
  onReset,
  onViewMode,
  onSortKey,
}: {
  filters: Filters;
  retailers: string[];
  documents: SourceDocument[];
  viewMode: ViewMode;
  sortKey: SortKey;
  onFilters: (patch: Partial<Filters>) => void;
  onReset: () => void;
  onViewMode: (mode: ViewMode) => void;
  onSortKey: (key: SortKey) => void;
}) {
  const hasActive =
    filters.query ||
    filters.retailer !== "all" ||
    filters.gender !== "all" ||
    filters.sourceId !== "all" ||
    filters.fromDate ||
    filters.toDate;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.query}
          onChange={(e) => onFilters({ query: e.target.value })}
          placeholder="Search name, case, store, or charge"
          className="h-11 rounded-lg pl-10"
        />
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:flex-1">
          <Select value={filters.retailer} onValueChange={(v) => onFilters({ retailer: v })}>
            <SelectTrigger className="min-h-11 bg-card">
              <SelectValue placeholder="Retailer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All retailers</SelectItem>
              {retailers.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.gender}
            onValueChange={(v) => onFilters({ gender: v as Gender | "all" })}
          >
            <SelectTrigger className="min-h-11 bg-card">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All genders</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.sourceId} onValueChange={(v) => onFilters({ sourceId: v })}>
            <SelectTrigger className="min-h-11 bg-card">
              <SelectValue placeholder="Report" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All reports</SelectItem>
              {documents.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.fileName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortKey} onValueChange={(v) => onSortKey(v as SortKey)}>
            <SelectTrigger className="min-h-11 bg-card">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="arrestedAt">Sort by date</SelectItem>
              <SelectItem value="fullName">Sort by name</SelectItem>
              <SelectItem value="retailer">Sort by retailer</SelectItem>
              <SelectItem value="caseNumber">Sort by case</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            aria-label="From date"
            value={filters.fromDate}
            onChange={(e) => onFilters({ fromDate: e.target.value })}
            className="h-11 min-w-0 flex-1 bg-card lg:w-36 lg:flex-none"
          />
          <span className="text-xs text-muted-foreground">to</span>
          <Input
            type="date"
            aria-label="To date"
            value={filters.toDate}
            onChange={(e) => onFilters({ toDate: e.target.value })}
            className="h-11 min-w-0 flex-1 bg-card lg:w-36 lg:flex-none"
          />
          <div className="flex rounded-lg bg-muted p-1">
            <button
              type="button"
              aria-label="Card view"
              onClick={() => onViewMode("cards")}
              className={cn(
                "flex size-9 items-center justify-center rounded-md transition-colors",
                viewMode === "cards" ? "bg-card text-foreground shadow-border" : "text-muted-foreground",
              )}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Table view"
              onClick={() => onViewMode("table")}
              className={cn(
                "flex size-9 items-center justify-center rounded-md transition-colors",
                viewMode === "table" ? "bg-card text-foreground shadow-border" : "text-muted-foreground",
              )}
            >
              <List className="size-4" />
            </button>
          </div>
          {hasActive && (
            <Button variant="ghost" size="icon" onClick={onReset} aria-label="Clear filters">
              <X />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
