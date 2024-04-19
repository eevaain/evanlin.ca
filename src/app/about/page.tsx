import Navigation from "@/components/navigation";

export default function About() {
  // if i remember correctly there should be a way for me to reuse the prev evanlin.ca, home and writing divs without rerender
  // preventing remount? is that the right term? kkjkj

  return (
    <div className="flex flex-col p-10 min-h-screen items-center bg-gray-100 pt-12 pb-8 mx-auto px-5 md:px-10">
      <div className="flex flex-col-2">
        <Navigation />
        <div className="flex flex-col pt-4 gap-4 w-full">
          <h2 className="text-xl md:text-2xl underline">About Me</h2>

          <p>Hi! I{"'"}m Evan.</p>
          <p>
            I{"'"}m fascinated by the fundamental building blocks of our world
            and how they make up the black boxes in our everyday lives.
          </p>
          <p>
            Even more so, I feel inclined to{" "}
            <span className="italic">open</span> them.
          </p>
          <p>
            I also love telling stories. Especially making people excited about
            things they didn{"'"}t know they could feel excited about.
          </p>

          <p>
            Nowadays, I try to share the things I do through{" "}
            <a
              href="https://twitter.com/evannlinn"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-blue-500"
            >
              Twitter,
            </a>{" "}
            or more recently my{" "}
            <a
              href="https://evanlin.ca/writing"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-blue-500"
            >
              writing
            </a>
            .
          </p>

          <p className="pt-8">
            But when I{"'"}m not doing either of the two, I am...
          </p>
          <ul className="list-disc list-inside text-base space-y-1">
            <li>
              Studying engineering in my first year at the University of Western
              Ontario <s>and skipping many classes</s>
            </li>

            <li>
              Satiating my thirst for low level technologies through
              nandtotetris[.]com
            </li>
            <li>And relearning how to play the piano</li>
          </ul>

          <p>More recently, I've become increasingly curious about...</p>
          <ul className="list-disc list-inside text-base space-y-1">
            <li>
              The future of computing, human-computer interfaces, and
              information processing
            </li>
            <li>
              Non-dualistic principles and the fundamental nature of
              conciousness
            </li>
            <li>And developmental psychology</li>
          </ul>

          <p className="pt-8">Previously, I...</p>
          <ul className="list-disc list-inside text-base space-y-1">
            <li>Took a gap year in 2022-2023 to FAFO</li>
            <li>Built search engines for startups @ Aviato</li>
            <li>Co-founded a data analytics platform for crypto wallets</li>
          </ul>

          <p className="pt-8">Websites just don't capture the full depth of who we are.</p>
          <p>This one is still a work in progress...</p>
          <p>But in the meantime, maybe we should talk! :)</p>

          <div className="pt-4 mb-8 flex flex-row space-x-3 items-baseline">
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
      </div>
    </div>
  );
}
