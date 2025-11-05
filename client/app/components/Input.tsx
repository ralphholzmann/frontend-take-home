import cx from 'classnames';
import Icon, { IconName } from './Icon';

type BaseInputProps = {
  className?: string;
  label?: React.ReactNode;
  name: string;
};

type InputBaseProps = BaseInputProps & {
  startIcon?: IconName;
  textarea?: never;
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextareaBaseProps = BaseInputProps & {
  textarea: true;
  startIcon?: never;
  type?: never;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputProps = TextareaBaseProps | InputBaseProps;

const Input = ({ className, startIcon, type = 'text', label, textarea, ...props }: InputProps) => {
  const input = textarea ? (
    <textarea
      className={cx(
        'border-gray-alpha-5 focus:border-purple-9 shadow-1 h-full grow rounded border px-2 py-1.5 text-sm outline-0',
      )}
      {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
    />
  ) : (
    <label
      className={cx(
        'bg-surface border-gray-alpha-5 focus-within:border-purple-9 shadow-1 flex h-8 items-center rounded border px-1',
        className,
      )}
    >
      {startIcon && (
        <div className="px-1">
          <Icon className="text-gray-alpha-11" name={startIcon} size={16} />
        </div>
      )}
      <input
        type={type}
        name="search"
        className="h-full grow px-1 text-sm outline-0"
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    </label>
  );

  if (label) {
    return (
      <label className="flex flex-col gap-1">
        <span className="text-gray-alpha-11 text-sm leading-5.5 font-medium tracking-tight">
          {label}
        </span>
        {input}
      </label>
    );
  }

  return input;
};

export default Input;
