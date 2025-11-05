import { AvatarSize } from './Avatar';
import cx from 'classnames';

export const SkeletonText = () => {
  return <div className="bg-gray-alpha-6 h-4 w-full animate-pulse rounded-sm" />;
};

const sizes: Record<AvatarSize, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
};

export const SkeletonAvatar = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClass = sizes[size];
  return (
    <div
      className={cx(
        'bg-gray-alpha-6 shrink-0 animate-pulse overflow-hidden rounded-full',
        sizeClass,
      )}
    />
  );
};
