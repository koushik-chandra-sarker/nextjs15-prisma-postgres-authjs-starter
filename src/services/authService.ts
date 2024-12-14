import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // To validate the password hash

const prisma = new PrismaClient();

export interface LoginResponse {
    id: string;
    name: string;
    email: string;
    role: string[];
}

export async function loginUser(email: string, password: string): Promise<LoginResponse | null> {
    try {
        // Fetch user from the database by email
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                role: true,  // Assuming 'roles' is the relation for roles in your Prisma schema
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // Return user data along with roles
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.map((role) => role.name),  // Assuming 'role.name' is how role data is structured
        };
    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
}
