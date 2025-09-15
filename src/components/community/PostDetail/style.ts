import styled from '@emotion/styled';
import { theme } from 'src/styles/theme';

export const SliderWrapper = styled.div`
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 20px 0;
    margin-left: 20px;
    width: calc(100% - 20px);
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar { display: none; }

    -ms-overflow-style: none;
    scrollbar-width: none; 

    cursor: grab; // 드래그 기능 (앱 패키징시 지운다.)
`;

export const Slide = styled.div`
    flex: 0 0 auto;
    width: 260px;
    height: 260px;
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    background: #D9D9D9;
`;

export const SlideImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
`;

export const PostWrapper = styled.div`
    padding: 10px 20px 22px 20px;
`;

export const PostContents = styled.div`
    padding: 10px 0;
    font-size: 14px;
    line-height: 1.4;
    color: ${theme.colors.gray[700]};
`;