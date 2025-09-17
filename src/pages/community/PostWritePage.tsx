import styled from '@emotion/styled';
import { theme } from 'src/styles/theme';
import { useReducer, useState } from 'react';
import { initialSpot, spotReducer } from 'src/reducer/SpotReducer';
import type { SpotCreate } from 'src/types/SpotTypes';
import BackHeader from 'src/components/commons/Header/BackHeader';
import ImgPicker from 'src/components/community/Spot/ImgPicker';
import LocationField from 'src/components/community/Spot/LocationFeild';
import TextField from 'src/components/community/Spot/TextField';
import ThemeField from 'src/components/community/Spot/ThemeField';
import HashTagField from 'src/components/community/Spot/HashTagField';
import ErrorToast from 'src/components/commons/Toast';
import { ButtonWrapper } from 'src/components/auth/login/login.style';
import BottomButton from 'src/components/commons/Buttons/BottomButton';
import { useSpotValidation } from 'src/features/spot/useSpotFormValidation';
import PostSuccessModal from 'src/components/modal/PostSuccessModal';
import LocationModal from 'src/components/modal/LocationModal';
import { useCreateSpot } from 'src/features/spot/useCreateSpot';

const ContentWrapper = styled.form`
  padding: 30px 0 0 0;
  max-width: 720px;
  margin: 0 auto;
`;

const Head3 = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.gray[800]};
  margin-bottom: 10px;
  line-height: 1.4;

  strong { color: ${theme.colors.primary[400]}; }
`

const Section = styled.div`
  padding: 15px 20px;
`;

// TODO: 서버에서 받은걸로 변경
// * 호출 시 UI는 배열인데, API는 단일id로 되어있음
const THEME_OPTIONS = [
  { id: 1, label: '데이트' },
  { id: 2, label: '힐링' },
  { id: 3, label: '반려동물' },
  { id: 4, label: '사진 명소' },
  { id: 5, label: '가족 여행' },
  { id: 6, label: '자연' },
  { id: 7, label: '한달 살이' },
  { id: 8, label: '나홀로 여행' },
  { id: 9, label: '맛집 탐방' },
];
const PostWritePage = () => {
  const createSpot = useCreateSpot();

  const [spot, dispatch] = useReducer(spotReducer, initialSpot as SpotCreate);
  const { errors, validate } = useSpotValidation(spot, dispatch);
  
  const tags = [spot.tag1, spot.tag2, spot.tag3].filter(Boolean) as string[];
  const handleTagsChange = (next: string[]) => {
    dispatch({ type: 'SET_FIELD', field: 'tag1', value: next[0] ?? '' });
    dispatch({ type: 'SET_FIELD', field: 'tag2', value: next[1] ?? '' });
    dispatch({ type: 'SET_FIELD', field: 'tag3', value: next[2] ?? '' });
  };

  const [toast, setToast] = useState({ visible: false, message: '' });
  const showError = (msg: string) => setToast({ visible: true, message: msg });
  const hideError = () => setToast({ visible: false, message: '' });

  const [successOpen, setSuccessOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const errs = validate();

    if (errs.locationText || errs.description) {
      // 둘 다 에러
      if (errs.locationText && errs.description) showError('위치와 내용을 입력해주세요.');
      // 하나만 에러
      if (errs.locationText && !errs.description) { showError(errs.locationText); return; }
      if (!errs.locationText && errs.description) { showError(errs.description); return; }
      return;
    };
    
    createSpot.mutate(spot, {
      onSuccess: () => setSuccessOpen(true),
      onError: () => showError('등록에 실패했습니다.'),
    });
};

  return (
    <>
      <BackHeader title="스팟추가" />
        <ContentWrapper onSubmit={handleSubmit} noValidate>

          {/* 이미지 */}
          <Head3 style={{ marginBottom: "17px", paddingLeft: '20px' }}>사진 업로드</Head3>
          <ImgPicker 
            images={spot.images} 
            onChange={(files: File[]) => dispatch({ type: "SET_FIELD", field: "images", value: files })}
          />

          {/* 위치 */}
          <Section style={{ padding: '20px 20px 15px 20px' }}>
            <LocationField 
              value={spot.name || ''}
              onChange={(text) => dispatch({ type: "SET_LOCATION_TEXT", value: text })}
              openModal={() => setLocationModalOpen(true)}
              message={errors.locationText}
            />
          </Section>

          {/* 내용 */}
          <Section>
            <Head3>
              내용을 입력해주세요.
              <strong>*</strong>
            </Head3>
            <TextField
              required
              value={spot.description ?? ''}
              onChange={(v) => dispatch({ type: "SET_FIELD", field: 'description', value: v })}
              placeholder="메시지를 입력해 주세요."
              minRows={3}
              maxRows={14}
              maxLength={200}
              errorText={errors.description}
              
            />
          </Section>

          {/* 테마 */}
          <Section>
            <Head3>테마를 선택해주세요.</Head3>
            <ThemeField options={THEME_OPTIONS} value={spot.themeId} onChange={(v) => dispatch({ type: "SET_FIELD", field: 'themeId', value: v })}/>
          </Section>

          {/* 해시태그 */}
          <Section style={{ paddingBottom: '137px'}}>
            <Head3>해시태그를 입력해주세요.</Head3>
            <HashTagField value={tags} onChange={handleTagsChange} max={3}/>
          </Section>
          <ButtonWrapper>
            <BottomButton type='submit' size='large'>등록하기</BottomButton>
          </ButtonWrapper>

          {/* 에러 토스트 */}
         <ErrorToast message={toast.message} visible={toast.visible} onClose={hideError} />

          {/* 성공모달 */}
          <PostSuccessModal open={successOpen} onClose={() => setSuccessOpen(false) }/>

          <LocationModal
            open={locationModalOpen}
            onClose={() => setLocationModalOpen(false)}
            onSelect={(lat, lng, name) => {
              dispatch({ type: "SET_COORDS", latitude: lat, longitude: lng });
              dispatch({ type: "SET_LOCATION_TEXT", value: name ?? `${lat}, ${lng}` });
            }}
          />
        </ContentWrapper>
    </>
  );
};

export default PostWritePage;