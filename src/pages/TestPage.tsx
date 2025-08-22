import { useState } from "react";
import ErrorToast from "src/components/commons/Toast";

const TestPage = () => {
    const [visible, setVisible] = useState(false);
    const handleShowToast = () => {
        setVisible(true)
    }

    return(
        <div>
            <button onClick={handleShowToast}>에러 토스트 띄우기</button>

            <ErrorToast 
                visible={visible}
                message="이메일 또는 비밀번호가 일치하지 않습니다."
                onClose={() => setVisible(false)}
            />
        </div>
    );
};

export default TestPage;