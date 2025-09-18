import styled from '@emotion/styled';
import { theme } from '../../../styles/theme';
import { FiMapPin } from 'react-icons/fi';
import { checkerBg } from 'src/styles/checkerBg';

export const CardContainer = styled.div`
  display: flex;
  padding: 12px 16px 0px;
  background-color: ${theme.colors.bg[0]};
  border-radius: 12px;
  box-shadow: 0 3px 16px 0 rgba(210, 210, 210, 0.40);
`;

export const CardContent = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ProfileSection = styled.div``;

export const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;


  img {
    width:100%;
    height:100%;
    object-fit: cover;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  line-height: 1.4;
`;

export const Username = styled.div`
  font-weight: 500;
  color: ${theme.colors.gray[800]};
`;

export const Date = styled.div`
  font-size: 13px;
  color: ${theme.colors.gray[400]};
`;

export const MoreButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  top: 0; right: 0;
  transform: rotate(90deg);
  color: ${theme.colors.gray[400]};
`;

export const ReportButton = styled.button`
    padding: 10px 27px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.1);
    font-weight: 500;
    font-size: 13px;
    color: ${theme.colors.gray[600]};
    position: absolute;
    top: 6px; right: 0;
`;

export const PostSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 19px;
`;

export const ImageContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;  /* 가로 스크롤 */
  padding-bottom: 8px;

  /* 스크롤바 숨기기 (선택) */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE/Edge */
  scrollbar-width: none;     /* Firefox */
`;

export const PostImage = styled.div<{ image: string }>`
  ${checkerBg}
  flex: 0 0 auto; /* 크기 고정 */
  width: 130px;
  height: 130px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray[200]};
  background-color: ${theme.colors.gray[100]};
  background-position: center;
  background-size: cover;
  background-image: url(${(p) => p.image});
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LocationTag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 7px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 50px;
  width: fit-content;
`;

export const LocationIcon = styled(FiMapPin)`
  color: ${theme.colors.gray[400]};
`;

export const LocationText = styled.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  color: ${theme.colors.gray[500]};
`;

export const PostText = styled.div`
  font-size: 14px;
  line-height: ${theme.typography.body4.lineHeight};
  color: ${theme.colors.gray[600]};
  text-align: left;
`;

export const ActionSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0px;
  border-top: 0.5px solid ${theme.colors.gray[200]};
`;

export const ActionButton = styled.button`
display: flex;
justify-content: center;
  flex: 1 1 0;
  padding: 6px 10px;
  cursor: pointer;
`;

export const ActionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  font-size: 13px;
  line-height: 1.3;
  color: ${theme.colors.gray[500]};

`;

export const ActionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray[300]};
`;