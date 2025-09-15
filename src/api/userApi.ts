// src/apis/userApi.ts
import api from "./instance";

export type MeDTO = {
  success: boolean;
  message?: string;
  data?: {
    userId: number;
    email: string;
    name: string;
    nickname: string;
    profile: string | null;
    language: "KOREAN" | "ENGLISH" | string;
    platform: "APP" | "WEB" | string;
    gender: "MALE" | "FEMALE" | string;
    birthYear: string | null;
    themes: string[];
    notificationEnabled: boolean;
    createdAt: string;
    hallabong: number; // 주의: 서버 키는 hallabong
    totalSteps: number;
    moodGrade: string;
  };
  errorCode?: string | null;
  failure?: boolean;
  timestamp?: string;
};

export const userApi = {
  getMe: () => api.get<MeDTO>("v1/users/session/me"),
};
