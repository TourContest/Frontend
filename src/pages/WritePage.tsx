import type { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ButtonsChip from '../components/commons/ButtonsChip';
import Rectangle53 from '../components/commons/Rectangle53';
import Icons from '../components/commons/Icons';

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg[0]};
`;
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 375px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const TopNav = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`;
const Time = styled.div`
  margin-top: 10px;
  margin-left: 14px;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.02em;
`;
const BackButton = styled.button`
  margin-top: 2px;
  margin-left: 14px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;
const Title = styled.div`
  position: absolute;
  top: 10px;
  left: 97px;
  width: 180px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
`;
const Section = styled.div`
  margin: 24px 20px 0 20px;
`;
const UploadBox = styled.div`
  flex: 1 1 0;
  max-width: 121px;
  height: 121px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UploadText = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[500]};
  text-align: center;
`;
const InputLabel = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;
const TextInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding: 12px;
  font-size: 16px;
  resize: none;
`;
const ChipList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 8px;
  margin-top: 8px;
  justify-content: space-between;
`;
const Chip = styled.div`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray[200]};
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 500;
`;
const SubmitButton = styled.button`
  width: 100%;
  height: 48px;
  margin: 32px 0 0 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary[400]};
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;
const UploadSection = styled.div`
  margin: 0 20px;
  margin-top: 17px;
`;
const UploadTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 17px;
`;
const UploadImagesRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  margin-bottom: 20px;
`;
const AddButton = styled.button`
  flex: 1 1 0;
  max-width: 121px;
  height: 121px;
  border-radius: 12px;
  border: 1px solid #ccc;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #b7b7b7;
  cursor: pointer;
`;
const LocationLabelRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const THEME_LABELS = [
  '데이트', '힐링', '반려동물', '사진 명소', '가족 여행', '자연', '한달 살이', '나홀로 여행', '맛집 탐방'
];

const WritePage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  // 임시 이미지 배열 (실제 업로드 기능 구현 전)
  const [images, setImages] = useState<string[]>([]); // string[] 대신 File[] 등으로 교체 가능

  const handleChipClick = (label: string) => {
    if (selectedThemes.includes(label)) {
      setSelectedThemes(selectedThemes.filter((t) => t !== label));
    } else if (selectedThemes.length < 3) {
      setSelectedThemes([...selectedThemes, label]);
    }
  };

  // 임시: 이미지 추가 버튼 (실제 구현 시 파일 업로드로 대체)
  const handleAddImage = () => {
    if (images.length < 3) setImages([...images, 'dummy']);
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <TopNav>
          <Time>9:41</Time>
          <BackButton onClick={() => navigate(-1)} aria-label="뒤로가기">
            <FiChevronLeft size={24} />
          </BackButton>
          <Title>스팟 추가</Title>
        </TopNav>
        <UploadSection>
          <UploadTitle>사진 업로드</UploadTitle>
          <UploadImagesRow>
            {images.map((img, idx) => <UploadBox key={idx}><Rectangle53 /></UploadBox>)}
            {images.length < 3 && <AddButton onClick={handleAddImage}>+</AddButton>}
            {[...Array(3 - images.length - (images.length < 3 ? 1 : 0))].map((_, idx) => <UploadBox key={`empty-${idx}`} />)}
          </UploadImagesRow>
        </UploadSection>
        <Section>
          <LocationLabelRow>
            <Icons />
            <InputLabel style={{ marginBottom: 0 }}>
              위치를 알려주세요. <span style={{ color: '#ff8b4c' }}>*</span>
            </InputLabel>
          </LocationLabelRow>
          <TextInput placeholder="현재 위치가 반영됩니다." readOnly />
        </Section>
        <Section>
          <InputLabel>내용을 입력해주세요. <span style={{ color: '#ff8b4c' }}>*</span></InputLabel>
          <TextInput placeholder="제주의 스팟을 소개해주세요." maxLength={200} />
        </Section>
        <Section>
          <InputLabel>테마를 선택해주세요.</InputLabel>
          <ChipList>
            {THEME_LABELS.slice(0, 4).map((label) => (
              <ButtonsChip
                key={label}
                label={label}
                selected={selectedThemes.includes(label)}
                onClick={() => handleChipClick(label)}
              />
            ))}
          </ChipList>
          <ChipList>
            {THEME_LABELS.slice(4, 8).map((label) => (
              <ButtonsChip
                key={label}
                label={label}
                selected={selectedThemes.includes(label)}
                onClick={() => handleChipClick(label)}
              />
            ))}
          </ChipList>
          <ChipList>
            {THEME_LABELS.slice(8, 9).map((label) => (
              <ButtonsChip
                key={label}
                label={label}
                selected={selectedThemes.includes(label)}
                onClick={() => handleChipClick(label)}
              />
            ))}
          </ChipList>
        </Section>
        <Section>
          <InputLabel>해시태그를 입력해주세요.</InputLabel>
          <TextInput placeholder="최대 3개까지 가능해요." maxLength={30} />
        </Section>
        <Section>
          <SubmitButton>등록하기</SubmitButton>
        </Section>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default WritePage; 