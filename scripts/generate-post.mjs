import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "blog");
const TOPICS = JSON.parse(
  fs.readFileSync(path.join(__dirname, "topics.json"), "utf8"),
).topics;
const KEYWORDS = JSON.parse(
  fs.readFileSync(path.join(__dirname, "keywords.json"), "utf8"),
).keywords;

const API_KEY = process.env.OPENAI_API_KEY;
const BASE_URL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const LOOKBACK_DAYS = Number(process.env.DUPLICATE_LOOKBACK_DAYS || 60);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 70);
}

function readExisting() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx?$/, ""),
        title: String(data.title || ""),
        focusKeyword: String(data.focusKeyword || ""),
        category: String(data.category || ""),
        tags: Array.isArray(data.tags) ? data.tags : [],
        date: String(data.date || ""),
      };
    });
}

function daysAgo(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return Infinity;
  return (Date.now() - d.getTime()) / 86_400_000;
}

function recentlyUsed(values, existing, field) {
  const set = new Set();
  for (const post of existing) {
    if (daysAgo(post.date) <= LOOKBACK_DAYS) {
      set.add(String(post[field] || "").toLowerCase());
    }
  }
  return values.filter((v) => set.has(String(v).toLowerCase()));
}

function pickKeyword(existing) {
  const used = new Set(
    existing
      .filter((p) => daysAgo(p.date) <= 30)
      .map((p) => p.focusKeyword.toLowerCase()),
  );
  const available = KEYWORDS.filter((k) => !used.has(k.toLowerCase()));
  if (available.length === 0) {
    throw new Error("No unused focus keywords left. Add more to keywords.json.");
  }
  return available[Math.floor(Math.random() * available.length)];
}

function pickTopic(existing) {
  const usedRecently = new Set(
    existing
      .filter((p) => daysAgo(p.date) <= 3)
      .map((p) => p.category.toLowerCase()),
  );
  const available = TOPICS.filter((t) => !usedRecently.has(t.toLowerCase()));
  const pool = available.length > 0 ? available : TOPICS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildPrompt({ topic, keyword, existing }) {
  const recent = existing
    .slice(0, 40)
    .map((p) => `- ${p.title} (keyword: ${p.focusKeyword})`)
    .join("\n");

  return `You are writing a blog post for the personal site of Abdul Raheem, an experienced Technical Project Manager (7+ years), currently Product Manager & QA Lead.

TONE RULES (strict):
- Write like a calm, experienced professional. Practical and specific.
- Short paragraphs. Use "I" when referring to real experience.
- NEVER use these words: leverage, synergy, cutting-edge, disrupt, game-changer, next-gen.
- Do not sound salesy or like a LinkedIn guru. No hype. Keep AI mentions practical and minimal.
- Length: 700-1200 words.

SEO RULES:
- Primary focus keyword: "${keyword}"
- The focus keyword MUST appear in the title and within the first 100 words.
- Use it naturally in some H2/H3 headings. Do NOT keyword-stuff.
- Include 2-3 related secondary keywords naturally.

TOPIC CATEGORY: ${topic}

ANTI-DUPLICATE:
- The post must have a unique angle and title.
- Do NOT reuse any of these recent titles or focus keywords:
${recent || "- (none yet)"}

STRUCTURE:
- H1 title (with focus keyword)
- Short introduction (problem or context)
- 3-6 H2 sections with practical points
- Short conclusion or key takeaway
- A brief checklist or summary box is welcome.

Return ONLY valid JSON with this exact shape:
{
  "title": "string (50-65 chars, includes focus keyword)",
  "slug": "kebab-case-slug",
  "description": "meta description, 140-160 chars",
  "focusKeyword": "${keyword}",
  "secondaryKeywords": ["string", "string", "string"],
  "category": "${topic}",
  "tags": ["string", "string", "string"],
  "body": "full markdown body starting with a level-2 heading (## ...), NOT repeating the H1"
}`;
}

async function callModel(prompt) {
  if (!API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not set. Configure it to enable automated publishing.",
    );
  }

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.8,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You write practical, calm, SEO-aware blog posts for a senior technical project manager. Always respond with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Model request failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Model returned no content.");
  return JSON.parse(text);
}

function validate(article, existing) {
  const words = String(article.body || "").split(/\s+/).filter(Boolean).length;
  if (words < 500) throw new Error(`Body too short (${words} words).`);

  const title = String(article.title || "").toLowerCase();
  const keyword = String(article.focusKeyword || "").toLowerCase();

  if (title.length < 20) throw new Error("Title too short.");

  const dupTitle = existing.some((p) => p.title.toLowerCase() === title);
  if (dupTitle) throw new Error(`Duplicate title: ${article.title}`);

  const dupKeyword = recentlyUsed(
    [article.focusKeyword],
    existing,
    "focusKeyword",
  );
  if (dupKeyword.length > 0) {
    throw new Error(`Focus keyword used within ${LOOKBACK_DAYS} days: ${keyword}`);
  }

  const dupSlug = existing.some((p) => p.slug === article.slug);
  if (dupSlug) throw new Error(`Duplicate slug: ${article.slug}`);
}

function writePost(article) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });

  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(article.slug || article.title);
  const file = path.join(POSTS_DIR, `${date}-${slug}.mdx`);

  const frontmatter = {
    title: article.title,
    description: article.description,
    date,
    category: article.category,
    tags: article.tags || [],
    focusKeyword: article.focusKeyword,
    secondaryKeywords: article.secondaryKeywords || [],
  };

  const fileContents = matter.stringify(`\n${article.body.trim()}\n`, frontmatter);
  fs.writeFileSync(file, fileContents, "utf8");
  return file;
}

async function main() {
  const existing = readExisting();
  const topic = pickTopic(existing);
  const keyword = pickKeyword(existing);

  console.log(`Topic: ${topic}`);
  console.log(`Focus keyword: ${keyword}`);
  console.log(`Existing posts: ${existing.length}`);

  const prompt = buildPrompt({ topic, keyword, existing });

  let article;
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      article = await callModel(prompt);
      article.slug = article.slug || slugify(article.title);
      validate(article, existing);
      break;
    } catch (err) {
      lastError = err;
      console.warn(`Attempt ${attempt} failed: ${err.message}`);
    }
  }

  if (!article) {
    throw lastError || new Error("Failed to generate a valid post.");
  }

  const file = writePost(article);
  console.log(`Published: ${article.title}`);
  console.log(`File: ${path.relative(ROOT, file)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
