
import { Role } from "@/backend/entity/Role";
import {AppDataSource} from "@/backend/config/db";

export class RoleService {
    private roleRepository = AppDataSource.getRepository(Role);

    async createRole(name: string) {
        const role = this.roleRepository.create({ name });
        return this.roleRepository.save(role);
    }

    async getRoleByName(name: string) {
        return this.roleRepository.findOneBy({ name });
    }

    async getAllRoles() {
        return this.roleRepository.find();
    }
}
