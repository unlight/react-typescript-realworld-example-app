/**
 * Input/Output Ports
 */

export interface SessionService {
  login(data: { email: string; password: string }): Promise<void>;
  logout(): Promise<void>;
  isLoggedIn(): boolean;
  update(token: string): void;
  getToken(): string | undefined;
  getUser(): undefined | { id: number; username: string };
}

export type { ArticleList } from './article';
export type { Profile } from './profile';
export type { UserService } from './user';
