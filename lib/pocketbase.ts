import PocketBase from "pocketbase";
import type {
  Announcement,
  Release,
  BlogPost,
  TourDate,
  Video,
  Photo,
  ContactSubmission,
} from "./types";

const PB_URL = process.env.NEXT_PUBLIC_PB_URL ?? "http://127.0.0.1:8090";

let _pb: PocketBase | null = null;

export function getPB(): PocketBase {
  if (!_pb) _pb = new PocketBase(PB_URL);
  return _pb;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const pb = getPB();
    return await pb.collection("announcements").getFullList<Announcement>({
      filter: "active = true",
      sort: "-pinned,-date",
    });
  } catch {
    return [];
  }
}

export async function getReleases(type?: string): Promise<Release[]> {
  try {
    const pb = getPB();
    const filter = type ? `type = "${type}"` : "";
    return await pb.collection("releases").getFullList<Release>({
      filter,
      sort: "-year",
    });
  } catch {
    return [];
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const pb = getPB();
    return await pb.collection("blog_posts").getFullList<BlogPost>({
      filter: "draft = false",
      sort: "-published_at",
    });
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const pb = getPB();
    return await pb
      .collection("blog_posts")
      .getFirstListItem<BlogPost>(`slug = "${slug}" && draft = false`);
  } catch {
    return null;
  }
}

export async function getTourDates(): Promise<TourDate[]> {
  try {
    const pb = getPB();
    const today = new Date().toISOString().split("T")[0];
    return await pb.collection("tour_dates").getFullList<TourDate>({
      filter: `date >= "${today}"`,
      sort: "date",
    });
  } catch {
    return [];
  }
}

export async function getVideos(): Promise<Video[]> {
  try {
    const pb = getPB();
    return await pb.collection("videos").getFullList<Video>({
      sort: "-featured,created",
    });
  } catch {
    return [];
  }
}

export async function getPhotos(category?: string): Promise<Photo[]> {
  try {
    const pb = getPB();
    const filter = category ? `category = "${category}"` : "";
    return await pb.collection("photos").getFullList<Photo>({
      filter,
      sort: "-featured,created",
    });
  } catch {
    return [];
  }
}

export function getFileUrl(record: { id: string; collectionId: string }, filename: string): string {
  return `${PB_URL}/api/files/${record.collectionId}/${record.id}/${filename}`;
}

export async function submitContact(data: ContactSubmission): Promise<boolean> {
  try {
    const pb = getPB();
    await pb.collection("contact_submissions").create(data);
    return true;
  } catch {
    return false;
  }
}
