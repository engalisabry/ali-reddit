import { UserUpdateInput } from '@prisma/client';

declare module '@prisma/client' {
  interface UserUpdateInput {
    username?: string | null;
  }
}
