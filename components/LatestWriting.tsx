import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getLatestPosts } from "@/lib/posts";

export default function LatestWriting() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1140px] px-6 py-20 sm:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                Latest writing
              </h2>
              <p className="mt-3 max-w-[560px] text-text-secondary">
                Practical notes on project management, delivery, and the craft
                of shipping software.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-accent underline underline-offset-4"
            >
              View all posts
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 60}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(30,58,95,0.35)]"
              >
                <p className="text-xs uppercase tracking-wide text-accent-soft">
                  {post.category}
                </p>
                <h3 className="mt-3 text-[17px] font-semibold leading-snug text-text group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[14px] text-text-secondary">
                  {post.description}
                </p>
                <p className="mt-auto pt-4 text-xs text-text-secondary">
                  {post.date} · {post.readingTime} min read
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
