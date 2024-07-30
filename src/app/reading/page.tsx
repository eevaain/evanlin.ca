import Navigation from "@/components/navigation";

export default function Writing() {
  // if i remember correctly there should be a way for me to reuse the prev evanlin.ca, home and writing divs without rerender
  // preventing remount? is that the right term? kkjkj

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
    <div className="flex md:h-full md:pt-12 pt-8 pb-8 md:w-full justify-center ">
      <div className="md:flex md:space-x-12 md:w-2/3 w-5/6 md:h-full ">
        <Navigation />
        <div className="flex flex-col pt-4 gap-3.5 md:h-full px-4 md:px-0">
          <h2 className="text-xl md:text-2xl ">:)</h2>

          <div className="flex flex-col gap-4 w-full md:h-full">
            {articles.map((article, index) => (
              <div key={index}>
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline "
                >
                  {article.title}
                </a>
                <p className="text-slate-600 text-sm">{article.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
