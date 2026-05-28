function HealthRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  const healthy = value === "running" || value === "connected";

  return (
    <div className="flex items-center rounded-full border bg-background px-4 py-3">
      {/* Label grows to fill space */}
      <span className="flex-1 text-sm font-medium">{label}</span>

      {/* Status: dot pinned to a fixed column, text in a fixed-width box */}
      <div className="flex items-center gap-2 w-[100px] shrink-0">
        <span
          className={`h-2.5 w-2.5 rounded-full shrink-0 ${
            healthy ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-xs text-muted-foreground capitalize">
          {value ?? "unknown"}
        </span>
      </div>
    </div>
  );
}