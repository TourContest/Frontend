import React from 'react';
import styled from '@emotion/styled';

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 120px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #FF8B4C;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 16px rgba(210, 210, 210, 0.4);
  cursor: pointer;
  z-index: 1001;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const EditIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '✏️';
    font-size: 20px;
  }
`;

const FloatingButton: React.FC = () => {
  const handleClick = () => {
    console.log('Write new post clicked');
    // Add functionality for writing new post
  };

  return (
    <FloatingButtonContainer onClick={handleClick}>
      <EditIcon />
    </FloatingButtonContainer>
  );
};

export default FloatingButton; 