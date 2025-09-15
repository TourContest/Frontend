import styled from '@emotion/styled';
import { theme } from 'src/styles/theme';

export const CommentCountBar = styled.div`
    padding: 16px;
    border-top: 1px solid ${theme.colors.gray[200]};
    border-bottom: 1px solid ${theme.colors.gray[200]};
    color: ${theme.colors.gray[700]};
    font-weight: 500;
`;

export const CommentItemWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 20px;
`;

export const CommentContent = styled.div`
    font-size: 14px;
    color: ${theme.colors.gray[700]};
    line-height: 1.4;
`;

export const NicknameBox = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

export const EmptyCommentBox = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    text-align: center;
    color: ${theme.colors.gray[400]};
    line-height: 1.4;
    height: 292px;
`;

export const CommentInputWrapper = styled.div`
    position: fixed;
    left: 0; right: 0; bottom: 0;
    padding: 10px 20px;
    z-index: 100;
    background: #fff;
`;

export const CommentInputForm = styled.form`
    display: flex;
    gap: 10px;
`;

export const CommentInputTrigger = styled.input`
    flex: 1;
    padding: 13px 16px;
    border-radius: 12px;
    background: ${theme.colors.gray[100]};
    border: none;
    outline: none;
    font-size: 16px;
`;

export const CommentSubmit = styled.button`
    width: 48px; height: 48px;
    border-radius: 12px;
    background: ${theme.colors.gray[400]};

    &[data-active='true'] {
        background: ${theme.colors.primary[400]};
    }
`;