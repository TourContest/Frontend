import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "src/api/auth";
import { ButtonWrapper, Wrapper } from "src/components/auth/login/login.style";
import BottomButton from "src/components/commons/Buttons/BottomButton";
import ProfileSettingForm from "src/components/commons/Forms/ProfileSettingForm";
import BackHeader from "src/components/commons/Header/BackHeader"
import { useSessionMe } from "src/features/my-page/useSessionMe";
import { useProfileEditor } from "src/features/user/useProfileEditor";

const ProfileEditPage: React.FC = () => {
    const navigate = useNavigate();

    const { data: me } = useSessionMe();
    const { editSave , isSaving } = useProfileEditor();

    const [nickname, setNickname] = useState('');
    const [nicknameErr, setNicknameErr] = useState('');
    const [isDuplicated, setIsDuplicated] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    const [imgUrl, setImgUrl] = useState<string>('');
    const [file, setFile] = useState<File | Blob | null>(null);

    useEffect(() => {
        if(!me) return;
        setNickname(me.nickname ?? '');
        setImgUrl(me.profile ?? '');
        setNicknameErr('');
        setIsDuplicated(true);
    }, [me]);

    const nicknameChanged = useMemo(
        () => (me?.nickname ?? '') !== nickname,
        [me?.nickname, nickname]
    );

    const handleChangeNickname = (value:string) => {
        setNickname(value);
        setNicknameErr('');
        setIsDuplicated(false);
    };

    const handleCheckNickname = async () => {
        const trimmed = nickname.trim();

        if(!trimmed) {
            setNicknameErr("닉네임을 입력해주세요.");
            setIsDuplicated(false);
            return;
        };

        if(!nicknameChanged) {
            setIsDuplicated(true);
            setNicknameErr('');
            return;
        };

        setIsCheck(true);

        try {
            const res = await authApi.checkNicknameDuplicate(trimmed);
            const isDuplicate = res.data?.data === true;

            setIsDuplicated(!isDuplicate);
            setNicknameErr(isDuplicate ? "이미 사용중인 닉네임입니다." : '');
        } catch (err:any) {
            const message = err?.response?.data?.message ?? "중복확인에 실패했습니다."
            setIsDuplicated(false);
            setNicknameErr(message);
        } finally { setIsCheck(false); }
    };

    const handleChangeImg = async (picked: File | Blob) => {
        setFile(picked);
        if (picked instanceof File) setImgUrl(URL.createObjectURL(picked));
    }
    
    const handleEditSave = async () => {
        if (nicknameChanged && !isDuplicated) {
            setNicknameErr("닉네임 중복확인을 해주세요.");
            return;
        }

        await editSave({
            newNickname: nickname,
            originalNickname: me?.nickname ?? '',
            file,
        });

        navigate('/mypage');
    };

    const disabled = isSaving || isCheck || (!nicknameChanged && !file) || (nicknameChanged && !isDuplicated);

    return (
        <>
            <BackHeader title="프로필 수정하기" />
            <Wrapper>
                <ProfileSettingForm 
                    nickname={nickname}
                    imageUrl={imgUrl}
                    onChangeImage={handleChangeImg}
                    onChangeNickname={handleChangeNickname}
                    onBlurNickname={() => {}}
                    onCheckNickname={handleCheckNickname}
                    nicknameError={nicknameErr}
                    isDuplicatedChecked={isDuplicated}
                    isCheckingNickname={isCheck}
                    isRegisterMode={false}
                />
            </Wrapper>
            <ButtonWrapper>
                <BottomButton type="button" size="large" onClick={handleEditSave} disabled={disabled}>수정하기</BottomButton>
            </ButtonWrapper>
        </>
    )
}

export default ProfileEditPage;