// SuccessToast.tsx
import { useEffect } from "react";
import { SuccessToastWrapper } from "./style";
import SuccessIcon from '../../../assets/Challenge.svg';

interface SuccessToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const SuccessToast = ({ message, visible, onClose }: SuccessToastProps) => {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <SuccessToastWrapper>
      <img src={SuccessIcon} alt="success" width={24} height={24} />
      {message}
    </SuccessToastWrapper>
  );
};

export default SuccessToast;
