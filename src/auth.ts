import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const testUsers = [
  { id: "1", name: "Test User", username: "test@test.com", password: "6054c4a8-8c73-4456-91e3-58efc8c01286" },
];

export const { handlers, auth, signIn, signOut } = NextAuth({

  providers: [

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials || {};

        console.log(" !!! ~ authorize ~ credentials:", credentials)

        if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
          return null;
        }

        // Validate against testUsers JSON object
        const user = testUsers.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          return user;
        }

        // If no match is found
        return null;
      },
    }),

  ],

  session: {
    strategy: "jwt", 
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
    }

  },
});