import BackHeader from "src/components/commons/Header/BackHeader"
import { MenuBack, SettingMenuBox } from "./style"
import { useNavigate } from "react-router-dom";

type SettingSheetProps = {
  onClose: () => void;
};

const SettingMenu:React.FC<SettingSheetProps> = ({ onClose }) => {
    const navigate = useNavigate();

    return (
        <MenuBack>
            <BackHeader title="설정" onBack={onClose} />
            <SettingMenuBox>
                <li onClick={() => navigate('/mypage/account/theme')}>
                    <span>테마 수정하기</span>
                </li>
                <li onClick={() => navigate('/mypage/account/password')}>
                    <span>비밀번호 수정하기</span>
                </li>
            </SettingMenuBox>
        </MenuBack>
    )
};

export default SettingMenu;