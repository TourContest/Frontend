import ProfileSettingForm from "src/components/commons/Forms/ProfileSettingForm";
import { RegisterContainer } from "../normalRegister.style";
import { ButtonWrapper } from "src/components/auth/login/login.style";
import BottomButton from "src/components/commons/Buttons/BottomButton";
import type { ProfileSettingStepProps } from "../types";

const ProfileSettingStep = ({
    nickname, imageUrl, isDuplicateChecked, isCheckingNickname, nicknameError, referralError, onChangeNickname, onBlurNickname, onCheckNickname, onNext, onChangeImg, onChangeReferral, isRegisterMode, referralCode
}: ProfileSettingStepProps) => {
    return (
        <>
            <RegisterContainer>
                <ProfileSettingForm 
                    nickname={nickname}
                    imageUrl={imageUrl}
                    onChangeNickname={onChangeNickname}
                    onBlurNickname={onBlurNickname}                  
                    onCheckNickname={onCheckNickname}
                    nicknameError={nicknameError}
                    isDuplicatedChecked={isDuplicateChecked}
                    isCheckingNickname={isCheckingNickname}
                    onChangeImage={onChangeImg}
                    isRegisterMode={isRegisterMode}
                    referralCode={referralCode}
                    referralError={referralError}
                    onChangeReferral={onChangeReferral}
                />
            </RegisterContainer>
            <ButtonWrapper>
                <BottomButton type="button" size="large" onClick={onNext} disabled={!isDuplicateChecked}>다음</BottomButton>
            </ButtonWrapper>
        </>
    )
}

export default ProfileSettingStep;