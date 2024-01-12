import Navigation from "@/components/navigation";

export default function Writing() {
  // if i remember correctly there should be a way for me to reuse the prev evanlin.ca, home and writing divs without rerender
  // preventing remount? is that the right term?

  const articles = [
    {
      title: "Rabbitholes",
      href: "https://open.substack.com/pub/evanlin/p/november?r=a7px3&utm_campaign=post&utm_medium=web&showWelcome=true",
      date: "Janurary 9th, 2024",
    },
    {
      title: "Test Test Test",
      href: "https://open.substack.com/pub/evanlin/p/november?r=a7px3&utm_campaign=post&utm_medium=web&showWelcome=true",
      date: "Janurary 8th, 2024",
    },
    {
      title: "Test Test Test",
      href: "https://open.substack.com/pub/evanlin/p/november?r=a7px3&utm_campaign=post&utm_medium=web&showWelcome=true",
      date: "Janurary 6th, 2024",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-8 pb-8 mx-auto px-5">
      {/* or do i just make evanlin.ca, home and writing into
      a reusable component? will that prevent remounting? */}
      <h1 className="text-4xl font-bold mb-2">evanlin.ca</h1>

      <Navigation />

      <div className="flex flex-col p-10 gap-4 w-full">
        {articles.map((article, index) => (
          <div>
            <a
              key={index}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-xl"
            >
              {article.title}
            </a>
            <p className="text-slate-600">{article.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
