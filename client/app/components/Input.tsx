import cx from "classnames";
import Icon, { IconName } from "./Icon";

type BaseInputProps = {
  className?: string;
  label?: React.ReactNode;
  name: string;
}

type InputBaseProps = BaseInputProps & {
  startIcon?: IconName;
  textarea?: never;
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextareaBaseProps = BaseInputProps & {
  textarea: true;
  startIcon?: never;
  type?: never;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputProps =  TextareaBaseProps | InputBaseProps;


const Input = ({ className, startIcon, type="text", label, textarea, ...props }: InputProps) => {
  const input = textarea ? (
    <textarea className={cx("text-sm h-full px-2 py-1.5 grow outline-0 border border-gray-alpha-5 rounded focus:border-purple-9 shadow-1")} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
  ) : (
    <label className={cx("flex items-center bg-surface border border-gray-alpha-5 rounded px-1 focus-within:border-purple-9 shadow-1 h-8", className)}>
      {startIcon && (
        <div className="px-1">
        <Icon className="text-gray-alpha-11" name={startIcon} size={16} />
        </div>
      )}
      <input type={type} name="search" className="text-sm h-full px-1 grow outline-0" {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
    </label>
  )

  if (label) {
    return (
      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-alpha-11 leading-5.5 tracking-tight font-medium">{label}</span>
        {input}
      </label>
    )
  }

  return input;
}

export default Input;