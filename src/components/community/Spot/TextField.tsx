import { useLayoutEffect, useRef } from "react";
import type { TextFieldProps } from "../types";
import { Box, Counter, Field, Foot, Label, Message, TextArea } from "./textField.style";

const TextField = ({
    id, label, required, value, onChange, placeholder, minRows = 3, maxRows, maxLength, message, errorText, disabled,
}: TextFieldProps) => {
    const ref = useRef<HTMLTextAreaElement | null>(null);
    const metrics = useRef<{ lh: number; vt: number } | null>(null); // line-height, vertical paddings+borders 합

    // 최초 1회: line-height, padding+border를 읽어 높이 계산에 사용
    useLayoutEffect(() => {
      if (!ref.current) return;
      const s = getComputedStyle(ref.current);
      const lh = parseFloat(s.lineHeight || "20");
      const vt =
        parseFloat(s.paddingTop || "0") +
        parseFloat(s.paddingBottom || "0") +
        parseFloat(s.borderTopWidth || "0") +
        parseFloat(s.borderBottomWidth || "0");
      metrics.current = { lh, vt };
      resize();
    }, []);

    // 값이 바뀔 때마다 높이 갱신
    useLayoutEffect(() => {
      resize();
    }, [value]);

    const resize = () => {
      const el = ref.current;
      if (!el || !metrics.current) return;
      const { lh, vt } = metrics.current;
      const minH = vt + lh * minRows;
      const maxH = maxRows ? vt + lh * maxRows : Number.POSITIVE_INFINITY;

      const fudge = 2; // 마지막 줄 겹침 방지용 여유
      el.style.height = "auto";
      const contentH = el.scrollHeight + fudge;           // ← 여기만 추가
      const next = Math.min(maxH, Math.max(minH, contentH));
      el.style.height = `${next}px`;
    };

  const currentLen = value?.length ?? 0;

  return (
    <Field>
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span className="req">*</span>}
        </Label>
      )}

      <Box data-invalid={!!errorText} data-disabled={!!disabled}>
        <TextArea
          ref={ref}
          value={value}
          onChange={(e) => {
            const txt = e.target.value;
            if (typeof maxLength === "number") {
              onChange(txt.slice(0, maxLength));
            } else {
              onChange(txt);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!errorText}
          rows={minRows}
          maxLength={maxLength}
        />
        <Counter>
            {currentLen}/{maxLength}
        </Counter>
      </Box>

      <Foot>
        <Message>
          {errorText ? <span className="error">{errorText}</span> : message}
        </Message>
      </Foot>
    </Field>
  );
}

export default TextField;