import Reveal from "@/components/Reveal";
import { projects } from "@/app/data";

export default function SelectedWork() {
  return (
    <section id="work" className="border-t border-border">
      <div className="mx-auto max-w-[1140px] px-6 py-20 sm:py-24">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Selected work
          </h2>
          <p className="mt-3 max-w-[620px] text-text-secondary">
            A few projects where I owned delivery from unclear requirements to a
            shipped, working product.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 60}>
              <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(30,58,95,0.35)]">
                <h3 className="text-lg font-semibold text-text">
                  {project.name}
                </h3>
                <p className="mt-2 text-[15px] text-text-secondary">
                  {project.context}
                </p>

                <p className="mt-5 text-sm font-medium text-accent-soft">
                  {project.role}
                </p>
                <ul className="mt-3 space-y-2 text-[15px] text-text-secondary">
                  {project.impact.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-soft" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
