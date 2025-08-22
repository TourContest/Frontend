import BottomButton from "src/components/commons/Buttons/BottomButton"
import { ButtonWrapper } from "./login.style"

type LoginBottomProps = {
    isFormValid: boolean;
    onSubmit: () => void;
}

const LoginSubmit = ({ isFormValid, onSubmit }: LoginBottomProps) => {
    return (
        <ButtonWrapper>
            <BottomButton 
                type="submit"
                size ='large'
                disabled={!isFormValid}
                form="login-form"
                onClick={onSubmit}
            >
                입장하기
            </BottomButton>
        </ButtonWrapper>
    )
};

export default LoginSubmit;