import Link from "next/link";

export default function Writing() {
  // if i remember correctly there should be a way for me to reuse the prev evanlin.ca, home and writing divs without rerender
  // preventing remount? is that the right term?
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-8 pb-8 mx-auto px-5">
      {/* or do i just make evanlin.ca, home and writing into
      a reusable component? will that prevent remounting? */}
      <h1 className="text-4xl font-bold mb-2">evanlin.ca</h1>

      <div className="flex flex-row gap-8 mb-4">
        <Link href="/">home</Link>
        <Link href="/writing">writing</Link>
      </div>
    </div>
  );
}
