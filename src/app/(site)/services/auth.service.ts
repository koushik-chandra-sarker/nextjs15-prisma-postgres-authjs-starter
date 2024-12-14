"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import {CredentialsType} from "@/types/Login";


export async function login({ username, password }: CredentialsType, callbackUrl: string) {
    try {
        // Call signIn with the callbackUrl
        await signIn("credentials", { username, password, redirectTo: callbackUrl });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials',
                    };
                default:
                    return {
                        message: 'Something went wrong.',
                    };
            }
        }
        throw error;
    }
}
export async function logout() {
    console.log("************************Logout***********************");
    await signOut();
}
