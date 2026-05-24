#!/usr/bin/env node
/**
 * pb-setup.mjs
 * Run once on the VPS to create all uazit.art PocketBase collections.
 *
 * Usage:
 *   node scripts/pb-setup.mjs <PB_URL> <ADMIN_EMAIL> <ADMIN_PASSWORD>
 *
 * Example:
 *   node scripts/pb-setup.mjs https://pb.uazit.art admin@uazit.art supersecret
 */

import PocketBase from "pocketbase";

const [, , PB_URL, EMAIL, PASSWORD] = process.argv;

if (!PB_URL || !EMAIL || !PASSWORD) {
  console.error("Usage: node scripts/pb-setup.mjs <PB_URL> <ADMIN_EMAIL> <ADMIN_PASSWORD>");
  process.exit(1);
}

const pb = new PocketBase(PB_URL);

async function run() {
  await pb.admins.authWithPassword(EMAIL, PASSWORD);
  console.log("✓ Authenticated as admin");

  const existing = await pb.collections.getFullList();
  const names = existing.map((c) => c.name);

  const collections = [
    {
      name: "announcements",
      type: "base",
      schema: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "editor" },
        { name: "date", type: "date", required: true },
        { name: "pinned", type: "bool" },
        { name: "active", type: "bool" },
      ],
    },
    {
      name: "releases",
      type: "base",
      schema: [
        { name: "title", type: "text", required: true },
        { name: "type", type: "select", required: true, options: { maxSelect: 1, values: ["album", "ep", "single"] } },
        { name: "year", type: "number", required: true },
        { name: "cover_art", type: "file", options: { maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"] } },
        { name: "bandcamp_url", type: "url" },
        { name: "spotify_url", type: "url" },
        { name: "apple_url", type: "url" },
        { name: "soundcloud_url", type: "url" },
        { name: "description", type: "editor" },
        { name: "tracks", type: "json" },
      ],
    },
    {
      name: "blog_posts",
      type: "base",
      schema: [
        { name: "title", type: "text", required: true },
        { name: "slug", type: "text", required: true },
        { name: "content", type: "editor", required: true },
        { name: "cover_image", type: "file", options: { maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"] } },
        { name: "published_at", type: "date", required: true },
        { name: "tags", type: "select", options: { maxSelect: 10, values: ["music", "stalph", "tour", "life", "art", "video", "skateboarding"] } },
        { name: "draft", type: "bool" },
      ],
      indexes: ["CREATE UNIQUE INDEX `idx_slug` ON `blog_posts` (`slug`)"],
    },
    {
      name: "tour_dates",
      type: "base",
      schema: [
        { name: "venue", type: "text", required: true },
        { name: "city", type: "text", required: true },
        { name: "state_country", type: "text", required: true },
        { name: "date", type: "date", required: true },
        { name: "ticket_url", type: "url" },
        { name: "notes", type: "text" },
        { name: "sold_out", type: "bool" },
      ],
    },
    {
      name: "videos",
      type: "base",
      schema: [
        { name: "title", type: "text", required: true },
        { name: "youtube_id", type: "text", required: true },
        { name: "description", type: "text" },
        { name: "category", type: "text" },
        { name: "featured", type: "bool" },
        { name: "tags", type: "json" },
      ],
    },
    {
      name: "photos",
      type: "base",
      schema: [
        { name: "title", type: "text", required: true },
        { name: "image", type: "file", required: true, options: { maxSelect: 1, maxSize: 20971520, mimeTypes: ["image/jpeg", "image/png", "image/webp"] } },
        { name: "category", type: "select", required: true, options: { maxSelect: 1, values: ["press", "live", "stalph", "behind-scenes"] } },
        { name: "alt_text", type: "text" },
        { name: "featured", type: "bool" },
      ],
    },
    {
      name: "contact_submissions",
      type: "base",
      schema: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "subject", type: "select", required: true, options: { maxSelect: 1, values: ["Booking", "Press", "Collaboration", "General"] } },
        { name: "message", type: "text", required: true },
      ],
    },
  ];

  for (const col of collections) {
    if (names.includes(col.name)) {
      console.log(`  → skipping ${col.name} (exists)`);
      continue;
    }
    await pb.collections.create(col);
    console.log(`  ✓ created ${col.name}`);
  }

  // Set contact_submissions to allow anyone to create (so the form works without auth)
  const contactCol = await pb.collections.getFirstListItem(`name="contact_submissions"`);
  await pb.collections.update(contactCol.id, {
    createRule: "",
    listRule: "@request.auth.id != ''",
    viewRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
  });
  console.log("  ✓ contact_submissions: create open, rest admin-only");

  // Releases, blog_posts, videos, photos — public read
  for (const colName of ["releases", "blog_posts", "videos", "photos", "announcements", "tour_dates"]) {
    const c = await pb.collections.getFirstListItem(`name="${colName}"`);
    await pb.collections.update(c.id, {
      listRule: "",
      viewRule: "",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
    });
    console.log(`  ✓ ${colName}: public read`);
  }

  console.log("\n✓ All collections ready. Visit /_/ to manage content.");
}

run().catch((e) => {
  console.error("Error:", e.message ?? e);
  process.exit(1);
});
