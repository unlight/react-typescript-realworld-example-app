/**
 * Input/Output Ports
 */
import { ObjectType } from 'simplytyped';

import { Article, ArticleFindManyArgs, ArticleList } from '../article';
import { Tag } from '../tag';
import { UserCreateInput, UserRegistration, UserSettingsInput } from '../user';

// Interfaces which we use in application

export interface UserService {
    register(data: ObjectType<UserCreateInput>): Promise<void>;
    getCurrentUser(): Promise<UserRegistration>;
    updateCurrentUser(data: UserSettingsInput): Promise<UserRegistration>;
}

export interface SessionService {
    login(data: { email: string; password: string }): Promise<void>;
    logout(): Promise<void>;
    isLoggedIn(): boolean;
    update(token: string): void;
    getToken(): string | undefined;
    getUser(): undefined | { id: number; username: string };
}

export interface ArticleService {
    create(data: any): Promise<Article>;
    update(data: any): Promise<Article>;
    delete(data: any): Promise<void>;
    findMany(args?: ArticleFindManyArgs): Promise<ArticleList>;
    favorite(articleId: string): Promise<true>;
    unfavorite(articleId: string): Promise<true>;
    findOne(articleId: string): Promise<Article>;
    feed(args: ArticleFindManyArgs): Promise<ArticleList>;
}

export interface TagService {
    getAllTags(): Promise<Tag[]>;
}
