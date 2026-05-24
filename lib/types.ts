export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  pinned: boolean;
  active: boolean;
}

export interface Release {
  id: string;
  title: string;
  type: "album" | "ep" | "single";
  year: number;
  cover_art: string;
  bandcamp_url: string;
  spotify_url?: string;
  apple_url?: string;
  soundcloud_url?: string;
  description?: string;
  tracks?: { title: string; duration?: string }[];
  collectionId: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image?: string;
  published_at: string;
  tags?: string[];
  draft: boolean;
  collectionId: string;
}

export interface TourDate {
  id: string;
  venue: string;
  city: string;
  state_country: string;
  date: string;
  ticket_url?: string;
  notes?: string;
  sold_out: boolean;
}

export interface Video {
  id: string;
  title: string;
  youtube_id: string;
  description?: string;
  category?: string;
  featured: boolean;
  tags?: string[];
}

export interface Photo {
  id: string;
  title: string;
  image: string;
  category: "press" | "live" | "stalph" | "behind-scenes";
  alt_text?: string;
  featured: boolean;
  collectionId: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: "Booking" | "Press" | "Collaboration" | "General";
  message: string;
}
