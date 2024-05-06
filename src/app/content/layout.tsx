import Image from 'next/image';
import Link from 'next/link';

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Image
        alt="New content cover image"
        className="h-40 w-full object-cover md:h-80 lg:h-96"
        height={1024}
        src="/images/bg.webp"
        width={1792}
      />
      <div className="container">
        <Link className="flex items-center px-4 py-1 text-base" href="/">
          <span className="text-2xl font-bold">◄</span>
          <span className="ml-2 hidden sm:inline">Atrás</span>
        </Link>
      </div>
      <section className="container">{children}</section>
    </main>
  );
}
