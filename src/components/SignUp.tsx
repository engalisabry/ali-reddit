import Link from 'next/link';

import { Icons } from './Icons';
import UserAuthForm from './UserAuthForm';

const SignUp = ({}) => {
  return (
    <div className="container mx-auto w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto w-6 h-6" />
        <h1 className="tracking-tight text-2xl font-semibold">Sign Up</h1>
        <p className="text-sm text-zinc-500">
          By connecting with your account, you agree to our terms and
          conditions.
        </p>

        {/* SignIn form */}
        <UserAuthForm />

        <p>
          Already a member in Ali Reddit?{' '}
          <Link
            href="/sign-in"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Sign In{' '}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
