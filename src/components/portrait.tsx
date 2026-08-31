import { initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Portrait({
  name,
  photo,
  className,
}: {
  name: string;
  photo: string | null;
  className?: string;
}) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden
    >
      <span className="font-serif text-3xl tracking-tight">{initials(name)}</span>
    </div>
  );
}
