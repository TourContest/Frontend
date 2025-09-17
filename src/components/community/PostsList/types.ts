export type BannerItem = {
    image: string;    // 이미지 URL (API: image_url)
    href?: string;    // 클릭 시 이동할 링크 (API: detailUrl)
    title?: string;   // 접근성/alt 용도 (API: title)
};

export type BannerSliderProps =
    | { images: string[]; items?: never }   // 기존 사용: 이미지 배열만
    | { images?: never; items: BannerItem[] }; // 신규 사용: 클릭 가능한 항목