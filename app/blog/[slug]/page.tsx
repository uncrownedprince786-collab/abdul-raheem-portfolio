import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getRelatedPosts, getAllSlugs } from "@/lib/posts";
import { site } from "@/app/data";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${site.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <article className="mx-auto max-w-[760px] px-6 py-20 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Link
        href="/blog"
        className="text-sm text-text-secondary transition-colors hover:text-accent"
      >
        &larr; All posts
      </Link>

      <p className="mt-8 text-xs uppercase tracking-wide text-accent-soft">
        {post.category} · {post.date} · {post.readingTime} min read
      </p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-text sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-text-secondary">{post.description}</p>

      <div className="prose-portfolio mt-12">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-border pt-10">
          <h2 className="text-lg font-semibold text-text">Related posts</h2>
          <div className="mt-6 space-y-4">
            {related.map((r) => (
              <div key={r.slug}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="text-[15px] font-medium text-accent underline underline-offset-4"
                >
                  {r.title}
                </Link>
                <p className="mt-1 text-sm text-text-secondary">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
