import Link from "next/link";
import { site } from "@/app/data";

async function getYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-4 px-6 py-10 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {site.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-accent"
          >
            {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <Link href="/blog" className="transition-colors hover:text-accent">
            Writing
          </Link>
        </div>
      </div>
    </footer>
  );
}
