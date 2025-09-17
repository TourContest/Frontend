import type { SpotCreate } from "src/types/SpotTypes";
import api from "./instance";

type ApiRes<T> = {
  success: boolean;
  message: string;
  data: T;
  errorCode: string | null;
  timestamp: string;
  failure: boolean;
};

export const communityApi = {
  createSpot: async (payload: SpotCreate): Promise<ApiRes<number>> => {
    const formData = new FormData();
    const { images, ...data } = payload;
}

export type CommunityEventBannerDto = {
  id: number;
  title: string;
  location: string;
  startDate: string; // 'YYYY-MM-DD'
  endDate: string;   // 'YYYY-MM-DD'
  detailUrl: string;
  image_url: string; // 주의: 스네이크 케이스
};

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`; // 컨트롤러 요구: YYYY-MM-DD
}

export async function fetchCommunityEventBanners(date?: string) {
  const q = date ?? todayISO();
  const res = await fetch(`http://3.39.230.129:8080/api/community/events/banner?date=${encodeURIComponent(q)}`, {
    headers: { accept: "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Banner API failed: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as CommunityEventBannerDto[];
  return data;

}