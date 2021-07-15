import { ObjectType } from 'simplytyped';

import { UserCreateInput } from './user/user-create-input';
import { UserRegistration } from './user/user-registration';

// Interfaces which we use in application

export interface UserRegisterService {
    isAlreadyRegistered(): boolean;
    register(data: ObjectType<UserCreateInput>): Promise<UserRegistration>;
}

// export interface UserStorageService {
//   user?: User;
//   updateUser(user: User): void;
// }

// export interface CartStorageService {
//   cart: Cart;
//   updateCart(cart: Cart): void;
//   emptyCart(): void;
// }

// export interface OrdersStorageService {
//   orders: Order[];
//   updateOrders(orders: Order[]): void;
// }

export interface AuthenticationService {
    // login(name: UserName, email: Email): Promise<User>;
}

// export interface NotificationService {
//   notify(message: string): void;
// }

// export interface PaymentService {
//   tryPay(amount: PriceCents): Promise<boolean>;
// }
