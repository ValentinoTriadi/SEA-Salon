import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';
import { Role } from '@prisma/client';
import { getUserById } from './data/user';


export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      if (!user.id) {
        return false;
      }

      const ExistingUser = await getUserById(user?.id);
      return !!ExistingUser;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (token.phone && session.user) {
        session.user.phone = token.phone as string;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token?.sub) {
        return token;
      }

      const user = await getUserById(token.sub);
      if (user) {
        token.role = user.role;
        token.phone = user.phone;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
