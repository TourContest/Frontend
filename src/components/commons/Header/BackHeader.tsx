import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import styled from "@emotion/styled";

const TopNav = styled.div`
    max-width: 560px;
    margin: 0 auto;
    padding : 10px 14px;
`;

const BackHeader = () => {
    const navigate = useNavigate();

    return (
        <TopNav>
            <FiChevronLeft 
                size={24} 
                color="#221F1F" 
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(-1)}
            />
        </TopNav>
    );
};

export default BackHeader;