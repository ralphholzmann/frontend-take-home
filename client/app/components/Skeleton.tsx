import { AvatarSize } from "./Avatar"
import cx from "classnames";

export const SkeletonText = () => {
  return (
    <div className="w-full h-4 bg-gray-alpha-6 rounded-sm animate-pulse" />
  )
}

const sizes: Record<AvatarSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
}

export const SkeletonAvatar = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClass = sizes[size];
  return (
    <div className={cx("rounded-full bg-gray-alpha-6 overflow-hidden animate-pulse shrink-0", sizeClass)} />
  )
}
