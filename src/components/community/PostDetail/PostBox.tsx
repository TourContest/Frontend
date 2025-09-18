import { Avatar, Date, ProfileContent, ProfileInfo, ProfileSection, Username } from "../PostCard/style";
import { PostContents, PostWrapper } from "./style"
import type { PostDetailProps } from "./types";
import { formatDate } from "src/utils/formDate";

interface PostBoxProps {
    post: PostDetailProps;
}

const PostBox:React.FC<PostBoxProps> = ({ post }) => {
    return(
        <PostWrapper>
            <ProfileSection>
                <ProfileContent style={{ padding: '10px 0' }}>
                    <Avatar>
                        <img src={post.userProfile} />
                    </Avatar>
                    <ProfileInfo>
                        <Username>{post.userNickname}</Username>
                        <Date>{formatDate(post.createdAt)}</Date>
                    </ProfileInfo>
                </ProfileContent>
                <PostContents>
                    {post.description}
                </PostContents>
            </ProfileSection>

        </PostWrapper>
    )
}

export default PostBox;