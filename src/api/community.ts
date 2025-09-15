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

}