export type BannerSliderProps = {
  images: string[]; // 부모에서 내려주는 이미지 배열
};

export interface Post {
  id: number;
  username: string;
  date: string;
  location: string;
  content: string;
  images: string[];
  hasReport: boolean;
  likes?: number;
  comments?: number;
}