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

    console.log("payload.images:", images); 

    // formData.append('data', JSON.stringify(data));
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/JSON' }));

    images.forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });

    const res = await api.post<ApiRes<number>>('/api/spots', formData);

    return res.data;
  }
}