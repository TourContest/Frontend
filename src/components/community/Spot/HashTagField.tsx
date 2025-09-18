import { useState } from "react";
import type { Validation } from "src/components/commons/Inputs/TextField/types";
import { norm, splitTokens } from "src/utils/hashtags";
import type { HashtagFieldProps } from "../types";
import { TagWrapper } from "./style";
import InputTextField from "src/components/commons/Inputs/TextField";
import ButtonsChip from "src/components/commons/Buttons/ButtonsChip";

const HashTagField = ({
    value, onChange, max = 3, maxLengthPerTag = 20
}: HashtagFieldProps) => {
    const [hashtag, setHashtag] = useState('');
    const [isComposing, setIsComposing] = useState(false);
    const [message, setMessage] = useState<string>();
    const [validation, setValidation] = useState<Validation>('normal');

    const setSafe = (next: string[]) => onChange(next.slice(0, max));

    const blockEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== 'Enter') return;

        // IME 조합 중 Enter는 텍스트 확정용이니 건드리지 않기
        // (크롬/사파리 모두 e.isComposing 또는 nativeEvent.isComposing)
        // @ts-ignore
        const composing = e.isComposing || e.nativeEvent?.isComposing || e.keyCode === 229; // 조합이 *아닌* Enter만 완전히 차단
        if (!composing) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const push = (cands: string[]) => {
        if (!cands.length) return;

        let next = [...value];
        let blocked = '';

        for (const raw of cands) {
        const t = norm(raw);
        if (!t) continue;

        if (t.length > maxLengthPerTag) { blocked = `태그는 최대 ${maxLengthPerTag}자까지 가능해요.`; continue; }
        if (next.includes(t))            { blocked = '이미 추가된 해시태그예요.'; continue; }
        if (next.length >= max)          { blocked = `최대 ${max}개까지 가능합니다.`; break; }

        next.push(t);
        }

        if (blocked) { setValidation('negative'); setMessage(blocked); }
        else { setValidation('normal'); setMessage(undefined); }

        if (next.join('|') !== value.join('|')) setSafe(next);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const v = e.target.value;

        // 한글 조합 중엔 확정 금지 (조합 종료 후에만 토큰화)
        if (isComposing) {
            setHashtag(v);
            return;
        }

        const { tokens, partial } = splitTokens(v);
        if (tokens.length) push(tokens);
        setHashtag(partial);
    };

    const remove = (t: string) => {
        setSafe(value.filter(v => v !== t));
        setValidation('normal');
        setMessage(undefined);
    };

    
    return(
        <>
            <InputTextField 
                type="text"
                value={hashtag}
                placeholder="최대 3개까지 가능해요."
                onChange={handleChange}
                onKeyDown={blockEnter}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                validation={validation}
                message={message}
                // 모바일 키보드 힌트
                inputMode="text"
                enterKeyHint="done"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="off"
            />

            {value.length > 0 && (
                <TagWrapper>
                    {value.map(tag => (
                        <ButtonsChip key={tag} label={tag} onRemove={() => remove(tag)} removable={true} />
                    ))}
                </TagWrapper>
            )}

        </>
    )

};

export default HashTagField;