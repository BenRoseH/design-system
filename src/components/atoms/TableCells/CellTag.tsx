import type { LucideIcon } from 'lucide-react';
import { Tag } from '../Tag/Tag';
import './TableCells.css';

type TagStatusInput = 'positive' | 'negative' | 'warning' | 'info' | 'neutral' | 'accent';
type TagStatusTag = 'positive' | 'negative' | 'neutral' | 'warning' | 'information' | 'accent';

interface TagItem {
  label: string;
  status?: TagStatusInput;
  icon?: LucideIcon;
}

interface CellTagProps {
  tags: TagItem[];
  max?: number;
}

function mapStatus(s: TagStatusInput = 'neutral'): TagStatusTag {
  return s === 'info' ? 'information' : s;
}

export function CellTag({ tags, max = 3 }: CellTagProps) {
  const visible = tags.slice(0, max);
  const overflow = tags.length - max;

  return (
    <div className="cell-tags">
      {visible.map((tag, i) => (
        <Tag key={i} label={tag.label} status={mapStatus(tag.status)} icon={tag.icon} size="compact" />
      ))}
      {overflow > 0 && (
        <Tag label={`+${overflow}`} status="neutral" size="compact" />
      )}
    </div>
  );
}
