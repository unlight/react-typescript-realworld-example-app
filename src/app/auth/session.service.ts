import jwtDecode, { JwtPayload } from 'jwt-decode';
import ky from 'ky';
import { inject } from 'njct';

import * as Tokens from '../tokens';
import { AppConfig } from '../types';
import { UserLoginEnvelope } from '../user';
import { SessionServiceInterface } from './session-service.interface';

const tokenKey = 'user_token_v1';

export class SessionService implements SessionServiceInterface {
  constructor(
    private readonly storage: Storage = inject('storage', () => localStorage),
    private readonly http = inject('httpclient', () => ky),
    private readonly config: AppConfig = inject(Tokens.Config),
  ) {}

  isLoggedIn(): boolean {
    const user = this.getUser();
    return Boolean(user);
  }

  async login(user: { email: string; password: string }): Promise<void> {
    const result = await this.http
      .post(`${this.config.apiBase}/users/login`, { json: { user } })
      .json<UserLoginEnvelope>();
    this.update(result.user.token);
  }

  update(token: string): void {
    this.storage.setItem(tokenKey, token);
  }

  getToken(): string | undefined {
    const result = this.storage.getItem(tokenKey);
    return result ?? undefined;
  }

  getUser() {
    const token = this.storage.getItem(tokenKey);
    if (!token) {
      return undefined;
    }
    let payload: JwtPayload & { id: number; username: string };
    try {
      payload = jwtDecode(token);
    } catch {
      return undefined;
    }

    if (payload.exp && Date.now() > payload.exp * 1000) {
      return undefined;
    }

    // eslint-disable-next-line consistent-return
    return payload;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async logout() {
    this.storage.removeItem(tokenKey);
  }
}
