export type ReleaseType = "album" | "ep" | "single";

export interface StaticRelease {
  id: string;
  slug: string;
  title: string;
  type: ReleaseType;
  year: number;
  release_date: string;
  bandcamp_url: string;
  bandcamp_embed_id: string;
  bandcamp_embed_type: "album" | "track";
  cover_url: string;
  spotify_url?: string;
  apple_url?: string;
  soundcloud_url?: string;
}

const bc = (slug: string) => `https://uazit.bandcamp.com/${slug}`;
const art = (artId: string) => `https://f4.bcbits.com/img/a${artId}_10.jpg`;

export const RELEASES: StaticRelease[] = [
  {
    id: "iuniores",
    slug: "album/iunio-re-s",
    title: "iuniōrēs",
    type: "album",
    year: 2017,
    release_date: "2017-04-16",
    bandcamp_url: bc("album/iunio-re-s"),
    bandcamp_embed_id: "1698542176",
    bandcamp_embed_type: "album",
    cover_url: art("2672082384"),
  },
  {
    id: "v",
    slug: "album/v",
    title: "V",
    type: "album",
    year: 2017,
    release_date: "2017-12-27",
    bandcamp_url: bc("album/v"),
    bandcamp_embed_id: "685268020",
    bandcamp_embed_type: "album",
    cover_url: art("1197120479"),
  },
  {
    id: "period-feat-wazeil",
    slug: "track/period-feat-wazeil",
    title: "Period (feat. WaZeil)",
    type: "single",
    year: 2018,
    release_date: "2018-04-16",
    bandcamp_url: bc("track/period-feat-wazeil"),
    bandcamp_embed_id: "4083905747",
    bandcamp_embed_type: "track",
    cover_url: art("2081092014"),
  },
  {
    id: "tom-petty",
    slug: "track/the-day-tom-petty-died",
    title: "The Day Tom Petty Died",
    type: "single",
    year: 2018,
    release_date: "2018-04-23",
    bandcamp_url: bc("track/the-day-tom-petty-died"),
    bandcamp_embed_id: "179907812",
    bandcamp_embed_type: "track",
    cover_url: art("3053655858"),
  },
  {
    id: "pink-lady",
    slug: "album/pink-lady",
    title: "Pink Lady",
    type: "album",
    year: 2018,
    release_date: "2018-08-22",
    bandcamp_url: bc("album/pink-lady"),
    bandcamp_embed_id: "1605690309",
    bandcamp_embed_type: "album",
    cover_url: art("1610981599"),
  },
  {
    id: "moneyhoon",
    slug: "album/moneyhoon",
    title: "MOneyhoon",
    type: "ep",
    year: 2019,
    release_date: "2019-03-19",
    bandcamp_url: bc("album/moneyhoon"),
    bandcamp_embed_id: "4039840114",
    bandcamp_embed_type: "album",
    cover_url: art("3456330850"),
  },
  {
    id: "moneyhooned",
    slug: "album/moneyhooned",
    title: "MOneyhoonED",
    type: "ep",
    year: 2019,
    release_date: "2019-07-11",
    bandcamp_url: bc("album/moneyhooned"),
    bandcamp_embed_id: "1907007134",
    bandcamp_embed_type: "album",
    cover_url: art("400168350"),
  },
  {
    id: "ethically-sourced-orgasm",
    slug: "track/ethically-sourced-orgasm",
    title: "Ethically Sourced Orgasm",
    type: "single",
    year: 2021,
    release_date: "2021-01-09",
    bandcamp_url: bc("track/ethically-sourced-orgasm"),
    bandcamp_embed_id: "339244348",
    bandcamp_embed_type: "track",
    cover_url: art("909883394"),
  },
  {
    id: "yeehawasaki",
    slug: "album/yeehawasaki",
    title: "Yeehawasaki",
    type: "album",
    year: 2021,
    release_date: "2021-06-06",
    bandcamp_url: bc("album/yeehawasaki"),
    bandcamp_embed_id: "2031489380",
    bandcamp_embed_type: "album",
    cover_url: art("3271731120"),
  },
  {
    id: "grow-food-not-mouths",
    slug: "album/grow-food-not-mouths",
    title: "GROW FOOD; NOT MOUTHS.",
    type: "album",
    year: 2022,
    release_date: "2022-02-22",
    bandcamp_url: bc("album/grow-food-not-mouths"),
    bandcamp_embed_id: "560115683",
    bandcamp_embed_type: "album",
    cover_url: art("1127409175"),
  },
  {
    id: "depressed-at-the-beach",
    slug: "album/de-pressed-at-the-beach",
    title: "(de)pressed (at the) beach",
    type: "album",
    year: 2024,
    release_date: "2024-08-29",
    bandcamp_url: bc("album/de-pressed-at-the-beach"),
    bandcamp_embed_id: "2595002951",
    bandcamp_embed_type: "album",
    cover_url: art("3678775624"),
  },
  {
    id: "si-mamma-paparazzi",
    slug: "track/si-mamma-paparazzi",
    title: "si mamma, paparazzi",
    type: "single",
    year: 2025,
    release_date: "2025-09-11",
    bandcamp_url: bc("track/si-mamma-paparazzi"),
    bandcamp_embed_id: "909761477",
    bandcamp_embed_type: "track",
    cover_url: art("2491166011"),
  },
  {
    id: "americonuh",
    slug: "album/americonuh",
    title: "AMERiconUH",
    type: "album",
    year: 2025,
    release_date: "2025-11-27",
    bandcamp_url: bc("album/americonuh"),
    bandcamp_embed_id: "1468455484",
    bandcamp_embed_type: "album",
    cover_url: "/album-art/americonuh.jpg",
  },
  {
    id: "doc-whats-up",
    slug: "album/doc-whats-up",
    title: "DOC, what's up?",
    type: "album",
    year: 2026,
    release_date: "2026-01-19",
    bandcamp_url: bc("album/doc-whats-up"),
    bandcamp_embed_id: "1235539275",
    bandcamp_embed_type: "album",
    cover_url: "/album-art/doc-whats-up.jpg",
  },
];

export const RELEASES_NEWEST_FIRST = [...RELEASES].reverse();

export const FEATURED_RELEASE = RELEASES[RELEASES.length - 1];
