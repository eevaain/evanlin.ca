"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="home-scroll-shell mx-auto max-w-3xl pt-2 md:max-h-[calc(100dvh-6rem)] md:overflow-y-auto md:pr-2 md:pt-8">
      <div className="flex flex-col gap-2 md:pr-10">
        <h2 className="pb-2 text-xl tracking-tight text-red-900 md:text-2xl">
          about me
        </h2>
        <p>Hi! I{"'"}m Evan.</p>
        <p>
          I{"'"}m fascinated by the fundamental building blocks of our world
          and how they make up the black boxes in our everyday lives.
        </p>
        <p>
          Even more so, I feel inclined to{" "}
          <button
            type="button"
            className="shiny-open"
            aria-expanded={isOpen}
            aria-controls="rest-of-about-me"
            aria-label={
              isOpen
                ? "Close the rest of Evan's about page"
                : "Open the rest of Evan's about page"
            }
            onClick={() => setIsOpen((open) => !open)}
          >
            open
          </button>{" "}
          them.
        </p>

        {isOpen && (
          <div
            id="rest-of-about-me"
            className="home-reveal flex flex-col gap-2"
          >
            <p>
              I also love telling stories! Especially making people excited
              about things they didn{"'"}t know they could feel excited about.
            </p>

            <p>
              Nowadays, I try to share the things I do through{" "}
              <a
                href="https://twitter.com/evanliin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-800"
              >
                Twitter,
              </a>{" "}
              or more recently my{" "}
              <Link href="/writing" prefetch={false} className="text-red-800">
                writing
              </Link>
              .
            </p>

            <p className="pt-8">
              But when I{"'"}m not doing either of the two, I am...
            </p>
            <ul className="list-inside list-disc space-y-0.75 text-base">
              <li>Working on inference @ NVIDIA</li>
              <li>
                Studying ECE in my third year at the University of Western
                Ontario and skipping many classes
              </li>
              <li>
                Getting back into piano and started learning a bit of guitar
              </li>
              <li>Watching anime</li>
              <li>And singing!</li>
            </ul>

            <p>More recently, I{"'"}ve become increasingly curious about...</p>
            <ul className="list-inside list-disc space-y-0.75 text-base">
              <li>
                The future of computing, human-computer interfaces, and
                information processing
              </li>
              <li>
                Non-dualistic principles and the fundamental nature of
                consciousness
              </li>
              <li>
                And developmental psychology, particularly in early human
                development
              </li>
            </ul>

            <p className="pt-2">
              Contact me at{" "}
              <span className="text-red-900">evanlin416@gmail.com</span>
            </p>

            <p className="pt-6">Previously, I...</p>
            <ul className="list-inside list-disc space-y-0.75 text-base">
              <li>Worked on distributed systems @ Groq</li>
              <li>
                Was an undergraduate Research Assistant @ University of
                Waterloo (WATCAG)
              </li>
              <li>Took a gap year in 2022-2023 to FAFO</li>
              <li>Built search engines for startups @ Aviato</li>
              <li>Co-founded a data analytics platform for crypto wallets</li>
            </ul>

            <p className="pt-8">
              Websites just don{"'"}t capture the full depth of who we are.
            </p>
            <p>This one is still a work in progress...</p>
            <p>
              But in the meantime, maybe we should talk! :{")"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
