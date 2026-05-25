export interface StaticVideo {
  id: string;
  youtube_id: string;
  title: string;
  published_at: string;
  category?: string;
  featured?: boolean;
}

export const VIDEOS: StaticVideo[] = [
  {
    id: "click-click",
    youtube_id: "R_v9jQc71G0",
    title: "click click",
    published_at: "2026-01-19",
    category: "official video",
    featured: true,
  },
  {
    id: "over-there",
    youtube_id: "zyP_9sN1SzU",
    title: "over there",
    published_at: "2025-12-12",
    category: "official video",
  },
  {
    id: "americonuh",
    youtube_id: "VHmjCS02pR8",
    title: "americonUH",
    published_at: "2025-11-28",
    category: "official video",
  },
  {
    id: "two-many-famous-people",
    youtube_id: "o-ikc-pI7Cc",
    title: "(two) many famous people",
    published_at: "2024-12-27",
    category: "official video",
  },
  {
    id: "one-plus-one-equals-three",
    youtube_id: "k1i6HdAy39c",
    title: "one + one = three",
    published_at: "2023-02-25",
    category: "official video",
  },
  {
    id: "kramer",
    youtube_id: "MJpP0uEFyjc",
    title: "kramer",
    published_at: "2022-01-29",
    category: "official video",
  },
  {
    id: "newlydeads",
    youtube_id: "5-WScp6HoLo",
    title: "newlydeads",
    published_at: "2019-12-26",
    category: "official video",
  },
];

export const FEATURED_VIDEO = VIDEOS.find((v) => v.featured) ?? VIDEOS[0];
