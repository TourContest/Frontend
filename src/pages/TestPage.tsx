import { useState } from "react";
import BottomButton from "src/components/commons/Buttons/BottomButton";
import InputTextField from "src/components/commons/Inputs/TextField";

const TestPage = () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');


    return(
        <div>
            <BottomButton size="small">작은 버튼</BottomButton>
            <BottomButton size="medium">중간 버튼</BottomButton>
            <BottomButton size="large">큰 버튼</BottomButton>
            <BottomButton size="large" disabled>비활성</BottomButton>
            <BottomButton size="large" onClick={() => alert('clicked!')}>클릭!</BottomButton>
            <InputTextField label="기본입력" validation='normal' placeholder="기본입력" value={value1} onChange={(e) => setValue1(e.target.value)}/>
            <InputTextField label="성공상태" validation='positive' message="올바른 입력입니다." placeholder="성공예시" value={value2} onChange={(e) => setValue2(e.target.value)}/>
            <InputTextField label="오류상태" validation='negative' message="잘못된 입력입니다." placeholder="오류예시" value={value3} onChange={(e) => setValue3(e.target.value)}/>
            <InputTextField label="disabled" validation='negative' placeholder='read only' disabled readOnly />
        </div>
    );
};

export default TestPage;