import { useState } from "react";
import SuccessToast from "src/components/commons/SuccessToast";
import ErrorToast from "src/components/commons/Toast";

const TestPage = () => {

        const [showError, setShowError] = useState(false);
        const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div>
      <h1>Toast 테스트</h1>
      <button onClick={() => setShowError(true)}>에러 토스트 띄우기</button>
      <button onClick={() => setShowSuccess(true)}>성공 토스트 띄우기</button>

      {/* 에러 토스트 */}
      <ErrorToast
        message="문제가 발생했습니다!"
        visible={showError}
        onClose={() => setShowError(false)}
      />

      {/* 성공 토스트 */}
      <SuccessToast
        message="성공적으로 처리되었습니다!"
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default TestPage;