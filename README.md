# Abdul Raheem — Portfolio & Blog

Professional site for **Abdul Raheem — Technical Project Manager**. Clean, calm, light theme. No AI hype, no robots, just solid delivery.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**. Blog is MDX-based with a daily auto-publish pipeline.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Project structure

```
app/
  page.tsx            Home (Hero → Work → Approach → Journey → Writing → Contact)
  layout.tsx          Inter font, SEO, Person JSON-LD
  data.ts             All site content (projects, principles, journey)
  globals.css         Design tokens + base styles
  blog/               /blog and /blog/[slug] (MDX)
  sitemap.ts          XML sitemap
  robots.ts
  rss.xml/route.ts    RSS feed
  api/contact/route.ts  Contact form delivery (Resend)
components/           Section components + Reveal scroll animation
content/blog/         Posts as .mdx with SEO frontmatter
lib/posts.ts          Post loader (metadata, related posts, reading time)
scripts/              Daily post generator (topics, keywords, generate-post.mjs)
```

## Blog system

- Posts live in `content/blog/*.mdx` with frontmatter: `title`, `description`, `date`, `category`, `tags`, `focusKeyword`, `secondaryKeywords`.
- Every post has `BlogPosting` JSON-LD, Open Graph, Twitter cards, and canonical URLs.

## Daily auto-publish

The GitHub Action (`.github/workflows/daily-post.yml`) runs at **09:00 PKT (04:00 UTC)** every day and:

1. Runs `node scripts/generate-post.mjs`
2. Picks a fresh topic + focus keyword not used in the last 60 days
3. Generates a unique, SEO-ready post via your OpenAI-compatible API
4. Commits the new `.mdx` file to `content/blog`

### Required secrets

- `OPENAI_API_KEY` — GitHub repo secret (used by the workflow)
- `OPENAI_MODEL` — optional, defaults to `gpt-4o-mini`

Generate one post on demand:

```bash
OPENAI_API_KEY=... npm run generate:post
```

## Contact form

The form uses [Resend](https://resend.com). Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` to enable delivery:

```bash
cp .env.example .env.local
```

## Deploy on Vercel

Import the repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js. Set `RESEND_API_KEY` in Vercel env vars.