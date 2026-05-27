import './TableRow.css';

interface TableRowProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

export function TableRow({ children, onClick, selected = false }: TableRowProps) {
  const classes = [
    'table-row',
    selected ? 'table-row--selected' : '',
    onClick ? 'table-row--interactive' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <tr className={classes} onClick={onClick}>
      {children}
    </tr>
  );
}
