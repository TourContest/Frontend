import React from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../styles/theme';
import PostCard from '../commons/PostCard';
import type { RootState } from '../../store';
import { setActiveTab, selectCurrentPagePosts } from '../../store/slices/communitySlice';
import { useCommunity } from '../../contexts/CommunityContext';

const ContentContainer = styled.div`
  width: 375px;
  height: 1194px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: ${theme.colors.bg[50]};
  border-top: 1px solid ${theme.colors.gray[200]};
`;

const TabContainer = styled.div`
  width: 375px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.bg[0]};
  padding: 0 14px;
`;

const TabButton = styled.button<{ active: boolean }>`
  width: 170px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: none;
  background: none;
  font-family: ${theme.typography.body1.fontFamily};
  font-size: ${theme.typography.body1.fontSize};
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? theme.colors.primary[400] : theme.colors.gray[500]};
  cursor: pointer;
  border-bottom: ${props => props.active ? `1.5px solid ${theme.colors.primary[400]}` : `1px solid ${theme.colors.gray[200]}`};
  transition: all 0.2s ease;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 0 14px;
`;

const CommunityContent: React.FC = () => {
  const dispatch = useDispatch();
  const { activeTab, loading, currentPage, totalPages } = useSelector((state: RootState) => state.community);
  const currentPagePosts = useSelector(selectCurrentPagePosts);
  const { state: contextState } = useCommunity();

  const handleTabChange = (tab: 'latest' | 'popular') => {
    dispatch(setActiveTab(tab));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ContentContainer>
      <TabContainer>
        <TabButton 
          active={activeTab === 'latest'} 
          onClick={() => handleTabChange('latest')}
        >
          최신순
        </TabButton>
        <TabButton 
          active={activeTab === 'popular'} 
          onClick={() => handleTabChange('popular')}
        >
          인기순
        </TabButton>
      </TabContainer>
      
      <PostsContainer>
        {currentPagePosts && currentPagePosts.length > 0 ? (
          currentPagePosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div style={{ color: theme.colors.gray[500], padding: '20px' }}>
            게시물이 없습니다.
          </div>
        )}
      </PostsContainer>
    </ContentContainer>
  );
};

export default CommunityContent; 