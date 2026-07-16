export function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  const percent = Math.round((step / totalSteps) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-stone">
        <span>
          Krok {step} z {totalSteps}
        </span>
        <span>{percent} %</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full rounded-full bg-bronze transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
