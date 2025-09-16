import styled from '@emotion/styled'

export const RemoveBtn = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px; height: 18px;
    margin-left: 6px;
    border: none;
    background: transparent;
    cursor: pointer;
    opacity: .8;
    padding: 0;

    &:hover { opacity: 1; }
    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px rgba(0,102,255,.25);
        border-radius: 50%;
    }
`;

export const Chip = styled.button`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    min-width: 56px;
    max-width: 140px;
    height: 36px;
    padding: 4px 12px;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid transparent;

    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background .15s, color .15s, border-color .15s;

    color: ${({ theme }) => theme.colors.gray[700]};
    background: ${({ theme }) => theme.colors.gray[200]};

    /* 선택 상태 */
    &[data-selected="true"] {
        color: #fff;
        background: ${({ theme }) => theme.colors.primary[400]};
    }
`;

export const Label = styled.span`
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;