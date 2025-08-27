import { AuthCaption } from "src/components/auth/register/normal/normalRegister.style";
import { Head3 } from "src/styles/typography";
import type { interestsFormProps } from "./types";
import { AlertBox, InterestFormWrapper, ThemeItems, ThemeWrapper } from "./form.styles";
import AlertIcon from "src/assets/Alert.svg";

const interestList = ["데이트", "힐링", "반려동물", "사진 명소", "가족 여행", "자연", "한달 살이", "나홀로 여행", "맛집 탐방", "액티비티", "액티", "비티"];

const InterestForm = ({ themes = [] , selected = [], onSelect }: interestsFormProps) => {
    const handleClick = (item: string) => {
        onSelect(item);
    }

    const activeThemes = themes.length > 0 ? themes : interestList;

    return(
        <InterestFormWrapper>
            <Head3 style={{ marginBottom: '5px' }}>테마를 선택해주세요</Head3>
            <AuthCaption style={{ margin: 0 }}>선택한 테마를 참고하여 추천해드릴게요!</AuthCaption>
            <ThemeWrapper>
                {activeThemes.map((item) => (
                    <ThemeItems key={item} type='button'  isActive={selected.includes(item)} onClick={() => handleClick(item)}>
                        {item}
                    </ThemeItems>
                ))}
            </ThemeWrapper>
            <AlertBox>
                <div>
                    <img src={AlertIcon} style={{ width: '15px' }}/>
                    <span>최대 3개까지 선택 가능합니다.</span>
                </div>
            </AlertBox>
        </InterestFormWrapper>
    )
};

export default InterestForm;