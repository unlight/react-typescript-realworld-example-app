import type { AppConfig, Interface } from '@libs/application';
import { UserLoginEnvelope } from '@libs/application/user';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import ky from 'ky';
import { inject } from 'njct';

export class SessionService implements Interface.SessionService {
    constructor(
        private readonly storage: Storage = inject('Storage', () => localStorage),
        private readonly http = inject('httpclient', () => ky),
        private readonly config: AppConfig = inject('config'),
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
        this.storage.setItem('user_token_v1', token);
    }

    getToken(): string | undefined {
        const result = this.storage.getItem('user_token_v1');
        return result ? result : undefined;
    }

    getUser() {
        const token = this.storage.getItem('user_token_v1');
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

        return payload;
    }
}
