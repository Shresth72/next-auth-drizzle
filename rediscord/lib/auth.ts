import { db } from "@/db";
import { users } from "@/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { NextAuthOptions, getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      const email = token.email;
      const dbUser = (
        await db
          .select()
          .from(users)
          .where(eq(users.email, email as string))
      )[0];

      if (!dbUser) {
        token.id = user.id;
        return token;
      }
      if (!dbUser.username) {
        await db
          .update(users)
          .set({ username: nanoid(10) })
          .where(eq(users.id, dbUser.id));
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
        username: dbUser.username,
      };
    },
    redirect() {
      return "/";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
