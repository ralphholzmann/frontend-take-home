import { createPortal } from 'react-dom';

type ModalProps = {
  children: React.ReactNode;
  onRequestClose: () => void;
};

const Modal = ({ children, onRequestClose }: ModalProps) => {
  return createPortal(
    <div
      className="bg-backdrop text-foreground fixed inset-0 flex items-center justify-center"
      onClick={onRequestClose}
    >
      <div className="min-w-96 rounded-xl bg-white p-4" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export { Modal };
