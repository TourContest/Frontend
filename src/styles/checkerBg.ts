import { css } from "@emotion/react";

export const checkerBg = css`
    --checker-size: 16px;        /* 타일 크기: 필요 시 오버라이드 */
    --checker-a: #f8fafc;        /* 밝은 칸 */
    --checker-b: #e5e7eb;        /* 어두운 칸 */

    background:
        conic-gradient(
        var(--checker-b) 25%,    /* 0~25% */
        var(--checker-a) 0 50%,  /* 25~50% */
        var(--checker-b) 0 75%,  /* 50~75% */
        var(--checker-a) 0       /* 75~100% */
    ) 0 0 / var(--checker-size) var(--checker-size);
`;