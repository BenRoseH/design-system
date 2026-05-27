import './TableHeaderRow.css';

interface TableHeaderRowProps {
  children: React.ReactNode;
}

export function TableHeaderRow({ children }: TableHeaderRowProps) {
  return <tr className="table-header-row">{children}</tr>;
}
