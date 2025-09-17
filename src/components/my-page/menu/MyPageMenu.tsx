import { useNavigate } from "react-router-dom";
import { MenuBox, MenuRow, MenuWrapper } from "./style";
import type { MyPageListProps } from "./type";
import Switch from "./Switch";
import Social from "../../../assets/Social.svg";
import Challenge from "../../../assets/Challenge.svg";
import Noti from "../../../assets/Noti.svg";
import Setting from "../../../assets/Setting.svg";
import { FaChevronRight } from "react-icons/fa";

const defaultRoutes = {
  community: "/my-page/community",
  challenge: "/challenge",
  settings: "/my-page/settings",
};

const MyPageMenu: React.FC<MyPageListProps> = ({
  notiEnabled,
  toggleNoti,
  onNavigate,
  settingMode = "navigate",
  routes,
  onOpenSettings,
}) => {
  const navigate = useNavigate();
  const route = { ...defaultRoutes, ...routes }; // 전달된 route와 병합
  const go = (path: string) => (onNavigate ?? navigate)(path);

  const handleClickSettings = () => {
    if (settingMode === "navigate") go(route.settings);
    else onOpenSettings(); // 'positive'면 시트/오버레이 열기
  };
  return (
    <MenuWrapper>
      <MenuRow onClick={() => go(route.community)}>
        <MenuBox>
          <img src={Social} />
          커뮤니티 보러가기
        </MenuBox>
        <FaChevronRight color="#B7B7B7" />
      </MenuRow>
      <MenuRow onClick={() => go(route.challenge)}>
        <MenuBox>
          <img src={Challenge} />
          챌린지 보러가기
        </MenuBox>
        <FaChevronRight color="#B7B7B7" />
      </MenuRow>
      <MenuRow>
        <MenuBox>
          <img src={Noti} />
          알림설정
        </MenuBox>
        <Switch
          checked={!!notiEnabled}
          onChange={(v) => toggleNoti?.(v)}
          label="알림설정"
        />
      </MenuRow>
      <MenuRow onClick={handleClickSettings}>
        <MenuBox>
          <img src={Setting} />
          설정
        </MenuBox>
        <FaChevronRight color="#B7B7B7" />
      </MenuRow>
    </MenuWrapper>
  );
};

export default MyPageMenu;
