import { format, isValid, parseISO } from "date-fns";
import type { Gender } from "@/lib/types";

export function formatArrestDate(iso: string | null): string {
  if (!iso) return "Date unknown";
  const d = parseISO(iso);
  if (!isValid(d)) return iso;
  return format(d, "MMM d, yyyy");
}

export function formatArrestDateTime(iso: string | null): string {
  if (!iso) return "Date unknown";
  const d = parseISO(iso);
  if (!isValid(d)) return iso;
  return format(d, "MMM d, yyyy · h:mm a");
}

export function formatGender(gender: Gender): string {
  if (gender === "male") return "Male";
  if (gender === "female") return "Female";
  return "Unknown";
}

export function toDatetimeLocal(iso: string | null): string {
  if (!iso) return "";
  const d = parseISO(iso);
  if (!isValid(d)) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fromDatetimeLocal(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (!isValid(d)) return null;
  return d.toISOString();
}
