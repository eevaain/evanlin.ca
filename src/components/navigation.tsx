import Link from "next/link";

export default function Navigation() {
  return (
    <div className="md:flex flex-col md:space-x-2 md:gap-4 p-8 bg-red-900 text-white items-center md:h-full">
      <h2 className="text-3xl font-bold mb-2 ">evanlin.ca</h2>

      <div className="flex md:flex-col gap-4 h-full">
        <Link href="/" className="hover:underline md:text-md ">
          Home
        </Link>

        <Link href="/writing" className="hover:underline">
          Writing
        </Link>

        <a
          href="https://github.com/eevaain"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Github
        </a>

        <a
          href="https://twitter.com/evannlinn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Twitter
        </a>

        <a
          href="https://www.youtube.com/channel/UCn9Ir-KFtIWSntk6RzGE1-A"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Youtube
        </a>

        {/* maybe add a bytecode trail as an easter egg */}

        {/* add some stuff here at the end of the navbar */}
      </div>

      <p>;{")"}</p>
    </div>
  );
}
