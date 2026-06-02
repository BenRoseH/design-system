import './TableCells.css';

interface CellJaugeProps {
  value: number;
  total: number;
  showLabel?: boolean;
}

const SIZE = 20;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CellJauge({ value, total, showLabel = true }: CellJaugeProps) {
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  const colorClass =
    pct >= 90
      ? 'cell-jauge--positive'
      : pct >= 70
        ? 'cell-jauge--warning'
        : 'cell-jauge--negative';

  const offset = CIRCUMFERENCE * (1 - pct / 100);

  return (
    <div className={`cell-jauge ${colorClass}`} aria-label={`${pct}%`}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        <circle
          className="cell-jauge__ring-track"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
        />
        <circle
          className="cell-jauge__ring-arc"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      {showLabel && <span className="cell-jauge__label">{value} / {total}</span>}
    </div>
  );
}
