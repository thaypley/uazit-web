#!/usr/bin/env node
/**
 * create-blog-user.mjs
 * Creates a user record in the `users` auth collection so the blog admin
 * can log in at uazit.art/admin.
 *
 * Run pb-setup.mjs first to ensure the `users` collection exists.
 *
 * Usage:
 *   node scripts/create-blog-user.mjs <PB_URL> <ADMIN_EMAIL> <ADMIN_PASS> <USER_EMAIL> <USER_PASS>
 *
 * Example:
 *   node scripts/create-blog-user.mjs https://pb.uazit.art admin@uazit.art secret me@uazit.art mypass123
 */

import PocketBase from "pocketbase";

const [, , PB_URL, ADMIN_EMAIL, ADMIN_PASS, USER_EMAIL, USER_PASS] = process.argv;

if (!PB_URL || !ADMIN_EMAIL || !ADMIN_PASS || !USER_EMAIL || !USER_PASS) {
  console.error(
    "Usage: node scripts/create-blog-user.mjs <PB_URL> <ADMIN_EMAIL> <ADMIN_PASS> <USER_EMAIL> <USER_PASS>"
  );
  process.exit(1);
}

const pb = new PocketBase(PB_URL);

async function run() {
  await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASS);
  console.log("✓ Authenticated as PB admin");

  const user = await pb.collection("users").create({
    email: USER_EMAIL,
    password: USER_PASS,
    passwordConfirm: USER_PASS,
    verified: true,
  });

  console.log(`✓ Blog admin user created: ${user.email} (id: ${user.id})`);
  console.log("  → Visit uazit.art/admin and log in with these credentials.");
}

run().catch((e) => {
  console.error("Error:", e.message ?? e);
  process.exit(1);
});
