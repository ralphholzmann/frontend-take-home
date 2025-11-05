import cx from 'classnames';

export type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarProps = {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizes: Record<AvatarSize, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
};

const Avatar = ({ src, alt, size = 'md' }: AvatarProps) => {
  const sizeClass = sizes[size];
  return (
    <div className={cx('bg-gray-alpha-6 shrink-0 overflow-hidden rounded-full', sizeClass)}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
};

export default Avatar;
