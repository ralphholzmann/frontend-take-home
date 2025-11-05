import cx from 'classnames';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type DropdownContextType = {
  coordinates: { x: number; y: number } | null;
  setCoordinates: (coordinates: { x: number; y: number } | null) => void;
  closing: boolean;
  setClosing: (closing: boolean) => void;
};
const DropdownContext = createContext<DropdownContextType>({
  coordinates: null,
  setCoordinates: () => {},
  closing: false,
  setClosing: () => {},
});

interface DropdownProps {
  children: React.ReactNode;
}

const Dropdown = ({ children }: DropdownProps) => {
  const [coordinates, setCoordinates] = useState<{ x: number; y: number } | null>(null);
  const [closing, setClosing] = useState(false);

  return (
    <DropdownContext.Provider value={{ coordinates, setCoordinates, closing, setClosing }}>
      <div className="relative flex">{children}</div>
    </DropdownContext.Provider>
  );
};

type DropdownTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownTrigger = ({ children, ...props }: DropdownTriggerProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { setCoordinates } = useContext(DropdownContext);

  const handleClick = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoordinates({ x: rect.left + rect.width, y: rect.top + rect.height });
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      className={cx(
        'hover:bg-gray-alpha-3 size-6 cursor-pointer rounded-full p-1',
        props.className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

type DropdownContentProps = {
  children: React.ReactNode;
  anchor?: 'top' | 'bottom';
  position?: 'top' | 'bottom';
} & React.HTMLAttributes<HTMLDivElement>;

const DropdownContent = ({ children, ...props }: DropdownContentProps) => {
  const { coordinates, setCoordinates, setClosing, closing } = useContext(DropdownContext);
  const ref = useRef<HTMLDivElement>(null);
  const requestClose = () => {
    setClosing(true);
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      requestClose();
    }
  };

  if (!coordinates) return null;

  return createPortal(
    <div
      ref={ref}
      className={cx('fixed inset-0 z-10')}
      onClick={requestClose}
      onKeyDown={onKeyDown}
    >
      <div
        className={cx(
          'shadow-popover reveal-enter-from-top absolute top-0 left-0 z-20 flex min-w-36 -translate-x-full flex-col gap-px rounded-lg bg-white p-1',
          {
            'hide-leave-from-top': closing,
          },
        )}
        style={{ top: coordinates.y, left: coordinates.x }}
        onAnimationEnd={(event) => {
          if (event.animationName === 'hide-leave-from-top') {
            setCoordinates(null);
            setClosing(false);
          }
          if (event.animationName === 'reveal-enter-from-top') {
            ref.current?.querySelector('button')?.focus();
          }
        }}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

type DropdownItemProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownItem = ({ children, onClick, ...props }: DropdownItemProps) => {
  const { setClosing } = useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosing(true);
    onClick?.(e);
  };

  return (
    <button
      type="button"
      className="text-gray-alpha-11 hover:bg-gray-alpha-3 hover:text-foreground w-full cursor-pointer px-2 py-1.5 text-left text-sm first:rounded-t last:rounded-b"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem };
