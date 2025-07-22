import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../../styles/theme';

const PaginationContainer = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: ${theme.colors.bg[50]};
`;

const PaginationWrapper = styled.div`
  width: 347px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 14px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 3px;
`;

const Title = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 140%;
  font-weight: 600;
  font-size: 20px;
  color: ${theme.colors.gray[800]};
  font-family: ${theme.typography.head3.fontFamily};
`;

const Subtitle = styled.div`
  position: relative;
  font-size: 16px;
  line-height: 140%;
  font-weight: 500;
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.body1.fontFamily};
`;

const PaginationCounterParent = styled.div`
  width: 347px;
  position: relative;
  border-radius: 8px;
  background-color: ${theme.colors.gray[300]};
  height: 136px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px 14px;
  box-sizing: border-box;
  text-align: center;
  font-size: 13px;
  color: ${theme.colors.bg[0]};
  font-family: ${theme.typography.caption1.fontFamily};
`;

const PaginationCounter = styled.div`
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(16px);
  border-radius: 50px;
  height: 24px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0.3;
`;

const Background = styled.div`
  width: 100%;
  position: absolute;
  margin: 0 !important;
  height: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  background-color: ${theme.colors.base[100]};
  overflow: hidden;
  z-index: 0;
`;

const Background1 = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  border-radius: 1000px;
  opacity: 0.4;
`;

const Content = styled.div`
  height: 24px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  box-sizing: border-box;
  gap: 4px;
  z-index: 1;
`;

const CurrentPage = styled.div`
  position: relative;
  line-height: 130%;
  font-weight: 600;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
  color: ${theme.colors.bg[0]};
  font-size: 13px;
`;

const Divider = styled.div`
  position: relative;
  font-size: 14px;
  line-height: 140%;
  color: ${theme.colors.gray[400]};
`;

const TotalPage = styled.div`
  position: relative;
  line-height: 130%;
  font-weight: 600;
  color: ${theme.colors.bg[0]};
  font-size: 13px;
`;

const PageMarkers = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const PageMarker = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? theme.colors.primary[400] : theme.colors.gray[400]};
  transition: all 0.3s ease;
  cursor: pointer;
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  title?: string;
  subtitle?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  title = "현재 제주는?",
  subtitle = "제주의 지역 축제를 알아보세요!"
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <PaginationContainer>
      <PaginationWrapper>
        <TitleSection>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TitleSection>
      </PaginationWrapper>
      <PaginationCounterParent>
        <PaginationCounter>
          <Background>
            <Background1 />
          </Background>
          <Content>
            <CurrentPage>{currentPage}</CurrentPage>
            <Divider>/</Divider>
            <TotalPage>{totalPages}</TotalPage>
          </Content>
        </PaginationCounter>
        <PageMarkers>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageMarker 
              key={index} 
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            />
          ))}
        </PageMarkers>
      </PaginationCounterParent>
    </PaginationContainer>
  );
};

export default Pagination; 