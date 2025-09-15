import { useMemo } from "react";
import type { HanlabongPreview } from "src/components/inapp/type";

export const calcHanlabong = (price: number, available: number): HanlabongPreview => {
    const applied = Math.max(0, Math.min(price || 0, available || 0));
    const shortage = Math.max((price || 0) - (available || 0), 0);
    const cashToPay = Math.max(0, Math.min(price || 0) - applied, 0);
    return { applied, shortage, cashToPay };
};

export const deriveValidationMessage = (
    p: HanlabongPreview
): { validation: 'normal' | 'positive' | 'negative'; message?: string } => {
    return p.shortage > 0
    ? { validation: 'negative', message: `보유한라봉이 ${p.shortage}개 부족해요`}
    : { validation: 'normal'}
};