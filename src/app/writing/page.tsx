import Link from "next/link";

export default function Writing() {
  const parseDate = (dateStr: string) => {
    const date = new Date(dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1"));
    return date;
  };

  const allArticles = [
    {
      title: "stage fright",
      href: "https://evanlin.substack.com/p/stage-fright",
      date: "November 14th, 2026",
      excerpt: "originally an entry in my journal: i actually kinda had fun yesterday. it was super ad-hoc, but i’m ",
    },
    {
      title: "custody battle with the machine",
      href: "/writing/custody-battle-with-the-machine",
      date: "July 19th, 2026",
      internal: true,
      excerpt: "I kinda don’t know what I’m doing with my life anymore. It’s kind of scary because I feel like I want to learn how to become a better programmer, but I’m not sure if this skill will actually serve me well in the future.",
    },
    {
      title: "what i learned building attention residuals from scratch",
      href: "/writing/exploring-attnres",
      date: "April 2026",
      internal: true,
      excerpt: "I wanted to understand how transformers actually route information between layers. Not at the level of “attention computes weighted averages,” but at the level of what physically happens to a tensor as it moves through the network.",
    },
    {
      title: "tinytpu.com",
      href: "https://tinytpu.com",
      date: "Aug 17th, 2025",
      excerpt: "Nobody really understands how TPUs work…and neither do we! So we wanted to make this because we wanted to take a shot and try to guess how it works–from the perspective of complete novices!",
    },
    {
      title: "studio ghibli relationships",
      href: "https://evanlin.substack.com/p/studio-ghibli-relationships",
      date: "June 12th, 2025",
      excerpt: "Many people who I used to spend time with by watching movies, late night calls, or even just chillin",
    },
    {
      title: "chasing a moving goalpost",
      href: "https://substack.com/@evanlin/p-160315388",
      date: "March 31st, 2025",
      excerpt: "(roommates and i on our way to write a final) I didn’t end up taking another gap year like I wanted. I thugged it out for another semester, and having finished it, now awaits the impending doom",
    },
    {
      title: "souls who inspire me",
      href: "https://evanlin.substack.com/p/souls-who-inspire-me",
      date: "June 18th, 2024",
      excerpt: "People who accept that there are diverse routes through life. They define themselves not by the acco",
    },
    {
      title: "to the young and ambitious: there's no rush to grow up",
      href: "https://evanlin.substack.com/p/to-the-young-and-ambitious-there",
      date: "Aug 23rd, 2024",
      excerpt: "i used to be heavily involved in many discord and slack communities themed around self-starters and ",
    },
    {
      title:
        "you (probably) shouldn't deprive yourself of the process of discovery",
      href: "https://evanlin.substack.com/p/dont-deprive-yourself-of-the-process",
      date: "Aug 20th, 2024",
      excerpt: "more often than not on my twitter tl, i come across profiles who post daily ml updates. it's clearly",
    },
    {
      title: "reflections on a year of daily paper journaling",
      href: "https://evanlin.substack.com/p/i-tried-journaling-on-paper-everyday",
      date: "Aug 28th, 2024",
      excerpt: "i started this notebook on 11/25/23. now i have three pages left as of 08/28/24! a little over a yea",
    },
    {
      title: "funemployment in the bay",
      href: "https://evanlin.substack.com/p/funemployment-in-the-bay",
      date: "Aug 11th, 2024",
      excerpt: "june 8th 2024. i left toronto for san francisco. since then i've learned alot on how to take care of",
    },
    {
      title: "on creative writing",
      href: "https://evanlin.substack.com/p/creative-writing",
      date: "April 3rd, 2024",
      excerpt: "I’m trying to get back into creative writing. I feel like I have so many thoughts and ideas which li",
    },
    {
      title: "rekindling childlike wonder",
      href: "https://evanlin.substack.com/p/rekindling-childlike-wonder",
      date: "March 29th, 2024",
      excerpt: "I toiled away at school during my first semester. The notorious tales my friends would tell me about",
    },
    {
      title: "rabbitholes",
      href: "https://open.substack.com/pub/evanlin/p/november?r=a7px3&utm_campaign=post&utm_medium=web&showWelcome=true",
      date: "January 9th, 2024",
      excerpt: "School should feel like learning, and not like an attempt to try and beat a system. I don't really f",
    },
  ].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

  return (
    <div className="mx-auto max-w-3xl pt-2 md:pt-10">
      <div className="flex flex-col gap-2 md:pr-10">
        <h2 className="text-xl text-red-900 md:text-2xl">evan{"'"}s blog</h2>

        <div className="flex w-full flex-col gap-4 pt-2">
          {allArticles.map((article, index) => (
            <div key={index}>
              {article.internal ? (
                <Link
                  href={article.href}
                  prefetch={false}
                  className="text-md hover:underline"
                >
                  {article.title}
                </Link>
              ) : (
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md hover:underline"
                >
                  {article.title}
                </a>
              )}
              <p className="text-sm text-gray-500">{article.date}</p>
              <p className="mt-1 text-sm text-gray-600">
                {Array.from(article.excerpt).slice(0, 100).join("").trimEnd()}…
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
