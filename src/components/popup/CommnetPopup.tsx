import type { CommentPopupProps } from "./types";
import { Handle, Popup, PopupHeader, PopupOverlay, PupupBody } from "./style";
import CommentList from "../community/Comment/CommnentList";

export default function CommentPopup({
    open, onClose, comments, spotId
}: CommentPopupProps) {
    console.log("popup comments:", comments);
    console.log("popup comments content length:", comments.content.length);

    return(
        <PopupOverlay data-open={open} onClick={onClose}>
            <Popup data-open={open} onClick={(e) => e.stopPropagation()}>
                <PopupHeader>
                    <Handle aria-label="닫기" />
                    <h1>답글</h1>
                </PopupHeader>
                <PupupBody style={{ 
                    padding: 0, 
                    maxHeight: 'calc(100vh - 300px)',
                    overflowY: 'auto',
                }}>
                    <CommentList 
                        data={comments}
                        spotId={ spotId}
                        isPopup={true} // 답글버튼 숨김 
                    />
                </PupupBody>
                <div style={{ height: '67px' }}></div>
            </Popup>
        </PopupOverlay>
    );
};