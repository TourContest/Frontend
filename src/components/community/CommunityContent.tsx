import PostCard from './PostCard';
import { theme } from '../../styles/theme';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab, selectCurrentPagePosts } from '../../store/slices/communitySlice';
import { useCommunity } from '../../context/community/CommunityContext';
import { ContentContainer, PostsContainer, TabButton, TabContainer } from './style';


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
          {currentPagePosts && currentPagePosts.length > 0 ? (
            currentPagePosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div style={{ color: theme.colors.gray[500], padding: '20px' }}>
              {/* UI 없어서 예외처리 안하고 error toast 띄우고 진입 불가 만드는게 좋을지도 */}
              게시물이 없습니다.
            </div>
          )}
        </PostsContainer>
      </ContentContainer>
    </>
  );
};

export default CommunityContent; 