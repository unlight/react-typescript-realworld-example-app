import type { AppConfig, Interface } from '@libs/application';
import type { UserRegistration } from '@libs/application/user';
import ky from 'ky';
import { inject } from 'njct';

export class UserService implements Interface.UserService {
    constructor(
        private readonly config = inject<AppConfig>('config'),
        private readonly httpClient = inject('httpclient', () => ky),
        private readonly sessionService = inject<Interface.SessionService>(
            'sessionservice',
        ),
    ) {}

    async register(user: {
        username: string;
        password: string;
        email: string;
    }): Promise<void> {
        const url = `${this.config.apiBase}/users`;
        const result = await this.httpClient
            .post(url, { json: { user } })
            .json<{ user: UserRegistration }>();
        this.sessionService.update(result.user.token);
    }

    isLoggedIn(): boolean {
        return this.sessionService.isLoggedIn();
    }
}
