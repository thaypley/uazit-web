export interface StaticPhoto {
  id: string;
  src: string;
  alt: string;
  shoot: string;
  caption?: string;
}

const AMERICONUH_FILES = [
  "uaz_8303.jpg", "uaz_8306.jpg", "uaz_8308.jpg", "uaz_8310.jpg",
  "uaz_8313.jpg", "uaz_8314.jpg", "uaz_8319.jpg", "uaz_8321.jpg",
  "uaz_8323.jpg", "uaz_8325.jpg", "uaz_8327.jpg", "uaz_8329.jpg",
  "uaz_8352.jpg", "uaz_8354.jpg", "uaz_8355.jpg", "uaz_8365.jpg",
  "uaz_8368.jpg", "uaz_8371.jpg", "uaz_8400.jpg", "uaz_8406.jpg",
];

export const PHOTOS: StaticPhoto[] = AMERICONUH_FILES.map((file) => ({
  id: file.replace(".jpg", ""),
  src: `/photos/americonuh-shoot/${file}`,
  alt: "UaZit — AMERiconUH shoot",
  shoot: "AMERiconUH",
}));

export const PORTRAIT_HERO = "/photos/americonuh-shoot/uaz_8303.jpg";
export const HOME_BG_PHOTO = "/photos/americonuh-shoot/uaz_8327.jpg";
export const MUSIC_BG_PHOTO = "/photos/americonuh-shoot/uaz_8325.jpg";
