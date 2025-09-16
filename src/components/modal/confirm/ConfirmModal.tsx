import { useEffect } from "react";
import * as S from "./style";

type Props = {
  open: boolean;
  title: string;
  subtitle?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  subtitle,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <S.Overlay onClick={onCancel}>
      <S.Modal
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <S.Title>{title}</S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}

        <S.ButtonRow>
          <S.CancelBtn type="button" onClick={onCancel}>
            {cancelText}
          </S.CancelBtn>
          <S.ConfirmBtn type="button" onClick={onConfirm}>
            {confirmText}
          </S.ConfirmBtn>
        </S.ButtonRow>
      </S.Modal>
    </S.Overlay>
  );
}
