import { useEffect, useState } from "react";
import { ButtonWrapper, Wrapper } from "src/components/auth/login/login.style";
import BottomButton from "src/components/commons/Buttons/BottomButton";
import InterestForm from "src/components/commons/Forms/interestForm";
import BackHeader from "src/components/commons/Header/BackHeader"
import { useSessionMe } from "src/features/my-page/useSessionMe";
import { useChangeThemes } from "src/features/user/useChangeThemes";

const ThemeEditPage:React.FC = () => {
    const { data: me } = useSessionMe();
    const { mutate: submitChangeThemes, isPending } = useChangeThemes();

    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        if (me?.themes) setSelected(me.themes);
    }, [me?.themes])

    const handleSelectTheme = (theme: string) => {
        setSelected((prev) => {
            const isSelected = prev.includes(theme);
            if (isSelected) return prev.filter((t) => t !== theme);
            if (prev.length < 3) return [ ...prev, theme ];
            return [ ...prev.slice(1), theme];
        });
    };

    const handleSave = () => {
        console.log('[ThemeEditPage] save click', selected); 
        submitChangeThemes({ themes: selected })
    };

    return (
        <>
            <BackHeader title="테마 수정하기" />
            <Wrapper>
                <InterestForm selected={selected} onSelect={handleSelectTheme} themes={[]}/>
            </Wrapper>
            <ButtonWrapper>
                <BottomButton type="button" size="large" onClick={handleSave} disabled={isPending}>수정하기</BottomButton>
            </ButtonWrapper>
        </>
    )
}

export default ThemeEditPage;