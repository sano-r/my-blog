// components/Header.tsx
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="w-screen h-[70px] shadow-md bg-zinc-50 flex items-center justify-between px-4 fixed top-0">
      <div className="font-bold text-3xl">
        <Link href="/blog">My-Blog</Link>
      </div>
      <nav>
        <Link href="/blog" className="mr-4">
          ホーム
        </Link>
        <Link href="/contact" className='mr-4'>
            お問い合わせ
        </Link>
      </nav>
    </header>
  );
};

export default Header;