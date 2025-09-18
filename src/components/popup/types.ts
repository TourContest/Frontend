import type { CommentRes } from "../community/Comment/types";

export type PopupProps = { 
    open: boolean;
    onClose: () => void;
    onSubmit?: (n:number) => void;
};

// types.ts
export interface CommentPopupProps {
  open: boolean;
  onClose: () => void;
  comments: CommentRes;
  spotId: number;
}
