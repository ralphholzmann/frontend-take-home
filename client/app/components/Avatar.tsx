import cx from 'classnames';
import { useEffect, useState } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarProps = {
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  firstName: string;
  lastName: string;
};

const sizes: Record<AvatarSize, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
};

const Avatar = ({ src, firstName, lastName, size = 'md' }: AvatarProps) => {
  const sizeClass = sizes[size];
  const [loaded, setLoaded] = useState(false);
  const alt = `${firstName} ${lastName}`;

  useEffect(() => {
    if (!src) {
      return;
    }
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true);
    img.src = src;
  }, [src]);

  const initials = firstName.charAt(0) + lastName.charAt(0);

  return (
    <div
      className={cx(
        'bg-gray-alpha-6 text-foreground relative flex shrink-0 items-center justify-center overflow-hidden rounded-full text-xs text-[10px] font-medium',
        sizeClass,
      )}
    >
      <span>{initials}</span>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cx(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
            {
              'opacity-100': loaded,
              'opacity-0': !loaded,
            },
          )}
          draggable={false}
        />
      ) : null}
    </div>
  );
};

export default Avatar;
