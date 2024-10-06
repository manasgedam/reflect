import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import prisma from "./lib/prisma"
import bcryptjs from "bcryptjs"

const publicRoutes = ['/', '/auth/signin', '/auth/signup']
const authRoutes = ['/auth/signin', '/auth/signup']

export const { handlers, signIn, signOut, auth } = NextAuth({

    providers: [Google,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                // user object 
                let user = null
                // validate user

                const parsedCredentials = signInSchema.safeParse(credentials)
                if (!parsedCredentials.success) {
                    console.log("Invalid credentials: ", parsedCredentials.error)
                    return null
                }

                // get user
                user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    }
                })

                if (!user) {
                    console.log("User not found");
                    return null
                }
                if (!user.password) {
                    console.log("User has no password. They probably signed up with an oauth provider.");
                    return null;
                }

                const isPasswordValid = await bcryptjs.compare(credentials.password as string, user.password);
                if (!isPasswordValid) {
                    console.log("Invalid password");
                    return null;
                }

                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }

        })
    ],

    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user
            const { pathname } = nextUrl

            if (publicRoutes.includes(pathname)) {
                return true
            }

            if (authRoutes.includes(pathname)) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/', nextUrl))
                }
                return true
            }
            return isLoggedIn
        },

        jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id as string;
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }
            return token;
        },

        session({ session, token }) {
            session.user.id = token.id as string;
            return session;
        }
    },

    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signup',
    },


});