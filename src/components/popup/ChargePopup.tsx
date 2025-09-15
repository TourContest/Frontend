import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { PopupProps } from "./types";
import { Handle, Popup, PopupHeader, PupupBody, Count, ConvertBox, ArrowBox, PopupInputBox, PopupBottom, PopupOverlay } from "./style";
import Step from '../../assets/Steps.svg';
import Hanlabong from '../../assets/hanlabong.svg';
import Arrow from '../../assets/Arrow.svg';
import InputTextField from "../commons/Inputs/TextField";
import BottomButton from "../commons/Buttons/BottomButton";
import type { Validation } from "../commons/Inputs/TextField/types";
import { stepsApi } from "../../api/product";
import { QK } from "src/utils/lib/queryKeys";

export default function ChargePopup({ open, onClose, onSubmit }: PopupProps) {
    const [steps, setSteps] = useState('');
    const [remainingCount, setRemainingCount] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const onChangeSteps = (e: React.ChangeEvent<HTMLInputElement>) => setSteps(e.target.value.replace(/\D/g, '')); // 숫자만 허용

    // 1~100 정수 유효성
    const { validation, message, isValid } = useMemo((): {
        validation: Validation, message: string, isValid: boolean;
    } => {
        if(steps === '') return { validation: 'normal' as const, message: '한번에 최대 100개까지 교환 가능합니다.', isValid: false };
        
        const num = Number(steps);
        const success = Number.isInteger(num) && num >= 1 && num <= 100;

        return {
            validation: success ? 'positive' : 'negative',
            message: success ? '사용 가능한 값입니다.' : '1~100 정수만 입력하세요.',
            isValid: success,
        };
    },[steps]); 

      const handleConvert = async () => {
    try {
      const res = await stepsApi.convert(Number(steps));
        console.log("convert API 응답:", res.data);

      if (res.data.success) {
        const { totalHallabong, remainingExchangeCount } = res.data.data;

        // ✅ React Query 캐시 바로 수정 → MyHanlabong 즉시 업데이트
        queryClient.setQueryData(QK.sessionMe, (old: any) => {
          if (!old) return old;
          return { ...old, hallabong: totalHallabong };
        });

        setRemainingCount(remainingExchangeCount);

        onSubmit?.(totalHallabong); // 변환 결과 상위로 전달
        onClose(); // 팝업 닫기
      } else {
        alert("포인트 전환 실패");
      }
    } catch (e) {
      console.error(e);
      alert("서버 오류가 발생했습니다.");
    }
  };

    return(
        <PopupOverlay data-open={open} onClick={onClose}>
            <Popup data-open={open} onClick={(e) => e.stopPropagation()}>
                <PopupHeader onClick={onClose}>
                    <Handle aria-label="닫기" />
                    <h1>포인트 전환하기</h1>
                </PopupHeader>
                <PupupBody>
                    <Count>
                        <span className='count'>남은 횟수</span>
                        <span>({remainingCount ?? 0}/20)</span>
                    </Count>
                    <ConvertBox>
                        <div className="convert">
                            <img src={Step}/>
                            <span className="caption">걸음수</span>
                            <span>10</span>
                        </div>
                        <ArrowBox>
                            <img src={Arrow} />
                        </ArrowBox>
                        <div className="convert">
                            <img src={Hanlabong} />
                            <span className="caption">한라봉</span>
                            <span>1</span>
                        </div>
                    </ConvertBox>
                    <PopupInputBox>
                        <span>한번에 최대 100씩 교환이 가능해요!</span>
                        <InputTextField 
                            type="number"
                            value={steps}
                            onChange={onChangeSteps}
                            validation={validation}
                            message={message}
                            placeholder="포인트를 입력하세요."
                        />
                    </PopupInputBox>
                </PupupBody>
                <PopupBottom>
                    <BottomButton size="large" disabled={!isValid} onClick={handleConvert}>포인트 전환하기</BottomButton>
                </PopupBottom>
            </Popup>
        </PopupOverlay>
    )
};