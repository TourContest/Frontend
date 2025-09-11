import { useMemo, useEffect } from "react";
import type { PaymentProps } from "./type";
import InputTextField from "../commons/Inputs/TextField";
import { calcHanlabong, deriveValidationMessage } from "src/features/payment/calc";

export default function AutoHanlabongField({ price, available, onPreviewChange, showMessage }: PaymentProps) {
    const preview = useMemo(() => calcHanlabong(price, available), [price, available]);
    const { validation, message } = deriveValidationMessage(preview);
    
    useEffect(() => {
        onPreviewChange?.(preview);
    }, [preview, onPreviewChange]);

    return(
        <InputTextField 
            type="text"
            value={String(preview.applied)} // 자동 계산 값
            readOnly
            validation={validation}
            message={showMessage ? message : undefined}
        />
    )
};