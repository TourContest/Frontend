import { Avatar, Date, ProfileContent, ProfileInfo, ProfileSection, Username } from "../PostCard/style";
import { PostContents, PostWrapper } from "./style"
import Profile from '../../../assets/default_profile.svg';
import type { PostDetailProps } from "./types";

interface PostBoxProps {
    post: PostDetailProps;
}

const PostBox:React.FC<PostBoxProps> = ({ post }) => {
    return(
        <PostWrapper>
            <ProfileSection>
                <ProfileContent style={{ padding: '10px 0' }}>
                    <Avatar>
                        <img src={Profile} />
                    </Avatar>
                    <ProfileInfo>
                        <Username>{post.name}</Username>
                        <Date>2024.00.00</Date>
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