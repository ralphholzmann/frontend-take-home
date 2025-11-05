import { useContext } from 'react';
import { ToastContext } from '../components/Toast';

export const useToast = () => {
  const { toast, clear } = useContext(ToastContext);
  return { toast, clear };
};
