import bcrypt from "bcrypt";
import { User } from "@/backend/entities/User";
import AppDataSource from "@/backend/config/datasource";
import {RoleService} from "@/backend/services/RoleService";
import {cache} from "react";
import {unstable_cache} from "next/cache";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private roleService = new RoleService();

    constructor() {

    }
    async createUser(email: string, password: string, roleName: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = await this.roleService.getRoleByName(roleName);
        if (!role) throw new Error("Invalid role");

        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            role,
        });

        return this.userRepository.save(user);
    }

    async getUserByEmail(email: string) {
        // Use the cached function
        return this.getUserByEmailCached(email);
    }
    // Cache for fetching user by email
    private getUserByEmailCached = unstable_cache(async (email: string) => {
        console.log("Fetching from database");
        return this.userRepository.findOne({
            where: { email },
        });
    }, ["user"], {revalidate: 30, tags: ["user"]});

    async validatePassword(inputPassword: string, storedPassword: string) {
        return bcrypt.compare(inputPassword, storedPassword);
    }
}
