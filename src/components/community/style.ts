import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { FiSearch } from 'react-icons/fi';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;
  background-color: ${theme.colors.bg[50]};
  padding: 20px;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.bg[0]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-top: 30px;
`;

export const TabButton = styled.button<{ active: boolean }>`
  flex: 1 1 0;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: none;
  background: none;
  font-family: ${theme.typography.body1.fontFamily};
  font-size: ${theme.typography.body1.fontSize};
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? theme.colors.primary[400] : theme.colors.gray[500]};
  cursor: pointer;
  border-bottom: ${props => props.active ? `1.5px solid ${theme.colors.primary[400]}` : `1px solid ${theme.colors.gray[200]}`};
  transition: all 0.2s ease;
`;

export const PostsContainer = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${theme.colors.gray[100]};
  padding: 12px;
  border-radius: 12px;
`;

export const SearchIcon = styled(FiSearch)`
  flex-shrink: 0;
  color: ${theme.colors.gray[300]};
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;