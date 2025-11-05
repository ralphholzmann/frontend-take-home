import cx from 'classnames';

type ErrorMessageProps = {
  children: React.ReactNode;
  className?: string;
};

const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
  return (
    <div
      className={cx(
        'text-red-alpha-11 border-red-alpha-7 bg-red-surface rounded-lg border py-1 text-center text-sm leading-5.5 tracking-tight',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
