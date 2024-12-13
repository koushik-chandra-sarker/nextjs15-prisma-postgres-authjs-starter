
import { Customer } from "@/backend/entities/Customer";
import { User } from "@/backend/entities/User";
import AppDataSource from "@/backend/config/datasource";

export class CustomerService {
    private customerRepository = AppDataSource.getRepository(Customer);

    async registerCustomer(user: User, customerData: Partial<Customer>) {
        const customer = this.customerRepository.create({
            ...customerData,
            user,
        });

        return this.customerRepository.save(customer);
    }

    async getCustomerByUserId(userId: string) {
        return this.customerRepository.findOne({
            where: { user: { id: userId } },
            relations: ["user"],
        });
    }

    async updateCustomer(userId: string, data: Partial<Customer>) {
        const customer = await this.getCustomerByUserId(userId);
        if (!customer) throw new Error("Customer not found");

        Object.assign(customer, data);
        return this.customerRepository.save(customer);
    }
}
