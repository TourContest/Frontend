import { Avatar, Date, Username } from "../PostCard/style";
import { CommentContent, CommentItemWrapper, NicknameBox } from "./style";
import type { SpotComment } from "./types";
import { theme } from "src/styles/theme";

interface CommentItemProps {
  comment: SpotComment;
  isPopup?: boolean;
  onReply?: (parentId: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, isPopup = false, onReply }) => {

    if (comment.isDeleted) {
        return (
            <CommentItemWrapper
                style={{
                    color: `${theme.colors.gray[400]}`,
                    lineHeight: '1.4',
                    fontSize: '14px'
                }}
            >삭제된 댓글입니다.</CommentItemWrapper>
        )
    }

    return(
        <CommentItemWrapper
            style={{
                marginLeft: `${comment.depth * 20}px`,
                borderLeft: comment.depth > 0 ? '1px solid #D9D9D9' : 'none',
                borderRadius: comment.depth > 0 ?  '0 0 0 10px' : 'none'
            }}
        >
            <Avatar>
                <img src={comment.profileImageUrl} />
            </Avatar>
            <CommentContent>
                <NicknameBox>
                    <Username>{comment.nickname}</Username>
                    <Date>{comment.relativeTime}</Date>
                </NicknameBox>
                <div style={{ margin: "4px 0" }}>{comment.text}</div>
                {/* 우선 원댓글에만 대댓글 달 수 있게 */}
                {comment.depth === 0 && !isPopup && onReply && (
                    <button onClick={() => onReply(comment.id)}>답글 달기</button>
                )}
            </CommentContent>
        </CommentItemWrapper>
    )
};

export default CommentItem;