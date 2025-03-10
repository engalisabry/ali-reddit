// import type { Session, User } from 'next-auth';

// import type { JWT } from 'next-auth/jwt';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       name?: string;
//       email?: string;
//       username?: string;
//       image?: string;
//     };
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id: string;
//     username?: string;
//   }
// }

// declare module 'next-auth' {
//   interface User {
//     id: string;
//     name?: string;
//     email?: string;
//     username?: string;
//     image?: string;
//   }
// }

import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    username?: string | null;
  }
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  username?: string;
  image?: string;
}
declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId;
      username?: string | null;
    };
  }
}
