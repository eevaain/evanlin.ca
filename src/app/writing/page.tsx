import Navigation from "@/components/navigation";

export default function Writing() {
  const favouriteArticles = [
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
      title: "you (probably) shouldn't deprive yourself of the process of discovery",
      href: "https://evanlin.substack.com/p/dont-deprive-yourself-of-the-process",
      date: "Aug 20th, 2024",
    },
    {
      title: "reflections on a year of daily paper journaling",
      href: "https://evanlin.substack.com/p/i-tried-journaling-on-paper-everyday",
      date: "Aug 28th, 2024",
    },

  ];

  const otherArticles = [
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
  ];

  return (
    <div className="flex md:h-full md:pt-12 pt-8 pb-8 md:w-full justify-center">
      <div className="md:flex md:space-x-12 md:w-2/3 w-5/6 md:h-full">
        <Navigation/>
        <div className="flex flex-col md:pt-4 pt-6 gap-2 overflow-auto px-4 md:px-0 md:pr-10">
          
          <h2 className="text-xl md:text-2xl">evan{"'"}s blog</h2>

          <div className="flex flex-col gap-4 pt-4 w-full md:h-full">
            <h3 className="text-lg md:text-xl text-gray-800 font-semibold">favourites</h3>
            {favouriteArticles.map((article, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:underline"
                >
                  {article.title}
                </a>
                <p className="text-gray-500 text-sm mt-1">{article.date}</p>
              </div>
            ))}

            <hr className="border-t border-gray-200 my-4" />

            <h3 className="text-lg md:text-xl text-gray-800 font-semibold">other writing</h3>
            {otherArticles.map((article, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm mt-2">
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg  hover:underline"
                >
                  {article.title}
                </a>
                <p className="text-gray-500 text-sm mt-1">{article.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
