/**
 * Input/Output Ports
 */
import { ObjectType } from 'simplytyped';

import { Article, ArticleFindManyArgs, ArticleList } from '../article';
import { User, UserCreateInput } from '../user';

// Interfaces which we use in application

export interface UserRegisterService {
    isAlreadyRegistered(): boolean;
    register(data: ObjectType<UserCreateInput>): Promise<void>;
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
    login(data: { email: string; password: string }): Promise<void>;
    isLoggedIn(): boolean;
    update(token: string): void;
    getToken(): string | undefined;
}

export interface ArticleService {
    create(data: any): Promise<Article>;
    update(data: any): Promise<Article>;
    delete(data: any): Promise<void>;
    findMany(args?: ArticleFindManyArgs): Promise<ArticleList>;
    favorite(articleId: string): Promise<true>;
    unfavorite(articleId: string): Promise<true>;
    findOne(articleId: string): Promise<Article>;
}

// export interface NotificationService {
//   notify(message: string): void;
// }

// export interface PaymentService {
//   tryPay(amount: PriceCents): Promise<boolean>;
// }
