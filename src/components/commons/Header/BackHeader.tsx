import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import styled from "@emotion/styled";

type BackHeaderProps = {
    title?: React.ReactNode;
}

const TopNav = styled.div`
    position: sticky;
    top: 0;
    z-index: 10;
    margin: 0 auto;
    padding : 10px 14px;
    background: #fff;
`;

const BackTitle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
`;

const BackHeader: React.FC<BackHeaderProps> = ({ title }) => {
    const navigate = useNavigate();

    return (
        <TopNav>
            <FiChevronLeft 
                size={24} 
                color="#221F1F" 
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(-1)}
            />
            {title ? <BackTitle>{title}</BackTitle> : null}
        </TopNav>
    );
};

export default BackHeader;