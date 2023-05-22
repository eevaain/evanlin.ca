import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-8 pb-8 mx-auto px-5">
      <h1 className="text-4xl font-bold mb-4">Evan Lin</h1>
      <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <img src="me.jpg" alt="Evan Lin" className="w-full" />
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold mb-2">Currently</h2>
          <p className="text-gray-700 text-base">
            On a gap year seeking new experiences, travelling to new places &
            building a search engine for startups at{" "}
            <a
              href="https://www.joinaviato.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Aviato.
            </a>
          </p>
        </div>

        <div className="bg-gray-200 px-6 py-4 flex flex-wrap gap-2">
          <a
            href="https://curius.app/evan-lin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2 md:mb-0"
          >
            Readings
          </a>
          <a
            href="https://twitter.com/evannlinn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2 md:mb-0"
          >
            Twitter
          </a>
          <a
            href="https://github.com/eevaain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2 md:mb-0"
          >
            Github
          </a>
          <a
            href="https://www.youtube.com/channel/UCn9Ir-KFtIWSntk6RzGE1-A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2 md:mb-0"
          >
            Youtube
          </a>
        </div>
      </div>

      <div className="mt-8 flex flex-col space-y-4">
        <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold mb-2">Previously </h2>
            <ul className="list-disc list-inside text-gray-700 text-base">
              <li>
                World Finalist in{" "}
                <a
                  href="https://imaginecup.microsoft.com/en-us/Team/550518d7-d2a6-4e64-96e5-a82bba7fe27c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Microsoft's Imagine Cup
                </a>
              </li>
              <li>NLU intern @ Vocinity</li>
              <li>Built a data analytics platform for crypto wallets</li>
            </ul>
          </div>
        </div>

        <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold mb-2">On the Side</h2>
            <p className="text-gray-700 text-base">
              I enjoy indulging in low-level projects like building homebrew
              computers. I also think a lot about{" "}
              <a
                href="https://www.lesswrong.com/posts/va3TazozR9uWBfAoM/stop-trying-to-have-interesting-friends?curius=2895"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                this.
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-row space-x-2 items-baseline">
        <a
          href="https://calendly.com/eevaain/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Say Hi!
        </a>
        <p className="font-semibold">{"*I dare you*"}</p>
      </div>
    </div>
  );
}

export default Home;
