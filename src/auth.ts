import NextAuth, {Account, DefaultSession} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {signInSchema} from "@/lib/zod";
import {ZodError} from "zod";
import type {Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {LOGIN_PATH, LOGIN_REDIRECT_PATH, PROTECTED_ROUTES, REGISTER_PATH, ROOT_PATH} from "@/lib/RouterConstent";
import {JwtType, UserType} from "@/types/User";
import {loginUser} from "@/services/authService";

dayjs.extend(utc);
dayjs.extend(timezone);

declare module "next-auth" {
    interface User extends UserType {}
    interface Session extends DefaultSession  {
        user: User | null
    }
}

// declare module "next-auth/adapters" {
//     interface AdapterUser extends UserType {}
// }

declare module "next-auth/jwt" {
    interface JWT extends JwtType {
        user: User,
        error?: "RefreshAccessTokenError",
        errorMassage?: string
    }
}

export const { handlers, signIn, signOut, auth  } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {

                    const { username, password } = await signInSchema.parseAsync(credentials);
                    console.log("Authenticated credentials:", username, password);
                    // Call your API endpoint to authenticate the user

                    // Use the loginUser service to authenticate the user with Prisma
                    const user = await loginUser(username, password);

                    if (!user) {
                        throw new Error("Invalid credentials");
                    }

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role || ["user"], // Default role is "user" if not provided
                    };
                } catch (error) {
                    if (error instanceof ZodError) {
                        console.error("Validation error:", error);
                    } else {
                        console.error("Authorization error:", error);
                    }
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt", // Required for Credentials provider
        // maxAge: 30 * 24 * 60 * 60, // 30 DAYS
        maxAge: 300, // 5 MIN
    },

    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        // @ts-ignore
        async jwt({ token, user }: { token: JWT; user: any }) {
            if (user) {
                // Store additional user info in JWT token
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },
        authorized({ request: { nextUrl }, auth }) {
            const { pathname } = nextUrl;
            const isLoggedIn = !!auth?.user;

            // Redirect logged-in users away from login/register pages
            if ((pathname.startsWith(LOGIN_PATH) || pathname.startsWith(REGISTER_PATH)) && isLoggedIn) {
                return Response.redirect(new URL(LOGIN_REDIRECT_PATH, nextUrl)); // Redirect to home/root
            }

            /// Match protected route with `exact` flag logic
            const protectedRoute = PROTECTED_ROUTES.find(route => {
                const exactMatch = route.exact !== undefined ? route.exact : false; // Default to false if not specified
                if (exactMatch) {
                    return pathname === route.path; // Exact match
                }
                return pathname.startsWith(route.path); // Non-exact match
            });


            if (protectedRoute) {
                if (!isLoggedIn) {
                    // return false
                    // Store the callback URL in the search params
                    const loginUrl = new URL(LOGIN_PATH, nextUrl);
                    loginUrl.searchParams.set("callbackUrl", nextUrl.href);
                    return Response.redirect(loginUrl); // Redirect to login with callback URL
                }
                // If no roles are defined or roles is an empty array, allow all users
                if (!protectedRoute.roles || protectedRoute.roles.length === 0) {
                    return true; // Allow access for all users
                }
                const userRoles = auth?.user?.role || ['user']; // Default role is "user"
                const isAuthorized = userRoles.some(role => protectedRoute.roles?.includes(role));

                if (!isAuthorized) {
                    // Redirect unauthorized users to root
                    console.error(`Unauthorized access to ${pathname} by role(s): ${userRoles}`);
                    return Response.redirect(new URL(ROOT_PATH, nextUrl));
                }

                return true; // Authorized access
            }

            // Allow access to public routes (not in PROTECTED_ROUTES)
            return true;
        },



    },
    secret: process.env.NEXTAUTH_SECRET, // Set a secret for token signing
});
