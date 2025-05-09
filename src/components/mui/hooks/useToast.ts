// hooks/useToast.ts
import { useState } from 'react';

type ToastType = 'success' | 'error' | 'warning';

const useToast = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');

  const showToast = (message: string, type: ToastType = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  const hideToast = () => {
    setToastOpen(false);
  };

  return {
    toastOpen,
    toastMessage,
    toastType,
    showToast,
    hideToast,
  };
};

export default useToast;