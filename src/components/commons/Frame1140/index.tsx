import type { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const Parent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 17px;
  text-align: left;
  font-size: 20px;
  color: #221f1f;
  font-family: Pretendard;
`;
const Title = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 140%;
  font-weight: 600;
`;
const GroupWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  color: #b7b7b7;
`;
const RectangleParent = styled.div`
  width: 120px;
  position: relative;
  height: 120px;
`;
const GroupChild = styled.div`
  position: absolute;
  top: -0.5px;
  left: -0.5px;
  border-radius: 12px;
  background-color: #f5f5f5;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  width: 121px;
  height: 121px;
`;
const GroupParent = styled.div`
  position: absolute;
  top: 47px;
  left: 49px;
  border-radius: 12px;
  width: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;
const FrameChild = styled.img`
  width: 17.5px;
  position: relative;
  height: 16.9px;
`;
const Div1 = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 140%;
`;

const Frame1140: FunctionComponent = () => {
  return (
    <Parent>
      <Title>사진 업로드</Title>
      <GroupWrapper>
        <RectangleParent>
          <GroupChild />
          <GroupParent>
            <FrameChild alt="" src="Group 7.svg" />
            <Div1>0/3</Div1>
          </GroupParent>
        </RectangleParent>
      </GroupWrapper>
    </Parent>
  );
};

export default Frame1140; 