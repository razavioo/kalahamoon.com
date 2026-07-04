import Link from "next/link";
import Image from "next/image";

export default function RootPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#151413] px-6 text-white">
      <div className="max-w-xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <Image src="/brand/kalahamoon-mark-small.svg" alt="" className="mx-auto h-12 w-12" width={48} height={48} />
        <h1 className="mt-5 font-display text-4xl">Kalahamoon</h1>
        <p className="mt-3 text-sm leading-7 text-white/60">Choose your preferred language.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/en/" className="border border-white/15 px-5 py-3 font-mono text-xs font-bold text-white/75 hover:bg-white/10">
            English
          </Link>
          <Link href="/fa/" className="border border-white/15 px-5 py-3 font-mono text-xs font-bold text-white/75 hover:bg-white/10">
            فارسی
          </Link>
        </div>
      </div>
    </main>
  );
}
