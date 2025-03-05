import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginSchema } from './types';
import prisma from './lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = await loginSchema.parseAsync(credentials);
        // TODO: hash password
        // const hashedPassword = await argon2.hash(password);

        let user = await prisma.user.findFirst({
          where: {
            email: username,
            password: password,
          },
        });

        if (user) {
          return user;
        }

        user = await prisma.user.create({
          data: {
            email: username,
            password: password,
          },
        });

        return user;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...(session.user || {}),
          ...token.user,
        };
      }
      return session;
    },
  },
});
