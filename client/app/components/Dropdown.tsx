import cx from "classnames";
import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";

type DropdownContextType = {
  coordinates: { x: number, y: number } | null
  setCoordinates: (coordinates: { x: number, y: number } | null) => void;
  closing: boolean;
  setClosing: (closing: boolean) => void;
}
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
  const [coordinates, setCoordinates] = useState<{ x: number, y: number } | null>(null);
  const [closing, setClosing] = useState(false);

  return (
    <DropdownContext.Provider value={{ coordinates, setCoordinates, closing, setClosing }}>
      <div className="relative flex">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

type DropdownTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

const DropdownTrigger = ({ children, ...props }: DropdownTriggerProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { setCoordinates } = useContext(DropdownContext);

  const handleClick = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoordinates({ x: rect.left + rect.width, y: rect.top + rect.height });
    }
  }

  return (
    <button ref={ref}type="button" className={cx("cursor-pointer size-6 hover:bg-gray-alpha-3 rounded-full p-1", props.className)} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

type DropdownContentProps = {
  children: React.ReactNode;
  anchor?: 'top' | 'bottom';
  position?: 'top' | 'bottom';
} & React.HTMLAttributes<HTMLDivElement>;


const DropdownContent = ({ children, ...props }: DropdownContentProps) => {
  const { coordinates, setCoordinates, setClosing, closing } = useContext(DropdownContext);

  const requestClose = () => {
    setClosing(true);
  }

  if (!coordinates) return null;

  return createPortal(
    <div className={cx("fixed inset-0 z-10")} onClick={requestClose}>
      <div
      className={cx("absolute top-0 left-0 bg-white shadow-popover rounded-lg p-1 z-20 min-w-36 flex flex-col gap-px -translate-x-full reveal-enter-from-top", {
        "hide-leave-from-top": closing,
      })}
      style={{ top: coordinates.y, left: coordinates.x }}
      onAnimationEnd={(event) => {
        if (event.animationName === 'hide-leave-from-top') {
          setCoordinates(null);
          setClosing(false);
        }
      }}
      >
        {children}
      </div>
    </div> ,
    document.body
  )
}

type DropdownItemProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownItem = ({ children, onClick, ...props }: DropdownItemProps) => {
  const { setClosing } = useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosing(true);
    onClick?.(e);
  }

  return (
    <button
      type="button"
      className="px-2 py-1.5 text-sm text-gray-alpha-11 hover:bg-gray-alpha-3 cursor-pointer w-full text-left first:rounded-t last:rounded-b hover:text-foreground"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem};