import { createPortal } from 'react-dom';
import cx from 'classnames';
import { forwardRef, useEffect, useState } from 'react';

type ModalProps = {
  children: React.ReactNode | (({ requestClose }: { requestClose: () => void }) => React.ReactNode);
  onRequestClose: () => void;
};

export type ModalRef = {
  requestClose: () => void;
};

const Modal = forwardRef<ModalRef, ModalProps>(({ children, onRequestClose }, ref) => {
  const [closing, setClosing] = useState(false);

  const requestClose = () => {
    setClosing(true);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      requestClose();
    }
  };

  useEffect(() => {
    if (ref && typeof ref !== 'function' && 'current' in ref) {
      ref.current = {
        requestClose,
      };
    }
  }, [ref]);

  return createPortal(
    <>
      <div
        onKeyDown={onKeyDown}
        className={cx(`bg-backdrop fade-enter fixed inset-0 flex items-center justify-center`, {
          'fade-leave': closing,
        })}
        onClick={requestClose}
        onAnimationEnd={(event) => {
          if (event.animationName === 'fade-leave') {
            setClosing(false);
            onRequestClose();
          }
        }}
      />
      <div
        onKeyDown={onKeyDown}
        className={cx(
          `reveal-enter fixed top-1/2 left-1/2 z-10 min-w-96 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4`,
          {
            'hide-leave-from-top': closing,
          },
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {typeof children === 'function' ? children({ requestClose }) : children}
      </div>
    </>,
    document.body,
  );
});
Modal.displayName = 'Modal';

export { Modal };
