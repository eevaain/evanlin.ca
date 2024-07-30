import Navigation from "@/components/navigation";


export default function Home() {
  return (
    <div className="flex md:pt-12 pt-8 pb-8 w-full justify-center h-full">
      <div className="md:flex md:space-x-12 md:w-2/3 w-5/6 "> 
        <Navigation />
        <div className="flex flex-col md:pt-4 pt-6 gap-2 overflow-auto px-4 md:px-0 md:pr-10">
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
            I also love telling stories! Especially making people excited about
            things they didn{"'"}t know they could feel excited about.
          </p>

          <p>
            Nowadays, I try to share the things I do through{" "}
            <a
              href="https://twitter.com/evannlinn"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-red-800"
            >
              Twitter,
            </a>{" "}
            or more recently my{" "}
            <a
              href="https://evanlin.ca/writing"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-red-800"
            >
              writing
            </a>
            .
          </p>

          <p className="pt-8">
            But when I{"'"}m not doing either of the two, I am...
          </p>
          <ul className="list-disc list-inside text-base space-y-0.75">
            <li>
              Studying engineering in my first year at the University of Western
              Ontario <s>and skipping many classes</s>
            </li>

            <li>
              Satiating my thirst for low level technologies (started building a minimal tpu on 05/20/24)
            </li>
            <li>And relearning how to play the piano</li>
            <li>Singing!</li>
          </ul>

          <p>More recently, I{"'"}ve become increasingly curious about...</p>
          <ul className="list-disc list-inside text-base space-y-0.75">
            <li>
              The future of computing, human-computer interfaces, and
              information processing
            </li>
            <li>
              Non-dualistic principles and the fundamental nature of
              conciousness
            </li>
            <li>And developmental psychology, particularly in early human development</li>
          </ul>

          <p className="pt-8">Previously, I...</p>
          <ul className="list-disc list-inside text-base space-y-0.75">
            <li>Took a gap year in 2022-2023 to FAFO</li>
            <li>Built search engines for startups @ Aviato</li>
            <li>Co-founded a data analytics platform for crypto wallets</li>
          </ul>

          <p className="pt-8">Websites just don{"'"}t capture the full depth of who we are.</p>
          <p>This one is still a work in progress...</p>
          <p>But in the meantime, maybe we should talk! :{")"}</p>

          <div className="pt-4 mb-8 flex flex-row space-x-3 items-baseline">
            <a
              href="https://calendly.com/eevaain/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-900 hover:bg-red-950 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
