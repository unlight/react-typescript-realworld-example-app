export interface SessionServiceInterface {
  login(data: { email: string; password: string }): Promise<void>;
  logout(): Promise<void>;
  isLoggedIn(): boolean;
  update(token: string): void;
  getToken(): string | undefined;
  getUser(): undefined | { id: number; username: string };
}
