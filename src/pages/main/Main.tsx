import { useState, useEffect } from "react";
import { useCheckIn } from "src/features/main/useCheckIn";
import CheckInModal from "src/components/modal/CheckInModal";
import KaKaoMap from "src/components/map/KaKaoMap";
import BottomNavigation from "src/components/commons/Navigation/BottomNavigation";

export default function Main() {
  const { state, claim } = useCheckIn();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state.shouldOpen) {
      setOpen(true);
    }
  }, [state.shouldOpen]);

  return (
    <div>
      <KaKaoMap appKey={import.meta.env.VITE_KAKAO_JS_KEY} />
      <CheckInModal
        open={open}
        day={state.day}
        reward={state.reward}
        bonus={state.bonus}
        onClose={() => setOpen(false)}
        onClaim={() => {
          claim();
          setOpen(false);
        }}
      />
      <BottomNavigation />
    </div>
  );
}
