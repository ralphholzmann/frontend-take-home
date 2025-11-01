import cx from "classnames";
import Icon, { IconName } from "./Icon";

type InputProps = {
  className?: string;
  startIcon?: IconName;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, startIcon, type="text", ...props }: InputProps) => {
  return (
    <label className={cx("flex bg-surface border border-gray-alpha-5 rounded px-1 focus-within:border-purple-9 shadow-1", className)}>
      {startIcon && <Icon name={startIcon} size={16} />}
      <input type={type} className={cx("text-sm py-1.5 px-1 grow outline-0")} {...props} />
    </label>
  )
}

export default Input;