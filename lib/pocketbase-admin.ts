import PocketBase from "pocketbase";
import type { BlogPost } from "./types";

const PB_URL = process.env.NEXT_PUBLIC_PB_URL ?? "http://127.0.0.1:8090";

let _adminPb: PocketBase | null = null;

export function getAdminPB(): PocketBase {
  if (!_adminPb) _adminPb = new PocketBase(PB_URL);
  return _adminPb;
}

export async function adminLogin(email: string, password: string): Promise<boolean> {
  try {
    const pb = getAdminPB();
    await pb.collection("users").authWithPassword(email, password);
    return pb.authStore.isValid;
  } catch {
    return false;
  }
}

export function adminLogout(): void {
  getAdminPB().authStore.clear();
}

export function isAdminAuthed(): boolean {
  return getAdminPB().authStore.isValid;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const pb = getAdminPB();
    return await pb.collection("blog_posts").getFullList<BlogPost>({
      sort: "-created",
    });
  } catch {
    return [];
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    return await getAdminPB().collection("blog_posts").getOne<BlogPost>(id);
  } catch {
    return null;
  }
}

export interface BlogPostPayload {
  title: string;
  slug: string;
  content: string;
  cover_image?: File | null;
  published_at: string;
  draft: boolean;
  tags?: string[];
}

export async function createBlogPost(data: BlogPostPayload): Promise<BlogPost | null> {
  try {
    const pb = getAdminPB();
    const form = new FormData();
    form.append("title", data.title);
    form.append("slug", data.slug);
    form.append("content", data.content);
    form.append("published_at", data.published_at);
    form.append("draft", String(data.draft));
    if (data.tags?.length) form.append("tags", JSON.stringify(data.tags));
    if (data.cover_image) form.append("cover_image", data.cover_image);
    return await pb.collection("blog_posts").create<BlogPost>(form);
  } catch {
    return null;
  }
}

export async function updateBlogPost(id: string, data: Partial<BlogPostPayload>): Promise<BlogPost | null> {
  try {
    const pb = getAdminPB();
    const form = new FormData();
    if (data.title !== undefined) form.append("title", data.title);
    if (data.slug !== undefined) form.append("slug", data.slug);
    if (data.content !== undefined) form.append("content", data.content);
    if (data.published_at !== undefined) form.append("published_at", data.published_at);
    if (data.draft !== undefined) form.append("draft", String(data.draft));
    if (data.tags !== undefined) form.append("tags", JSON.stringify(data.tags));
    if (data.cover_image) form.append("cover_image", data.cover_image);
    return await pb.collection("blog_posts").update<BlogPost>(id, form);
  } catch {
    return null;
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    await getAdminPB().collection("blog_posts").delete(id);
    return true;
  } catch {
    return false;
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
