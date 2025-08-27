import { AuthCaption, DupCheckBtn } from "src/components/auth/register/normal/normalRegister.style";
import { Head3 } from "src/styles/typography"
import InputTextField from "../Inputs/TextField";
import type { ProfileFormProps } from "./types";
import { CameraIcon, HiddenImgInput, ImgInputWrapper, PreviewImg, ProfileUploadBox, ProfileUploadWrapper } from "./form.styles";
import defaultProfile from 'src/assets/default_profile.svg';
import camera from 'src/assets/Camera_2.svg';
import { useRef } from "react";

const ProfileSettingForm = ({
    nickname, imageUrl, onChangeNickname, onBlurNickname, onCheckNickname, nicknameError, isDuplicatedChecked, isCheckingNickname, onChangeImage, isRegisterMode, referralCode, onChangeReferral, referralError
}: ProfileFormProps) => {
    const profileRef = useRef<HTMLInputElement>(null);
    const selectedProfile = imageUrl || defaultProfile;
    const isDefaultImg = !imageUrl || imageUrl === defaultProfile;

    const handleClick = () => profileRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file && file.type.startsWith('image/')) onChangeImage(file);
    }    

    const validation = 
        nicknameError 
            ? 'negative' : isDuplicatedChecked
            ? 'positive' : isCheckingNickname
            ? 'normal' : 'normal'
        
    const successMessage = isDuplicatedChecked && !nicknameError ? "사용 가능한 닉네임이에요!" : '';


    return (
        <>
            <Head3>프로필을 설정해주세요.</Head3>
            <ProfileUploadBox>
                <ProfileUploadWrapper>
                    <ImgInputWrapper onClick={handleClick}>
                        <HiddenImgInput type="file" accept='image/*' ref={profileRef} onChange={handleFileChange} />
                        <PreviewImg src={selectedProfile} isDefault={isDefaultImg} />
                    </ImgInputWrapper>
                    <CameraIcon>
                        <img src={camera} style={{ width: '20px'}}/>
                    </CameraIcon>
                </ProfileUploadWrapper>
            </ProfileUploadBox>
            <AuthCaption>닉네임을 입력해주세요.</AuthCaption>
            <InputTextField 
                type="text"
                placeholder="최대 8자까지 가능해요."
                value={nickname}
                maxLength={8}
                onChange={(e) => onChangeNickname(e.target.value)}
                onBlur={onBlurNickname}
                validation={validation}
                rightSlot={
                    !isDuplicatedChecked && (
                        <DupCheckBtn
                            type="button"
                            onClick={onCheckNickname}
                            disabled={!nickname.trim() || isCheckingNickname}
                            >
                            중복확인
                        </DupCheckBtn>
                    )
                }
                message={nicknameError || successMessage}
                />
            {isRegisterMode && (
                <>
                    <AuthCaption>추천인을 입력해주세요.</AuthCaption>
                    <InputTextField 
                        type="text"
                        value={referralCode || ''}
                        maxLength={8}
                        onChange={(e) => onChangeReferral?.(e.target.value)}
                        validation={referralError ? 'negative' : 'normal'}
                        message={referralError}
                    />
                </>
            )}
        </>
    )
}

export default ProfileSettingForm;