import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";

const articleDescription =
  "Codex (wife) took custody of the kids (dreams and whimsy) and now i am in a social club at 1:30 am confronting my thoughts under the influence of tequila.";

export const metadata: Metadata = {
  title: "Custody battle with the machine. | Evan Lin",
  description: articleDescription,
  openGraph: {
    title: "Custody battle with the machine.",
    description: articleDescription,
    type: "article",
    url: "/writing/custody-battle-with-the-machine",
    publishedTime: "2026-07-19T00:00:00-04:00",
    images: [
      {
        url: "/custody-battle-thumbnail.png",
        width: 1459,
        height: 1099,
        alt: "A preview of Evan Lin's Custody battle with the machine. essay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custody battle with the machine.",
    description: articleDescription,
    images: ["/custody-battle-thumbnail.png"],
  },
};

const articleParagraphs = [
  `I kinda don’t know what I’m doing with my life anymore. It’s kind of scary because I feel like I want to learn how to become a better programmer, but I’m not sure if this skill will actually serve me well in the future.`,
  `But I’ve been feeling this really strange anxiety recently. It’s one where I’m scared because I feel like I’ve been so caught up trying to build something that I think will last a long time, but I just want to feel like I’m gaining mastery over something. I don’t feel like I’m getting that, so I’m not really sure what to do.`,
  `I really miss thinking through problems linearly. I feel like nowadays my thoughts are just so scattered, and I’m not sure if it’s because I’m scrolling through Twitter (X) too often, if it’s the way I’m using agents, or something else. When I think back to how I used to work compared to now, I think that since I started using agents a lot more, I’ve become much worse at focusing. This kind of sucks.`,
  `My short term memory is also noticeably worse. Sometimes I’ll try to hold on to a thought and make a conscious effort to remember it, but maybe 20 seconds later, I’ll completely forget it. This is kind of off topic from thinking through problems linearly, but I miss being able to clearly focus on one thing.`,
  `I stopped listening to music on my commutes a couple months back. Not out of necessity or because I subscribe to grindslop propaganda. I just feel more at ease with less things to attend to at once. Some things that have helped quiet my brain recently are: learning guitar, playing piano, solving puzzles on stack exchange, playing [slither.io](http://slither.io) (surprisingly this one’s been the most effective), or sporadically taking walks mid-day just to pause, ponder and sort out my thoughts, one by one.`,
  `I once argued that this mode of operation is completely opposite to coordinating agentic workflows. Recently I’ve been having thoughts otherwise. Perhaps tacit knowledge is what separates the scatter-brain syndrome’d vibe coder vs the zen senior engineer.`,
  `With learning any instrument, there’s a rote technique. The sort of “wax-on, wax-off” reps through trial and error and deliberate practice. Play a song and hit a wrong note? Play again until you get that part right. Unconsciously, the repetitions mature into latent ideas, which eventually become free radicals – to be questioned, and experimented on, or paired with other schemes. There is a clear, linear feedback loop.`,
  `Identifying and designing feedback loops are becoming muddier in software engineering. Write up an idea, have an agent produce its code – and you can read and try to understand it, with the underlying caveat, “if you want to, at all.” It’s become a choice now. In the near future, heck, even now if you can define specs well enough, reading an agent’s code really is just an exercise for your own learning or enjoyment. As a junior engineer, in most cases, it’ll probably produce better code than what you could write by hand.`,
  `These days I’m trying to brainstorm what these “reps” could look like. Even if crudely, through pseudocode or some chimera’d lingual representation you have of programming in your head, it might be still worth exercising that muscle to build a unit test. The “fanning out" part to see if the unit test can survive scale can be easily handled by an agent. That’s the boring repetitive plumbing.`,
  `Seemingly, of more importance is understanding how things are structured. How components within a system talk to each other, and their purpose within the vast problem space you’ve tightly defined. I suppose this was always the eventual “goal” of coding – being able to realize ideas. Learning syntax from bespoke frameworks was the vehicle. Agents are just now a force multiplier which can circumvent this hurdle, and can fan out your ideas at scale.`,
  `I’m able to produce much more output by using agents, so I’m not sure what to do. On one hand, I really enjoy carefully combing through a problem. On the other hand, if I can coordinate a bunch of agents to help realize an objective, perhaps I can learn to love the process of coordinating them.`,
  `I feel like I’m in this weird position because I’ve internalized for the longest time the aphorism, “How you do anything is how you do everything.” As much as I’m trying to embrace using agents in my workflow and get better at using them, I can’t seem to find a way to enjoy using them. Maybe I’m just using them wrong.`,
  `The senior engineers I work with don't seem to have a problem using agents. It doesn’t seem like they have the same worries or complaints that I do. In some sense it’s comforting because it could suggest there is some measurable skill gap that I haven’t yet grasped, and I could learn to “fall in love” with this the same way I grew to love that part of programming (that involved linear thinking) years ago. It gives me a little hope.`,
  `But on the other hand it feels a bit demoralizing seeing how little people read or write code anymore. As a junior engineer it feels a little strange operating in this meta/latent-level thinking mode. These days it’s becoming increasingly more difficult to identify if what I’m feeling is impostor syndrome vs actually having a real, critical gap in my understanding, and unconsciously pretending like I don’t.`,
  `Beyond the people I interact with regularly either via reading blog posts or media like [this](https://antirez.com/news/169), [this](https://newsletter.pragmaticengineer.com/p/when-ai-writes-almost-all-code-what) or, [this](https://x.com/paulg/status/2077043707799588996) or hearing stories from mutuals, this phenomenon seems to be very real. Emerging, but real. Junior engineers feel uncertainty and worry. Senior engineers, of whom I’ve interacted with, not as much.`,
  `Maybe that’s because they built their mental models over the past decade, two or three by actually having to handwrite code, which is like the straightforward, easy answer. I haven’t handwritten production code in a very, very long time, and I haven’t been handwriting code for as much of my life as these other engineers have.`,
  `I wonder if I need to force myself to handwrite code through small windows. Perhaps that would allow me to experience a certain phase of life that these engineers have already gone through. But I’m not sure. Is this phase of my life something I need to force myself to go through?`,
  `For the case of not, there are brilliant operators without canonical research-y/engineering backgrounds, and that speaks for itself. I also think the most capable engineers will be ushered in this camp. But I’m not sure if I’m meant to pursue this stage of my life right now.`,
  `If I do, it will limit the amount of productive output I have. At what point do I have to pay the cost of this missing knowledge and technical debt? Is it already quietly compounding? Or will this problem cease to exist in one or two years, given the trajectory at which model intelligence is scaling?`,
  `But also why even bother worrying about productive output? If there's a chance that our jobs won’t be here in a couple of years, I might as well learn the way I want to. For me that means drawing out or hand-coding toy problems because that's how I like to learn, and that’s what I enjoy doing. A means of solving something through linear fashion that reduces scale while still preserving its fundamental structure.`,
  `The most common thing I hear from junior-level engineers like myself is “at least we’re all navigating through this time together.” or “I am burnt out. I am in a rut.” Maybe we'll see less developer burnout as inference becomes faster or even as agents become more intelligent.`,
  `It may reduce temptation to context-switch as often with traditional methods being intermittent steering and spawning of new agents to further constrain a goal while a current agent is solving it already. Or even to the extent of scrolling on X while waiting for an agent’s reply.`,
  `I like to remain optimistic with their upsides. They buy you back time on things like information retrieval, or on things you wouldn’t bother learning. You can learn new things as your /goal runs because they’re infinitely patient and compassionate teachers. All my worries could totally just be a skill issue.`,
  `I think there’s still a lot I can learn from the senior engineers/mentors I work with on agentic usage. I remind myself everyday that I’m very fortunate to be here, to be working at the forefront of inference with such a supportive and transparent team. To be surrounded by those who are honest with what they don’t know. Nobody is on their high horse here. We’re all just learning how to wield the English language and tame this mystical infinitely intelligent beast, with whatever creative ways we can come up with.`,
  `Instead of solely relying on my taste and an agent’s alone to solve a problem, I think I need to be more vocal on how I use agents with my peers and team. It feels a bit awkward, maybe even vulnerable sometimes to share prompts, because between the prompt and its result, a prompt shows how much was you and how much was the machine. An overly-verbose prompt may limit an agent’s creativity (getting stuck in a local minimum), but conversely a vague prompt can lead to unexpected behavior.`,
  `Inferring the criticism from either ends of the spectrum above: too much hand-holding from an agent, and you look like you couldn’t do it. Too little and you wonder whether it even counts as yours.`,
  `But who cares? I think overcoming this emotional resistance to share conversations with agents is a first step in this neo-junior engineer metamorphosis. Software engineering and research was always collaborative. Agents shouldn’t take this away. People throughout history have always been adaptable, and I believe will continue to be, and that this is probably just a strange, transient stage in our lives. I think things will be a lot better than what we try to make them out to be.`,
  `I guess with all this said lies the uncomfortable existential question: am I meant to be an engineer? To be honest I don't know. Why should the name even matter? I just want to stay creative and curious :)`,
];

type ArticleFigure = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

const articleFigures: Partial<Record<number, ArticleFigure>> = {
  1: {
    src: "/custody-battle-graph-discourse.png",
    width: 563,
    height: 543,
    alt: "A collage of posts reacting to a discussion about loops and graphs in software engineering",
    caption:
      "productivity porn galore? if you’re not writing graphs using your state mandated neuralink powered by gpt-67.41 ultra pro max, welcome to the permanent underclass.",
  },
  9: {
    src: "/custody-battle-dependency-hell.png",
    width: 723,
    height: 377,
    alt: "A rabbit falling through a spiral of software dependency installation commands",
    caption:
      "this hasn’t been been a problem for me lately. remember dependency hell?",
  },
  14: {
    src: "/custody-battle-career-pivots.png",
    width: 561,
    height: 406,
    alt: "A post predicting career pivots for early-career software engineers as coding becomes automated",
    caption:
      "not sure what to fully think of this yet. there is truth in it tho.",
  },
};

function renderParagraph(text: string) {
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <a
        key={`${match.index}-${match[2]}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex === 0) {
    return text;
  }

  parts.push(text.slice(lastIndex));
  return parts;
}

export default function CustodyBattleWithTheMachinePage() {
  return (
    <main className="attnres-shell text-stone-800 antialiased">
      <header className="px-6 pb-6 pt-2 md:pt-10">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 font-mono text-sm uppercase tracking-wide text-red-900">
            July 19th, 2026
          </p>
          <h1 className="mb-8 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-stone-900 sm:text-5xl">
            Custody battle with the machine.
          </h1>
          <p className="mb-10 font-serif text-xl italic leading-relaxed text-stone-500">
            {articleDescription}
          </p>
          <div className="border-b border-stone-200" />
        </div>
      </header>

      <article className="px-6 pb-24">
        <div className="attnres-blog-prose mx-auto max-w-2xl">
          {articleParagraphs.map((paragraph, index) => {
            const figure = articleFigures[index];

            return (
              <Fragment key={index}>
                <p>{renderParagraph(paragraph)}</p>
                {figure ? (
                  <figure className="my-10">
                    <Image
                      src={figure.src}
                      alt={figure.alt}
                      width={figure.width}
                      height={figure.height}
                      className="h-auto w-full rounded-lg border border-stone-200"
                    />
                    <figcaption className="attnres-figure-caption">
                      {figure.caption}
                    </figcaption>
                  </figure>
                ) : null}
              </Fragment>
            );
          })}
        </div>
      </article>
    </main>
  );
}
