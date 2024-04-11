import Navigation from "@/components/navigation";

export default function About() {
  // if i remember correctly there should be a way for me to reuse the prev evanlin.ca, home and writing divs without rerender
  // preventing remount? is that the right term? kkjkj

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-8 pb-8 mx-auto px-5 md:px-10">
      <h1 className="text-4xl font-bold mb-2">evanlin.ca</h1>
      <Navigation />
      <div className="flex flex-col p-10 gap-4 w-full">
        <h1 className="text-xl md:text-2xl underline">About Me</h1>

        <p>Hi! I'm Evan.</p>
        <p>
          I{"'"}m fascinated by the fundamental building blocks of our world and
          how they make up the black boxes in our everyday lives.
        </p>
        <p>
          Even more so, I feel inclined to <span className="italic">open</span>{" "}
          them.
        </p>
        <p>
          I also love telling stories. Especially making people excited about
          things they didn{"'"}t know they could feel excited about.
        </p>
        <p>Youtube used to be this medium for me.</p>
        <p>
          Nowadays I try to share the things I do through{" "}
          <a
            href="https://twitter.com/evannlinn"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-blue-500"
          >
            Twitter,
          </a> or more recently my{" "}
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

        <p>I think I'll return to making videos someday. Maybe soon.</p>
        <p>
          After all, shouldn't we all be working on things which we enjoy and
          come natural to us?
        </p>
      </div>
    </div>
  );
}
