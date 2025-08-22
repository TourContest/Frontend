import LogoHeader from "../commons/Header/LogoHeader";
import { Guide, PermissionLeft, PermissionList, PermissionListBox, PermissionWrapper } from "./splash.style";
import { ButtonWrapper } from "../auth/login/login.style";
import Notification from '../../assets/Alarm.svg';
import Camera from '../../assets/Camera.svg';
import Gallery from '../../assets/Gallery.svg';
import Location from '../../assets/Location.svg';
import BottomButton from "../commons/Buttons/BottomButton";

const permissions = [
    { key: 'notification', icon: Notification, title: '알림', description: '푸시알림 발송' },
    { key: 'camera', icon: Camera, title: '카메라', description: '사진 업로드' },
    { key: 'gallery', icon: Gallery, title: '사진', description: '사진 업로드' },
    { key: 'location', icon: Location, title: '위치', description: '사용자 위치 기반' },
]

interface PermissionCardProps {
    onAllow: () => void;
}

const PermissionCard = ({ onAllow }: PermissionCardProps) => {
    return (
        <>
            <LogoHeader />
            <PermissionWrapper>
                <Guide>
                    앱 사용 권한을 위해 <br />
                    접근 권한을 허용해주세요.
                </Guide>
                <PermissionListBox>
                    <span>선택 권한</span>
                    <PermissionList>
                        {permissions.map((item) => (
                            <li key={item.key}>
                                <PermissionLeft>
                                    <img src={item.icon} alt={item.title} width={32}/>
                                    <div style={{ width: "50px"}}>{item.title}</div>
                                </PermissionLeft>
                                <div>{item.description}</div>
                            </li>
                        ))}
                    </PermissionList>
                </PermissionListBox>
            </PermissionWrapper>
            <ButtonWrapper>
                <BottomButton size ='large' onClick={onAllow}>
                    확인
                </BottomButton>
            </ButtonWrapper>
        </>
    )
};

export default PermissionCard;