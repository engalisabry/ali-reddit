import { AvatarProps } from '@radix-ui/react-avatar';
import { User } from 'next-auth';

import { FC } from 'react';

import Image from 'next/image';

import { Icons } from './Icons';
import { Avatar, AvatarFallback } from './ui/Avatar';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'name' | 'image'>;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      <div className="relative aspect-square h-full w-full">
        {user.image ? (
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
            priority={true}
            sizes="(100vw,100vh)"
            className="object-cover"
          />
        ) : (
          <AvatarFallback>
            <span className="sr-only"> {user.name}</span>
            <Icons.user className="w-4 h-4" />
          </AvatarFallback>
        )}
      </div>
    </Avatar>
  );
};

export default UserAvatar;
