import CloseModel from '@/components/CloseModel';
import SignUp from '@/components/SignUp';

const page = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="flex items-center mx-auto h-full max-w-lg">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute right-4 top-4">
            <CloseModel />
          </div>

          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default page;
