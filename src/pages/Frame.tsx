import type { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

const CardContainer = styled.div`
  width: 375px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bg[0]};
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    `${theme.shadow.shadow1.x}px ${theme.shadow.shadow1.y}px ${theme.shadow.shadow1.blur}px ${theme.shadow.shadow1.spread}px ${theme.shadow.shadow1.color}`};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 32px 0;
`;

const RectangleParent = styled.div`
  width: 335px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 32px auto 0 auto;
`;

const FrameChild = styled.div`
  width: 160px;
  height: 200px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray[300]};
`;

const UserName = styled.div`
  font-family: ${({ theme }) => theme.typography.body1.fontFamily};
  font-weight: ${({ theme }) => theme.typography.body1.fontWeight};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-top: 24px;
  text-align: center;
`;

const Date = styled.div`
  font-family: ${({ theme }) => theme.typography.caption1.fontFamily};
  font-weight: ${({ theme }) => theme.typography.caption1.fontWeight};
  font-size: ${({ theme }) => theme.typography.caption1.fontSize};
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-bottom: 12px;
  text-align: center;
`;

const Content = styled.div`
  width: 330px;
  font-family: ${({ theme }) => theme.typography.body4.fontFamily};
  font-weight: ${({ theme }) => theme.typography.body4.fontWeight};
  font-size: ${({ theme }) => theme.typography.body4.fontSize};
  color: ${({ theme }) => theme.colors.gray[700]};
  line-height: 140%;
  margin-bottom: 24px;
  text-align: center;
`;

const Frame: FunctionComponent = () => {
  const theme = useTheme();
  return (
    <CardContainer>
      {/* 상단 네비게이션 등은 필요시 추가 */}
      <RectangleParent>
        <FrameChild />
        <FrameChild />
      </RectangleParent>
      <UserName>닉네임은몇자까지</UserName>
      <Date>2000.00.00</Date>
      <Content>
        이 기분 오래오래 간직하고 싶다. 사진보다 눈으로 보는 게 더 예쁨 자꾸만 마음이 느긋해지는 느낌 아무 말 없이도 충격적이야 완전 이뻐서 맘에 들어 가고 싶다 나도 제주도 재미있겠다 딱새우회 맛있겠다.이 기분 오래오래 간직하고 싶다.사진보다 눈으로 보는 게 더 예쁨 자꾸만 마음이 느긋해지는 느낌 아무 말 없이도 충격적이야 완전 이뻐서 맘에 들어 가고 싶다 나도 제주도 재미있겠다 딱새우회 맛있겠다.
      </Content>
      {/* 댓글, 기타 영역도 theme 기반 styled로 추가 가능 */}
    </CardContainer>
  );
};

export default Frame; 