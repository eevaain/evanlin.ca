import Link from "next/link";

export default function Writing() {
  const parseDate = (dateStr: string) => {
    const date = new Date(dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1"));
    return date;
  };

  const allArticles = [
    {
      title: "What I Learned Building Attention Residuals from Scratch",
      href: "/writing/exploring-attnres",
      date: "April 2026",
      internal: true,
    },
    {
      title: "studio ghibli relationships",
      href: "https://evanlin.substack.com/p/studio-ghibli-relationships",
      date: "June 12th, 2025",
    },
    {
      title: "chasing a moving goalpost",
      href: "https://substack.com/@evanlin/p-160315388",
      date: "March 31st, 2025",
    },
    {
      title: "souls who inspire me",
      href: "https://evanlin.substack.com/p/souls-who-inspire-me",
      date: "June 18th, 2024",
    },
    {
      title: "to the young and ambitious: there's no rush to grow up",
      href: "https://evanlin.substack.com/p/to-the-young-and-ambitious-there",
      date: "Aug 23rd, 2024",
    },
    {
      title:
        "you (probably) shouldn't deprive yourself of the process of discovery",
      href: "https://evanlin.substack.com/p/dont-deprive-yourself-of-the-process",
      date: "Aug 20th, 2024",
    },
    {
      title: "reflections on a year of daily paper journaling",
      href: "https://evanlin.substack.com/p/i-tried-journaling-on-paper-everyday",
      date: "Aug 28th, 2024",
    },
    {
      title: "funemployment in the bay",
      href: "https://evanlin.substack.com/p/funemployment-in-the-bay",
      date: "Aug 11th, 2024",
    },
    {
      title: "on creative writing",
      href: "https://evanlin.substack.com/p/creative-writing",
      date: "April 3rd, 2024",
    },
    {
      title: "rekindling childlike wonder",
      href: "https://evanlin.substack.com/p/rekindling-childlike-wonder",
      date: "March 29th, 2024",
    },
    {
      title: "rabbitholes",
      href: "https://open.substack.com/pub/evanlin/p/november?r=a7px3&utm_campaign=post&utm_medium=web&showWelcome=true",
      date: "January 9th, 2024",
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
                <Link href={article.href} className="text-md hover:underline">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
