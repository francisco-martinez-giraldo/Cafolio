import { Coffee, CreateCoffeeRequest, UpdateCoffeeRequest } from '../../types';
export declare class CoffeesService {
    getByUserId(userId: string, limit?: number): Promise<Coffee[]>;
    getById(id: string, userId: string): Promise<Coffee | null>;
    create(coffee: CreateCoffeeRequest): Promise<Coffee>;
    update(id: string, userId: string, updates: UpdateCoffeeRequest): Promise<Coffee>;
    delete(id: string, userId: string): Promise<void>;
    getRecent(userId: string, limit?: number): Promise<Coffee[]>;
}
//# sourceMappingURL=coffees.service.d.ts.map