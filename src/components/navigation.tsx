import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex flex-row gap-8 mb-4">
      <Link href="/" className="hover:underline">
        home
      </Link>
      <Link href="/writing" className="hover:underline">
        writing
      </Link>
    </div>
  );
}
