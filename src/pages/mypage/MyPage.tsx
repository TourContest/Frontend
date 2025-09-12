import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotiHeader from "src/components/commons/Header/NotiHeader";
import MyPageMenu from "src/components/my-page/menu/MyPageMenu";
import MyProfileWrap from "src/components/my-page/menu/myProfile";
import SettingMenu from "src/components/my-page/menu/SettingMenu";
import { MyPageContainer, MyPageWrapper } from "src/components/my-page/style";
import { useNotification } from "src/features/my-page/useNotification";

const MyPage = () => {
    const navigate = useNavigate();
    const { notiEnabled, toggleNoti } = useNotification();

    const [openSettings, setOpenSettings] = useState(false);

    return(
        <MyPageContainer>
            <NotiHeader title="마이페이지" notiEnabled={notiEnabled} onToggleNoti={toggleNoti}/>
            <MyProfileWrap />
            <MyPageWrapper>
                <MyPageMenu 
                    notiEnabled={notiEnabled}
                    toggleNoti={toggleNoti}
                    onNavigate={(path) => navigate(path)}
                    settingMode="positive"
                    onOpenSettings={() => setOpenSettings(true)}
                    />
            </MyPageWrapper>
            {openSettings && (
                <SettingMenu
                    onClose={() => setOpenSettings(false)}
                />
      )}
        </MyPageContainer>
    );
};

export default MyPage;