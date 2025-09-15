import styled from '@emotion/styled'
import { theme } from '../../../styles/theme';

export const PaginationContainer = styled.div`
  padding : 0 20px;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  line-height: 1.4;
  margin: 8px 0 19px 0;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: ${theme.colors.gray[800]};
`;

export const Subtitle = styled.div`
  font-weight: 500;
  color: ${theme.colors.gray[500]};
`;

const PostsListTop: React.FC = () => {
  return (
    <PaginationContainer>
      <TitleSection>
        <Title>현재 제주는?</Title>
        <Subtitle>제주의 지역 축제를 알아보세요!</Subtitle>
      </TitleSection>
    </PaginationContainer>
  );
};

export default PostsListTop; 