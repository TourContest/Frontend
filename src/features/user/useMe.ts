import { useEffect, useState, useCallback } from "react";
import { userApi, type MeDTO } from "../../api/userApi";
import avatarFallback from "src/assets/BlackPig.svg?url";

export type Me = {
  id: string;
  name: string;
  nickname: string;
  avatarUrl: string;
  hallabong: number;
  totalSteps: number;
  moodGrade: string; // 원본 코드
  gradeName: string; // 등급 한글 이름
};

// 서버 코드 → 한글 등급명
const gradeNameOf = (code?: string) => {
  switch (code) {
    case "BALBADAK":
      return "발바닥";
    // TODO: 추가 코드 케이스들 정의
    default:
      return "발바닥";
  }
};

const mapMe = (dto?: MeDTO["data"]): Me | null => {
  if (!dto) return null;
  return {
    id: String(dto.userId),
    name: dto.name ?? "",
    nickname: dto.nickname ?? "",
    avatarUrl: dto.profile || avatarFallback,
    hallabong: dto.hallabong ?? 0,
    totalSteps: dto.totalSteps ?? 0,
    moodGrade: dto.moodGrade ?? "",
    gradeName: gradeNameOf(dto.moodGrade),
  };
};

export function useMe() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userApi.getMe();
      const next = mapMe(res.data?.data);
      if (!next) throw new Error("프로필 정보를 불러올 수 없어요.");
      setMe(next);
    } catch (e: any) {
      setError(e?.message ?? "프로필 로드 실패");
    } finally {
      setLoading(false);
    }
  }, []);

  // 마운트 시 호출
  useEffect(() => {
    refetch();
  }, [refetch]);

  // 출석 수령/프로필 변경 등 외부에서 갱신 트리거
  useEffect(() => {
    const h = () => refetch();
    window.addEventListener("me:refresh", h);
    return () => window.removeEventListener("me:refresh", h);
  }, [refetch]);

  return { me, loading, error, refetch };
}
