'use client';

import { ImageIcon, Link2 } from 'lucide-react';
import { Session } from 'next-auth';
import { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import UserAvatar from './UserAvatar';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getSubmitPath = () => {
    const normalizedPath = pathname.replace(/^(\/r\/)+/, '/r/');
    return `${normalizedPath}/submit`;
  };

  return (
    <li className="overflow-hidden rounded-md bg-white shadow list-none">
      <div className="h-full px-6 py-4 flex justify-between gap-6 ">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user?.image || null,
            }}
          />

          <span className="absolute bottom-3 right-[-2px] rounded-full w-2 h-2 bg-green-500 outline outline-2 outline-white" />
        </div>

        <Input
          readOnly
          onClick={() => router.push(getSubmitPath())}
          placeholder="Create Post"
        />

        <Button
          variant="ghost"
          onClick={() => router.push(getSubmitPath())}
        >
          <ImageIcon className="text-zinc-600" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => router.push(getSubmitPath())}
        >
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;
