import type { AppConfig, Interface } from '@libs/application';
import type { UserRegistration } from '@libs/application/user';
import ky from 'ky';
import { inject } from 'njct';

export class UserService implements Interface.UserRegisterService {
    constructor(
        private readonly config = inject<AppConfig>('config'),
        private readonly httpClient = inject('httpclient', () => ky),
        private readonly authenticationService = inject<Interface.AuthenticationService>(
            'authenticationservice',
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
        this.authenticationService.update(result.user.token);
    }

    isAlreadyRegistered(): boolean {
        return this.authenticationService.isLoggedIn();
    }
}
