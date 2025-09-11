import styled from '@emotion/styled';
import Noti from '../../../assets/Noti.svg';

type CommonHeaderProps = {
    title: string;   
    notiEnabled: boolean;
    onToggleNoti: (next: boolean) => void;
};

const HeaderWrapper = styled.header`
    position: sticky;
    top: 0;
    z-index: 10;
    background: #fff;
`;

const HeaderBar = styled.div`
    padding: 10px 17px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const NotiHeaderTitle = styled.h1`
    flex: 1;
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[800]};
    text-align: center;
`;

const ToggleNotiBtn = styled.button<{ enabled: boolean }>`
    top: 0;
    right: 17px;

    img {
        width: 24px;
        height: 24px;
        filter: ${({ enabled }) => enabled ? 'grayscale(0)' : 'grayscale(100%)'}
    }
`;

const NotiHeader :React.FC<CommonHeaderProps> = ({ title, notiEnabled, onToggleNoti }) => {
    return (
        <HeaderWrapper>
            <HeaderBar>
                <NotiHeaderTitle>{title}</NotiHeaderTitle>
                <ToggleNotiBtn 
                    type="button" 
                    aria-label="알림" 
                    area-pressed={notiEnabled}
                    enabled={notiEnabled}
                    onClick={() => onToggleNoti(!notiEnabled)}
                >
                    <img src={Noti} alt='알림'/>
                </ToggleNotiBtn>
            </HeaderBar>
        </HeaderWrapper>
    )
};

export default NotiHeader;