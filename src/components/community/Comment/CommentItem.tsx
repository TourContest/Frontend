import { Avatar, Date, Username } from "../PostCard/style";
import { CommentContent, CommentItemWrapper, NicknameBox } from "./style";
import type { SpotComment } from "./types";
import Profile from '../../../assets/default_profile.svg';
import { theme } from "src/styles/theme";
import type { TbLineHeight } from "react-icons/tb";

interface CommentItemProps {
  comment: SpotComment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
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
                <img src={Profile} />
            </Avatar>
            <CommentContent>
                <NicknameBox>
                    <Username>{comment.nickname}</Username>
                    <Date>{comment.relativeTime}</Date>
                </NicknameBox>
                <div style={{ margin: "4px 0" }}>{comment.text}</div>
            </CommentContent>
        </CommentItemWrapper>
    )
};

export default CommentItem;