import styled from '@emotion/styled';

export const MyProfileWrapper = styled.div`
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const MyProfileBox = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`;

export const ProfileImgWrapper = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray[300]};
    background: ${({ theme }) => theme.colors.gray[200]};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`;

export const NicknameWrapper = styled.div`
    padding: 20px 0 18px 0;
`;

export const NicknameBox = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;

    & > span {
        width: 140px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 20px;
        font-weight: 600;
    }
`;

export const HallabongWrapper = styled.div`
    padding: 18px 16px;
    border-radius: 12px;
    box-shadow: 0 3px 16px 0 rgba(210, 210, 210, 0.4);
`;

export const GoToStoreBox =  styled.div`
    display: flex;
    gap: 8px;
    algin-items: center;
    margin-bottom: 20px;
`;

export const GoToStore = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    line-height: 1.4;
    cursor: pointer;

    h4 {
        font-size: 18px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray[700]};
        margin-bottom: 4px;
    }

    span {
        font-size: 14px;
    }
`;

export const GiftBtn = styled.button`
    width: 100%;
    padding: 10px;
    background: ${({ theme }) => theme.colors.primary[100]};
    color: ${({ theme }) => theme.colors.primary[500]};
    font-size: 14px;
    border-radius: 8px;
`;

export const MenuWrapper = styled.div`
    width: 100%;
    box-shadow: 0 3px 16px 0 rgba(221, 221, 221, 0.3);
    margin: 30px 0;

    & > div:first-of-type {
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
    }

    & > div:last-child {
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
        border-bottom: none !important;
    }
`;

export const MenuRow = styled.div`
    padding: 20.5px 16px;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

export const MenuBox = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1.45;
`;

export const SwitchContainer = styled.label<{ checked: boolean }>`
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    & > input { 
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    & > .track {
        width: 34.96px;
        height: 20px;
        padding: 1.67px;
        background: ${({ theme, checked }) => checked ? theme.colors.primary[400] : theme.colors.gray[400] };
        border-radius: 83.3px;
        display: inline-flex;
        align-items: center;
        transition: background 0.2s;
        
        & > .thumb {
            width: 16.67px;
            height: 16.67px;
            background: #fff;
            border-radius: 50%;
            transform: translateX(${({ checked }) => checked ? "15.5px" : "0" })
        }
    }
`;

export const MenuBack = styled.div`
    position: fixed; inset: 0;
    background: #fff;
    z-index:11;
`;

export const SettingMenuBox = styled.ul`
    padding: 20px;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
    color: #000;

    li {
        padding: 17.5px 0;
        display: flex;
        justify-content: space-between;
    }
`;