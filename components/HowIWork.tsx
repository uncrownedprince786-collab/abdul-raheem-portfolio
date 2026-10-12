import Reveal from "@/components/Reveal";
import { principles } from "@/app/data";

export default function HowIWork() {
  return (
    <section id="approach" className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1140px] px-6 py-20 sm:py-24">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            How I approach delivery
          </h2>
          <p className="mt-3 max-w-[620px] text-text-secondary">
            Four habits I bring to every project, regardless of size or client.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="flex gap-5">
                <span className="mt-0.5 text-sm font-semibold text-accent-soft">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-text">{p.title}</h3>
                  <p className="mt-2 max-w-[440px] text-[15px] text-text-secondary">
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
