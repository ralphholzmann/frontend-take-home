import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  onRequestClose: () => void;
}

const Modal = ({ children, onRequestClose }: ModalProps) => {
  return createPortal(
    <div className="fixed inset-0 bg-backdrop flex items-center justify-center text-foreground" onClick={onRequestClose}>
      <div className="bg-white p-4 rounded-xl min-w-96" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export { Modal };
