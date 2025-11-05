import cx from 'classnames';
type TableProps = {
  children: React.ReactNode;
  className?: string;
};
const Table = ({ children, className }: TableProps) => {
  return (
    <div className={cx('border-gray-alpha-6 grid overflow-hidden rounded-lg border', className)}>
      {children}
    </div>
  );
};

type RowProps = {
  children: React.ReactNode;
  className?: string;
};
export const Row = ({ children, className }: RowProps) => {
  return <div className={cx('contents last:[&>div]:border-b-0', className)}>{children}</div>;
};

type CellProps = {
  children: React.ReactNode;
  header?: boolean;
  className?: string;
};
export const Cell = ({ children, header = false, className }: CellProps) => {
  return (
    <div
      className={cx(
        'border-gray-alpha-6 flex items-center border-b px-3 py-2.5 text-sm',
        {
          'bg-grays-2 font-medium': header,
          'bg-surface': !header,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Table;
