"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { site } from "@/app/data";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Message could not be sent.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1140px] px-6 py-20 sm:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              Let&rsquo;s talk
            </h2>
            <p className="mt-4 max-w-[440px] text-lg text-text-secondary">
              Looking for someone who can own delivery end-to-end? Let&rsquo;s
              talk.
            </p>

            <div className="mt-8 space-y-3 text-[15px]">
              <p>
                <span className="text-text-secondary">Email&nbsp;&nbsp;</span>
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent underline underline-offset-4"
                >
                  {site.email}
                </a>
              </p>
              <p>
                <span className="text-text-secondary">LinkedIn&nbsp;&nbsp;</span>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4"
                >
                  {site.linkedinLabel}
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-text-secondary">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-[15px] text-text outline-none transition-colors focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm text-text-secondary">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-[15px] text-text outline-none transition-colors focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm text-text-secondary">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-y rounded-lg border border-border bg-bg px-4 py-2.5 text-[15px] text-text outline-none transition-colors focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-soft disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              {status === "sent" && (
                <p className="text-sm text-accent-soft">
                  Thanks — your message has been sent.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-700">
                  {error} You can also email me directly at {site.email}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
