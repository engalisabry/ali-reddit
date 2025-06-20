import Link from 'next/link';
import { getAuthSession } from '@/lib/auth';
import { Icons } from './Icons';
import SearchBar from './SearchBar';
import UserAccountNav from './UserAccountNav';
import { buttonVariants } from './ui/Button';

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-slate-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* Logo */}
        <Link
          href="/"
          className="gap-2 flex items-center"
        >
          <Icons.logo className="w-8 h-8 sm:w-6 sm:h-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Ali Reddit
          </p>
        </Link>

        {/* Search */}
        <SearchBar />

        {/* Sign In */}
        {session ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link
            href="/sign-in"
            className={buttonVariants()}
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
