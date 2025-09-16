import { z } from 'zod';
import type { SpotFormState } from 'src/types/SpotTypes';

export const spotFormSchema = z.object({
  locationText: z.string().trim().min(1, '위치를 입력해주세요.'),
  description:  z.string().trim().min(1, '내용을 입력해주세요.'),
});

export type SpotFieldErrors = Partial<Record<'locationText' | 'description', string>>;

export function getSpotErrors(input: Pick<SpotFormState, 'locationText' | 'description'>): SpotFieldErrors {
  const r = spotFormSchema.safeParse(input);
  if (r.success) return {};
  const errs: SpotFieldErrors = {};
  for (const i of r.error.issues) {
    const k = i.path[0] as keyof SpotFieldErrors;
    if (!errs[k]) errs[k] = i.message;
  }
  return errs;
}

// 토스트용 한 줄 메시지
export function buildSpotErrorMessage(errs: SpotFieldErrors) {
  if (errs.locationText && errs.description) return '위치와 내용을 입력해주세요.';
  return errs.locationText ?? errs.description ?? '필수 값을 확인해주세요.';
};