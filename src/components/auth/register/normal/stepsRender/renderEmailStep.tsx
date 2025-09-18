import type { RegisterAction, RegisterState } from "src/types/RegisterTypes";
import EmailStep from "../steps/EmailStep";
import { authApi } from "src/api/auth";

export function renderEmailStep(
    state: RegisterState,
    dispatch: React.Dispatch<RegisterAction>,
    onNext: () => void
) {
    const handleCheckDuplicate = async () => {
        if (!state.isEmailValid) {
            dispatch({ type: 'SET_EMAIL_ERROR', message: '이메일 형식을 확인해주세요.'})
            return;
        }

        try {
            const res = await authApi.checkEmailDuplicate(state.email);
            
            if (!res.data.data) {
                dispatch({ type: 'CHECK_DUPLICATE_SUCCESS' });
                dispatch({ type: 'SHOW_AUTH_INPUT' });

                await handleSendAuthCode();
            } else {
                dispatch({ type: 'SET_EMAIL_ERROR', message: '이미 사용중인 이메일입니다.'})
            }
        } catch(err) {
            console.error(err);
            if (err instanceof Error) console.error('error:', err.message);
            dispatch({ type: 'SET_EMAIL_ERROR', message: '서버 오류 발생'})
        }
    };

    const handleSendAuthCode = async () => {
        try {
            await authApi.sendEmailCode(state.email); 
        } catch(err) {
            console.error(err);
            if(err instanceof Error) console.error('error:', err.message);
            dispatch({ type: 'SET_EMAIL_ERROR', message: '인증번호 발송 중 오류가 발생했습니다.' });
        }
    }
    
    const handleConfirmAuth = async () => {
        
        try {
            const res = await authApi.verifyEmailCode(state.email, state.authCode);
            
            if (res.data.success) {
                dispatch({ type: 'AUTH_SUCCESS' });
            } else {
                dispatch({ type: 'SET_AUTH_ERROR', message: res.data?.message || '인증번호가 올바르지 않습니다.' });
            }
        } catch(err) {
            console.error(err);
            if (err instanceof Error) console.error('error:', err.message);
            dispatch({ type: 'SET_AUTH_ERROR', message: '서버와 통신 중 오류가 발생했습니다.'})
        }

    };

    return (
        <EmailStep 
            email={state.email}
            authCode={state.authCode}
            isEmailValid={state.isEmailValid}
            isDuplicateChecked={state.isDuplicateChecked}
            showAuthInput={state.showAuthInput}
            authPassed={state.authPassed}
            emailErrorMessage={state.emailError}
            authErrorMessage={state.authError}
            onChangeEmail={(value) => dispatch({ type: 'SET_EMAIL', value })}
            onChangeAuthCode={(value) => dispatch({ type: 'SET_AUTH_CODE', value })}
            onEmailBlur={() => dispatch({ type: 'VALIDATE_EMAIL' })}
            onCheckDuplicate={handleCheckDuplicate}
            onConfirmAuth={handleConfirmAuth}
            onNext={onNext}
        />
    )
}