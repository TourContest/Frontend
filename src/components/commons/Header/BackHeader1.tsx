import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import styled from "@emotion/styled";
import React from "react";

type BackHeaderProps = {
    title?: React.ReactNode;
    onBack?: () => void;
    backTo?: number | string;
    replace?: boolean;
    state?: any;
    /** 'center' = 기존 중앙제목, 'inline' = 아이콘 옆 제목 */
    variant?: 'center' | 'inline';
    /** 우측에 넣을 요소(옵션) */
    right?: React.ReactNode;
}

const TopNav = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  margin: 0 auto;
  padding: 8px 12px; /* 세로 여백도 살짝 줄임 */
  background: #fff;
`;

const CenterTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  padding: 4px;             /* 터치 영역 확보 */
  line-height: 0;
  cursor: pointer;
`;

const InlineTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  /* 길면 말줄임 */
  flex: 1;
`;

const RightBox = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BackHeader1: React.FC<BackHeaderProps> = ({
                                                   title,
                                                   onBack,
                                                   backTo,
                                                   replace,
                                                   state,
                                                   variant = 'center',
                                                   right,
                                               }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) return onBack();
        if (typeof backTo === "number") return navigate(backTo);
        if (typeof backTo === "string") return navigate(backTo, { replace, state });
        return navigate(-1);
    };

    return (
        <TopNav>
            {variant === 'inline' ? (
                <Row>
                    <BackBtn onClick={handleBack} aria-label="뒤로가기">
                        <FiChevronLeft size={24} color="#221F1F" />
                    </BackBtn>
                    {title ? <InlineTitle>{title}</InlineTitle> : null}
                    {right ? <RightBox>{right}</RightBox> : null}
                </Row>
            ) : (
                <>
                    <FiChevronLeft
                        size={24}
                        color="#221F1F"
                        style={{ cursor: 'pointer' }}
                        onClick={handleBack}
                    />
                    {title ? <CenterTitle>{title}</CenterTitle> : null}
                </>
            )}
        </TopNav>
    );
};

export default BackHeader1;