import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  focusKeyword: string;
  readingTime: number;
};

export type Post = PostMeta & {
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function ensureDir(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

export function getAllSlugs(): string[] {
  return ensureDir().map((file) => file.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const mdx = path.join(POSTS_DIR, `${slug}.mdx`);
  const md = path.join(POSTS_DIR, `${slug}.md`);
  const file = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
  if (!file) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: normalizeDate(data.date),
    category: data.category ?? "General",
    tags: Array.isArray(data.tags) ? data.tags : [],
    focusKeyword: data.focusKeyword ?? "",
    readingTime: readingTime(content),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return ensureDir()
    .map((file) => getPostBySlug(file.replace(/\.mdx?$/, "")))
    .filter((p): p is Post => p !== null)
    .map(toMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function toMeta(post: Post): PostMeta {
  const { content, ...meta } = post;
  void content;
  return meta;
}

export function getLatestPosts(count = 3): PostMeta[] {
  return getAllPosts().slice(0, count);
}

export function getRelatedPosts(slug: string, count = 3): PostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const others = getAllPosts().filter((p) => p.slug !== slug);
  const scored = others.map((post) => {
    const sharedTags = post.tags.filter((t) =>
      current.tags.includes(t),
    ).length;
    const sameCategory = post.category === current.category ? 1 : 0;
    return { post, score: sharedTags * 2 + sameCategory };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.post);
}
