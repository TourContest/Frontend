import { GoCheckCircleFill } from 'react-icons/go';
import KO from '../../assets/Korea.svg';
import EN from '../../assets/English.svg';
import { CheckIcon, LangItem, LangLeft, LangWrapper } from './selectBox.style';
import { Guide, LangSelectorWrapper } from './splash.style';
import { ButtonWrapper } from '../auth/login/login.style';
import BottomButton from '../commons/Buttons/BottomButton';
import LogoHeader from '../commons/Header/LogoHeader';

const langArr = [
    { key: 'ko', label: '한국어', icon: <img src={KO} width={24} /> },
    { key: 'en', label: 'English', icon: <img src={EN} width={24} /> },
];

interface LanguageSelectorProps {
    selected: string;
    onSelect: (lang: string) => void;
    onSubmit: () => void;
};

const LanguageSelector = ({ selected, onSelect, onSubmit }: LanguageSelectorProps) => {
    return (
        <>
            <LogoHeader />
            <LangSelectorWrapper>
                <Guide>
                    하루제주에 입장 전<br />
                    언어를 선택해주세요.
                </Guide>
                <LangWrapper>
                    {langArr.map(({ key, label, icon }) => (
                        <LangItem key={key} isActive={selected === key} onClick={() => onSelect(key)}>
                            <LangLeft>
                                {icon}
                                <span>{label}</span>
                            </LangLeft>
                            <CheckIcon isActive={selected === key}>
                                <GoCheckCircleFill size={24} />
                            </CheckIcon>
                        </LangItem>
                    ))}
                </LangWrapper>
            </LangSelectorWrapper>
            <ButtonWrapper>
                <BottomButton
                    type="submit"
                    size ='large'
                    disabled={!selected}
                    onClick={onSubmit}
                >
                    다음
                </BottomButton>
            </ButtonWrapper>
        </>
    )
};

export default LanguageSelector; 