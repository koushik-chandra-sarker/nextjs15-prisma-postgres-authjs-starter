import { NextResponse } from "next/server";
import {UserService} from "@/backend/services/UserService";

const userService = new UserService();
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse the request body
        const { email, password } = body;

        console.log("Login request:", email, password);

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        // Call your user service to log in the user
        const user = await userService.loginUser(email, password);
        console.log("Logged in user:", user);

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "User not found") {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }

            if (error.message === "Invalid password") {
                return NextResponse.json({ message: "Invalid password" }, { status: 401 });
            }
        }

        console.error("Error logging in user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
