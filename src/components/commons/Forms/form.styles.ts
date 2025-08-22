import styled from '@emotion/styled';

export const ProfileUploadBox = styled.div`
    padding: 20px 0;
`;

export const ProfileUploadWrapper = styled.div`
    width: 90px;
    height: 90px;
    margin: 0 auto;
    position: relative;
`;

export const ImgInputWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gray[200]};
    border: 1px solid ${({ theme }) => theme.colors.gray[300]};
    cursor: pointer;
    overflow: hidden;
`;

export const HiddenImgInput = styled.input`
    display: none;
`;

export const PreviewImg = styled.img<{ isDefault: boolean }>`
    width: 100%;
    height: 100%;
    object-fit: ${({ isDefault }) => isDefault ? 'contain' : 'cover'};
    transform: ${({ isDefault }) => isDefault ? 'scale(0.85) translateY(8px)' : 'scale(1) translateY(0)'}
`;

export const CameraIcon = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    algin-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gray[200]};
    border: 1px solid ${({ theme }) => theme.colors.base[0]};
`;

export const InterestFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 135.33px);
`;

export const ThemeWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 11px;
    margin-top: 59px;
    flex-shrink: 0;
`;

export const ThemeItems = styled.button<{ isActive: boolean }>`
    flex: 0 0 calc((100% - 22px) / 3);
    line-height: 1.4;
    padding: 24px 0;
    border-radius: 12px;
    border: 
        1px solid ${({ isActive, theme}) => isActive ? theme.colors.primary[300] : theme.colors.gray[300]};
    background: ${({ isActive, theme }) => isActive ? theme.colors.primary[50]: '#fff'};
    color: ${({ isActive, theme }) => isActive ? theme.colors.primary[400] : theme.colors.gray[500]};
`;

export const AlertBox = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    
    & > div {
        display: flex;
        gap: 3px;
        align-items: center;
        font-size: 14px;
        line-height: 1.4;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.gray[500]};
    }
`;