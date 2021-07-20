/**
 * Input/Output Ports
 */
import { ObjectType } from 'simplytyped';

import { Article, ArticleFindManyArgs, ArticleList } from '../article';
import { Tag } from '../tag';
import { UserCreateInput } from '../user';

// Interfaces which we use in application

export interface UserRegisterService {
    isAlreadyRegistered(): boolean;
    register(data: ObjectType<UserCreateInput>): Promise<void>;
}

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
    feed(args: ArticleFindManyArgs): Promise<ArticleList>;
}

export interface TagService {
    getAllTags(): Promise<Tag[]>;
}
