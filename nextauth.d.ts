import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: String;
      emailVerified?: boolean;
      role: string;
      image?: string;
    } & DefaultSession["user"];
  }
}
