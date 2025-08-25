import { useState, useEffect } from "react";
import { useCheckIn } from "src/features/main/useCheckIn";
import CheckInModal from "src/components/modal/CheckInModal";

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
      {/* 여기는 일단 나중에.. */}
      <h1>메인</h1>

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
    </div>
  );
}
