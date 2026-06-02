import type { LucideIcon } from 'lucide-react';
import { Tag } from '../Tag/Tag';
import './TableCells.css';

interface AccessItem {
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

interface CellAccessProps {
  accesses: AccessItem[];
  max?: number;
}

export function CellAccess({ accesses, max = 3 }: CellAccessProps) {
  const visible = accesses.slice(0, max);
  const overflow = accesses.length - max;

  return (
    <div className="cell-tags">
      {visible.map((access, i) => (
        <span key={i} className={access.disabled ? 'cell-access__item--disabled' : undefined}>
          <Tag
            label={access.label}
            status="neutral"
            icon={access.icon}
            showDot={false}
            size="compact"
          />
        </span>
      ))}
      {overflow > 0 && (
        <Tag label={`+${overflow}`} status="neutral" size="compact" />
      )}
    </div>
  );
}
