import Link from "next/link";
import { site } from "@/app/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, #dfe6ee 0%, #eef1f5 60%, transparent 100%)",
        }}
      />
      <div className="mx-auto max-w-[1140px] px-6 pb-20 pt-24 sm:pt-32">
        <div className="max-w-[760px]">
          <p className="mb-5 text-sm font-medium tracking-wide text-accent-soft">
            {site.role}
          </p>
          <h1 className="text-[2.1rem] font-semibold leading-[1.15] tracking-tight text-text sm:text-[2.9rem]">
            I help teams deliver software without the usual chaos.
          </h1>
          <p className="mt-6 max-w-[640px] text-lg text-text-secondary">
            {site.tagline}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-soft"
            >
              View Selected Work
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
