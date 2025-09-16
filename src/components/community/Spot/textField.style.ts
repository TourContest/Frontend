import styled from '@emotion/styled';
import { theme } from 'src/styles/theme';

export const Field = styled.div`
    --bd: ${theme.colors.gray[300]};           /* 기본 테두리 */
    --bd-focus: ${theme.colors.primary[400]};     /* 포커스 보라 */
    --bd-error: ${theme.colors.error[100]};     /* 에러 빨강 */
    --txt: ${theme.colors.gray[700]};
    --txt-muted: ${theme.colors.gray[500]};
    --placeholder: ${theme.colors.gray[400]};
    --bg: #ffffff;
    --bg-disabled: ${theme.colors.gray[100]};

    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

export const Label = styled.label`
    color: var(--txt);
    font-weight: 500;
    line-height: 1.4;
    .req { color: #FF8B4C; margin-left: 4px; }
`;

export const Box = styled.div`
    position: relative;
    grid-template-rows: auto minmax(22px, auto); 
    border: 1px solid var(--bd);
    border-radius: 12px;
    background: var(--bg);
    transition: border-color 120ms ease, box-shadow 120ms ease;

    &[data-disabled='true'] { background: var(--bg-disabled); }

    &[data-invalid='true'] { border-color: var(--bd-error); }

    &:focus-within { border: 2px solid var(--bd-focus); }
`;

export const TextArea = styled.textarea`
    font-family: ${theme.typography.body1}

    width: 100%;
    min-height: 0;              
    resize: none;               
    overflow: hidden;

    padding: 12px; 
    padding-bottom: 32px;
    border: 0; outline: 0;
    background: transparent;

    color: var(--txt);
    line-height: 1.4;

    &::placeholder {
        color: var(--placeholder);
    }
`;

export const Foot = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Message = styled.div`
    font-size: 13px;
    line-height: 1.4;
    color: var(--txt-muted);
    .error { color: var(--bd-error); }
`;

export const Counter = styled.div`
    position: absolute;
    left: 12px; bottom: 12px;
    font-size: 13px;
    line-height: 1.4;
    color: var(--txt-muted);
`;