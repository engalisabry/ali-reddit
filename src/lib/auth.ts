import { db } from '@/lib/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from 'nanoid';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { User as NextAuthUser } from '@/types/next-auth.d.ts';
import { UserUpdateInput } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: process.env.NEXTAUTH_URL!,
        },
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.image = token.picture!;
        session.user.username = token.username!;
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = (await db.user.findFirst({
        where: {
          email: token.email,
        },
      })) as NextAuthUser;

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      const data: UserUpdateInput = {
        username: nanoid(10),
      };

      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data,
        });
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      };
    },
    redirect() {
      return '/';
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
