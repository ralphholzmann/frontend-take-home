'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import cx from 'classnames';

const DEFAULT_DURATION = 5000;

type ToastContextType = {
  toast: (message: string, duration?: number) => void;
  clear: () => void;
  message: { text: string; duration: number } | null;
};

export const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  clear: () => {},
  message: null,
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<{ text: string; duration: number } | null>(null);

  const toast = (text: string, duration?: number) => {
    setMessage({ text: text, duration: duration ?? DEFAULT_DURATION });
  };

  const clear = () => setMessage(null);

  return (
    <ToastContext.Provider value={{ toast, clear, message }}>{children}</ToastContext.Provider>
  );
};

const Toast = () => {
  const { message, clear } = useContext(ToastContext);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setClosing(true);
      }, message.duration ?? DEFAULT_DURATION);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={cx(
        'shadow-popover bg-green-surface border-green-divider reveal-enter-from-top fixed top-4 left-1/2 max-w-96 -translate-x-1/2 rounded-lg border px-3 py-2 text-center text-xs',
        {
          'hide-leave-from-top': closing,
        },
      )}
      onAnimationEnd={(event) => {
        if (event.animationName === 'hide-leave-from-top') {
          clear();
          setClosing(false);
        }
      }}
    >
      {message.text}
    </div>
  );
};

export default Toast;
