import Navigation from "@/components/navigation";

export default function Writing() {
  // Function to parse dates for sorting
  const parseDate = (dateStr: string) => {
    const date = new Date(dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1"));
    return date;
  };

  const allArticles = [
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
    <div className="flex md:h-full md:pt-12 pt-8 pb-8 md:w-full justify-center">
      <div className="md:flex md:space-x-12 md:w-2/3 w-5/6 md:h-full">
        <Navigation />
        <div className="flex flex-col md:pt-4 pt-6 gap-2 overflow-auto px-4 md:px-0 md:pr-10">
          <h2 className="text-xl md:text-2xl text-red-900">evan{"'"}s blog</h2>

          <div className="flex flex-col gap-4 pt-2 w-full md:h-full">
            {allArticles.map((article, index) => (
              <div key={index} className="">
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md hover:underline"
                >
                  {article.title}
                </a>
                <p className="text-gray-500 text-sm">{article.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
