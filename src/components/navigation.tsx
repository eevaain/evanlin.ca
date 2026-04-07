import Link from "next/link";
import { Spectral } from "next/font/google";

const siteBrand = Spectral({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Navigation() {
  return (
    <nav className="md:sticky md:top-8 self-start md:w-40 w-full">
      <div className="flex flex-col gap-4 md:gap-5">
        <Link
          href="/"
          className={`${siteBrand.className} text-3xl font-bold text-red-900 transition-colors hover:text-red-950`}
        >
          evanlin.ca
        </Link>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-left md:flex-col md:items-start md:gap-2">
          <Link href="/" className="text-base text-red-900 hover:underline">
            about
          </Link>

          <Link
            href="/writing"
            className="text-base text-red-900 hover:underline"
          >
            blog!
          </Link>

          <Link
            href="/reading"
            className="text-base text-red-900 hover:underline"
          >
            links
          </Link>

          <a
            href="https://github.com/eevaain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-red-900 hover:underline"
          >
            github
          </a>

          <a
            href="https://twitter.com/evanliin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-red-900 hover:underline"
          >
            twitter
          </a>

          <a
            href="mailto:evanlin416@gmail.com"
            className="text-base text-red-900 hover:underline"
          >
            contact
          </a>
        </div>
      </div>
    </nav>
  );
}
