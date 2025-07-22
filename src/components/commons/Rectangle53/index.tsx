import type { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const RectangleDiv = styled.div`
  width: 100%;
  position: relative;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  box-sizing: border-box;
  height: 121px;
`;

const Rectangle53: FunctionComponent = () => {
  return <RectangleDiv />;
};

export default Rectangle53; 