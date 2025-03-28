import BackHomeButton from '@/components/BackHomeButton';
import SignUp from '@/components/SignUp';

const page = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <BackHomeButton />
        <SignUp />
      </div>
    </div>
  );
};

export default page;
