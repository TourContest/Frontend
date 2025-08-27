import Logo from '../../../assets/Logo.svg'
import styled from '@emotion/styled';

const LogoWrapper = styled.div`
    padding: 28px 20px 35px 20px;
`;

const LogoHeader = () => {
    return (
        <LogoWrapper>
            <img src={Logo} alt='하루제주' style={{ width: "40px"}} />
        </LogoWrapper>
    )
};

export default LogoHeader;