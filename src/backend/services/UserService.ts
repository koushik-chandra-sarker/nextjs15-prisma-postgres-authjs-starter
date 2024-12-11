import bcrypt from "bcrypt";
import { User } from "@/backend/entity/User";
import {AppDataSource} from "@/backend/config/db";
import {RoleService} from "@/backend/services/roleService";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private roleService = new RoleService();

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
        return this.userRepository.findOne({
            where: { email },
            relations: ["role"],
        });
    }

    async validatePassword(inputPassword: string, storedPassword: string) {
        return bcrypt.compare(inputPassword, storedPassword);
    }
}
