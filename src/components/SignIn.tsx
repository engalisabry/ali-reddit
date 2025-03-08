import { FC } from 'react';
import { Icons } from './Icons';
import Link from 'next/link';
import UserAuthForm from './UserAuthForm';

const SignIn: FC = ({}) => {
  return (
    <div className="container mx-auto w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto w-6 h-6" />
        <h1 className="tracking-tight text-2xl font-semibold">Welcome back!</h1>

        {/* SignIn form */}
        <UserAuthForm />

        <p>
          New to Ali Reddit?{' '}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Sign Up{' '}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
