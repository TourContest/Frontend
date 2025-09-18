import CommentItem from "./CommentItem";
import { CommentCountBar, EmptyCommentBox } from "./style";
import type { CommentRes } from "./types";

interface CommentListProps {
  data: CommentRes;
  spotId: number;
  isPopup?: boolean;
  onReply?: (parentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({ data, isPopup = false, onReply }) => {

    return(
        <>
            <CommentCountBar>
                {data.totalElements} 개의 댓글
            </CommentCountBar>
            <div>
                {data.content.length === 0 ? (
                    <EmptyCommentBox>
                        아직 댓글이 없어요!<br />
                        첫 댓글을 달아주세요.
                    </EmptyCommentBox>
                ) : (
                    data.content.map((comment) => {
                        return (
                            <CommentItem key={comment.id} comment={comment} isPopup={isPopup} onReply={onReply} />
                        )
                    })
                )}
            </div>
        </>
    )
}

export default CommentList;