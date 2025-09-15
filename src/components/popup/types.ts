import type { SpotComment } from "../community/Comment/types";

export type PopupProps = { 
    open: boolean;
    onClose: () => void;
    onSubmit?: (n:number) => void;
};

// types.ts
export interface CommentPopupProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
  comments: SpotComment[];
}
