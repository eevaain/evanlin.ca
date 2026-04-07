export default function Reading() {
  const articles = [
    {
      title: "Sensitivity Is Strength!",
      href: "https://www.ask-polly.com/p/sensitivity-is-strength?utm_source=post-email-title&publication_id=30395&post_id=146917225&utm_campaign=email-post-title&isFreemail=true&r=yh32c&triedRedirect=true&utm_medium=email",
      author: "Ask Polly: Heather Havrilesky",
    },
    {
      title: "Lessons from Kiki: Finding Your Own Inspiration",
      href: "https://might-could.com/essays/lessons-from-kiki/#:~:text=Kiki%20teaches%20us%20that%20failure,and%20find%20our%20own%20inspiration.",
      author: "might could: Christine Nishiyama",
    },
    {
      title: "Zeroth-Principles Thinking",
      href: "https://medium.com/future-literacy/zeroth-principles-thinking-9376d0b7e7f5",
      author: "Bryan Johnson",
    },
    {
      title: "Status Limbo",
      href: "https://www.workingtheorys.com/p/status-limbo",
      author: "Working Theory: Anu Atluru",
    },
    {
      title: "Where are the builders?",
      href: "https://near.blog/where-are-the-builders/",
      author: "near.blog",
    },
    {
      title: "Watch a VC use my name to sell a con.",
      href: "https://www.jwz.org/blog/2011/11/watch-a-vc-use-my-name-to-sell-a-con/",
      author: "Jamie Zawinski",
    },
    {
      title: "Experts vs. Imitators",
      href: "https://fs.blog/experts-vs-imitators/",
      author: "fs.blog",
    },
    {
      title: "Real Life",
      href: "https://www.bitsofwonder.co/p/real-life",
      author: "Bits of Wonder: Kasra"
    }
  ];

  return (
    <div className="mx-auto max-w-3xl pt-2 md:pt-10">
      <div className="flex flex-col gap-3.5 md:pr-10">
        <h2 className="text-xl text-red-900 md:text-2xl">favourite reads</h2>

        <div className="flex w-full flex-col gap-4">
          {articles.map((article, index) => (
            <div key={index}>
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-md hover:underline"
              >
                {article.title}
              </a>
              <p className="text-sm text-slate-600">{article.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
