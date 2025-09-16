import styled from '@emotion/styled';
import { theme } from 'src/styles/theme';

export const SlideWrapper = styled.div`
    display: flex;
    gap: 8px;
    padding-left: 20px;

    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar { height: 0; }
`;

export const BaseCard = styled.div`
    flex: 0 0 120px;
    width: 120px; height: 120px;
    border-radius: 12px;
    position: relative;  
    background: ${theme.colors.gray[100]};
`;

const margin = `
    &[data-last='true'] {
        margin-right: 20px;
    }
`;

export const  Thumb = styled(BaseCard)`
    border: 1px solid ${theme.colors.gray[200]};
    ${margin}
`

export const ImgBox = styled.div`
    width: 100%; height: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: inherit;
`;

export const Img = styled.img`
    width: 100%; height: 100%;
    object-fit: cover;
`;

export const AddCard = styled(BaseCard)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    color: ${theme.colors.gray[400]};
    border: 1px solid ${theme.colors.gray[200]};
`;

export const Head3Wrapper = styled.div`
    font-size: 20px;
    color: ${theme.colors.gray[700]};
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1.4;
    margin-bottom: 12px;

    div {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    strong { color: ${theme.colors.primary[400]}};
`;

export const ThemeWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const TagWrapper = styled(ThemeWrapper)`
    margin-top: 10px;
`;