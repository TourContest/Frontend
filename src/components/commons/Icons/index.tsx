import type { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const IconsWrapper = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const VectorIcon = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
const SubtractIcon = styled.img`
  position: relative;
  width: 22.6px;
  height: 26.7px;
`;

const Icons: FunctionComponent = () => {
  return (
    <IconsWrapper>
      <VectorIcon alt="" src="Vector.svg" />
      <SubtractIcon alt="" src="Subtract.svg" />
    </IconsWrapper>
  );
};

export default Icons; 