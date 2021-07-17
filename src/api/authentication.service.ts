import type { AppConfig, Interface } from '@libs/application';
import { UserLoginEnvelope } from '@libs/application/user';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import ky from 'ky';
import { inject } from 'njct';

export class AuthenticationService implements Interface.AuthenticationService {
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

    private getUser() {
        const token = this.storage.getItem('user_token_v1');
        if (!token) {
            return undefined;
        }
        let payload: JwtPayload;
        try {
            payload = jwtDecode<JwtPayload>(token);
        } catch {
            return undefined;
        }

        if (payload.exp && Date.now() > payload.exp * 1000) {
            return undefined;
        }

        return payload as { id: number; username: string };
    }
}
