import cx from "classnames";
type TableProps = {
  children: React.ReactNode;
  className?: string;
}
const Table = ({ children, className }: TableProps) => {
  return (
    <div className={cx("border border-gray-alpha-6 rounded-lg grid overflow-hidden", className)}>
      {children}
    </div>
  )
}

type RowProps = {
  children: React.ReactNode;
  className?: string;
}
export const Row = ({ children, className }: RowProps) => {
  return (
    <div className={cx("contents last:[&>div]:border-b-0", className)}>
      {children}
    </div>
  )
}

type CellProps = {
  children: React.ReactNode;
  header?: boolean;
  className?: string;
}
export const Cell = ({ children, header = false, className }: CellProps) => {
  return (
    <div className={cx("px-3 py-2.5 text-sm flex items-center border-b border-gray-alpha-6", {
      "font-medium bg-grays-2": header,
      "bg-surface": !header,
    },className)}>
      {children}
    </div>
  )
}

export default Table;