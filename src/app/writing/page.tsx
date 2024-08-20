import Navigation from "@/components/navigation";

export default function Writing() {
  // if i remember correctly there should be a way for me to reuse the prev evanlin.ca, home and writing divs without rerender
  // preventing remount? is that the right term? kkjkj

  const articles = [
    {
      title: "you (probably) shouldn't deprive yourself of the process of discovery",
      href: "https://evanlin.substack.com/p/dont-deprive-yourself-of-the-process",
      date: "Aug 20th, 2024",
    },
    {
      title: "funemployment in the bay",
      href: "https://evanlin.substack.com/p/funemployment-in-the-bay",
      date: "Aug 11th, 2024",
    },
    {
      title: "souls who inspire me",
      href: "https://evanlin.substack.com/p/souls-who-inspire-me",
      date: "June 18th, 2024",
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
    <div className="flex md:h-full md:pt-12 pt-8 pb-8 md:w-full justify-center ">
      <div className="md:flex md:space-x-12 md:w-2/3 w-5/6 md:h-full ">
        <Navigation/>
        <div className="flex flex-col pt-4 gap-3.5 md:h-full px-4 md:px-0">
          <h2 className="text-xl md:text-2xl ">my yap :3</h2>

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
                <p className="text-slate-600 text-sm">{article.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
