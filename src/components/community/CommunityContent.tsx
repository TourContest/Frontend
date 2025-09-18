import PostCard from './PostCard';
import { theme } from '../../styles/theme';
import { useSelector, useDispatch } from 'react-redux';
import { ContentContainer, PostsContainer, TabButton, TabContainer } from './style';
import type { RootState } from 'src/redux/rootReducer';
import { useEffect } from 'react';
import { fetchLatestPosts, fetchPopularPosts } from 'src/redux/community/actions';
import { setActiveTab } from 'src/redux/community/reducer';


const CommunityContent: React.FC = () => {
  const dispatch = useDispatch();
  const { activeTab, loading, posts } = useSelector((state: RootState) => state.community);

  useEffect(() => {
    if (activeTab === 'latest') {
      dispatch(fetchLatestPosts({ page: 0, size: 20 }) as any);
    } else {
      dispatch(fetchPopularPosts({ page: 0, size: 20 }) as any);
    }
  }, [activeTab, dispatch]);
  
  const handleTabChange = (tab: 'latest' | 'popular') => {
    dispatch(setActiveTab(tab));
  };

  if (loading) {
    return <div style={{ margin:'200px auto', textAlign: 'center' }}>불러오는 중...</div>;
  }

  return (
    <>
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
      <ContentContainer>  
        <PostsContainer>
          {posts && posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div style={{ color: theme.colors.gray[500], padding: '20px' }}>
              게시물이 없습니다.
            </div>
          )}
        </PostsContainer>
      </ContentContainer>
    </>
  );
};

export default CommunityContent; 