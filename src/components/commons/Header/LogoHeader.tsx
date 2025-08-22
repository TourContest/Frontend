import Logo from '../../../assets/react.svg'
import styled from '@emotion/styled';

const LogoWrapper = styled.div`
    padding: 28px 20px 35px 20px;
`;

const LogoHeader = () => {
    return (
        <LogoWrapper>
            <img src={Logo} alt='하루제주' />
        </LogoWrapper>
    )
};

export default LogoHeader;