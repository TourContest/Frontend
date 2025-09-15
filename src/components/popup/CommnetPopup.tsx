import { useState } from "react";
import type { CommentPopupProps } from "./types";
import { Handle, Popup, PopupHeader, PopupOverlay, PupupBody } from "./style";
import CommentList from "../community/Comment/CommnentList";

export default function CommentPopup({
    open, onClose, onSubmit, comments
}: CommentPopupProps) {
    const [comment, setComment] = useState([]);

    const handleSubmit = (value: string) => {
        onSubmit(value);
        setComment([]);
    }
    return(
        <PopupOverlay data-open={open} onClick={onClose}>
            <Popup data-open={open} onClick={(e) => e.stopPropagation()}>
                <PopupHeader>
                    <Handle aria-label="닫기" />
                    <h1>답글</h1>
                </PopupHeader>
                <PupupBody style={{ padding: 0 }}>
                    <CommentList data={{ content: comments, totalElements: comments.length , hasNext: false}}/>
                </PupupBody>
            </Popup>
        </PopupOverlay>
    );
};