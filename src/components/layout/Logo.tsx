export function PlateMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="12" fill="var(--lona)" stroke="var(--lima)" strokeWidth="5" />
      <circle cx="16" cy="16" r="2.5" fill="var(--lima)" />
    </svg>
  );
}
