import type {BannerItem} from "src/components/community/PostsList/types.ts";

export type BannerSliderProps = {
    images: string[],
    items?: BannerItem[]
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