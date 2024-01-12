import React from "react";
import Image from "next/image"; // yeah ill fix this later
import Navigation from "@/components/navigation";

export default function Home() {
  const buttons = [
    { title: "Readings", href: "https://curius.app/evan-lin" },
    { title: "Twitter", href: "https://twitter.com/evannlinn" },
    { title: "Github", href: "https://github.com/eevaain" },
    {
      title: " Youtube",
      href: "https://www.youtube.com/channel/UCn9Ir-KFtIWSntk6RzGE1-A",
    },
  ];

  const expList = [
    { exp: "Took a gap year in 2022-2023 to FAFO" },
    { exp: "Built search engines for startups @ Aviato" },
    { exp: "World Finalist in Microsoft Imagine Cup" },
    { exp: "NLU intern @ Vocinity" },
    { exp: "Built a data analytics platform for crypto wallets" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-8 pb-8 mx-auto px-5">
      <h1 className="text-4xl font-bold mb-2">evanlin.ca</h1>
      <Navigation />
      <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <img src="me.jpg" alt="Evan Lin" className="w-full" />
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold mb-2">Currently</h2>
          <p className="text-gray-700 text-base">
            Studying engineering in my first year at the University of Western
            Ontario.
          </p>
        </div>

        <div className="bg-gray-200 px-6 py-4 flex flex-wrap gap-2">
          {/* {buttons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:text-white md:mb-0"
            >
              {button.title}
            </a>
          ))} */}
        </div>
      </div>

      <div className="mt-8 flex flex-col space-y-4">
        <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold mb-2">Previously </h2>
            <ul className="list-disc list-inside text-gray-700 text-base">
              {/* {expList.map((exp, index) => (
                <li key={index}>{exp.exp}</li>
              ))} */}
            </ul>
          </div>
        </div>

        <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold mb-2">On the Side</h2>
            <p className="text-gray-700 text-base">
              I take great pleasure in immersing myself in low-level projects
              like building{" "}
              <a
                href="/homebrew-computer"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                homebrew computers
              </a>
              . I also think a lot about{" "}
              <a
                href="https://www.lesswrong.com/posts/va3TazozR9uWBfAoM/stop-trying-to-have-interesting-friends?curius=2895"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                this.
              </a>{" "}
              I look forward to the day when our paths intersect.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-row space-x-3 items-baseline">
        <a
          href="https://calendly.com/eevaain/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Say hi!
        </a>
        <p>{"*I dare you*"}</p>
      </div>
    </div>
  );
}


