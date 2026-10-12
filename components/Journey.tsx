import Reveal from "@/components/Reveal";
import { journey } from "@/app/data";

export default function Journey() {
  return (
    <section id="journey" className="border-t border-border">
      <div className="mx-auto max-w-[1140px] px-6 py-20 sm:py-24">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              The journey so far
            </h2>
            <p className="mt-4 max-w-[420px] text-text-secondary">
              I started in QA, moved into managing delivery for dozens of
              international clients, and now lead product and quality for a
              remote team. Each step taught me something concrete about shipping
              software that actually works.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ol className="relative border-l border-border pl-8">
              {journey.map((item) => (
                <li key={item.period} className="mb-9 last:mb-0">
                  <span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent-soft" />
                  <p className="text-sm font-medium text-accent-soft">
                    {item.period}
                  </p>
                  <p className="mt-1 text-[15px] text-text">{item.title}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
