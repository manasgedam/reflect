import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
    theme: {
        logo: "/images/logo.png",
        colorScheme: "light",
    },
    pages: {
        signIn: '/auth/sign-in'
    },
    providers: [Google],
});