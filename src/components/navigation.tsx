import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <div className="md:flex flex-col md:space-x-2 md:gap-4 md:p-8 p-8 bg-red-900 text-white items-center md:h-full">
      <h2 className="text-3xl font-bold mb-2 ">evanlin.ca</h2>

      <div className="flex md:flex-col md:gap-4 gap-2.5 h-full">
        <Link href="/" className="hover:underline md:text-base text-sm">
          Home
        </Link>

        <Link href="/writing" className="hover:underline md:text-base text-sm">
          Writing
        </Link>

        <Link href="/reading" className="hover:underline md:text-base text-sm">
          Links
        </Link>

        <a
          href="https://github.com/eevaain"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline md:text-base text-sm"
        >
          Github
        </a>

        <a
          href="https://twitter.com/evannlinn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline md:text-base text-sm"
        >
          Twitter
        </a>

        {/* <a
          href="https://www.youtube.com/channel/UCn9Ir-KFtIWSntk6RzGE1-A"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline md:text-base text-sm"
        >
          Youtube
        </a> */}

        {/* maybe add a bytecode trail as an easter egg */}

        {/* add some stuff here at the end of the navbar */}
      </div>

      {/* <p className="hidden md:block">;{")"}</p> */}
      {/* <Image className="hidden md:block" src="/gmail-pixel-art.gif" alt="my gif" height={40} width={40} /> */}
      <Image
        className="hidden md:block cursor-pointer"
        src="/pikachuslowed.gif"
        alt="my gif"
        height={60}
        width={60}
      />
    </div>
  );
}
