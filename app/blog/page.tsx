import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Practical notes on technical project management, Agile delivery, requirements, QA coordination, and shipping software.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-[780px] px-6 py-20 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        Writing
      </h1>
      <p className="mt-4 text-lg text-text-secondary">
        Practical notes on project management, delivery, and the craft of
        shipping software.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-text-secondary">Posts coming soon.</p>
      ) : (
        <div className="mt-14 divide-y divide-border">
          {posts.map((post) => (
            <article key={post.slug} className="py-7 first:pt-0">
              <p className="text-xs uppercase tracking-wide text-accent-soft">
                {post.category} · {post.date}
              </p>
              <h2 className="mt-2 text-xl font-semibold leading-snug text-text">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-[15px] text-text-secondary">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-4"
              >
                Read more
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
