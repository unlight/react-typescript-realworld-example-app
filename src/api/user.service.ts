import type { AppConfig, Interface } from '@libs/application';
import type { UserRegistration, UserSettingsInput } from '@libs/application/user';
import ky from 'ky';
import { inject } from 'njct';

export class UserService implements Interface.UserService {
    private authorization = () => {
        const token = this.sessionService.getToken();
        return {
            headers: {
                Authorization: token ? `Token ${token}` : undefined,
            },
        };
    };
    constructor(
        private readonly config = inject<AppConfig>('config'),
        private readonly http = inject('httpclient', () => ky),
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
        const result = await this.http
            .post(url, { json: { user } })
            .json<{ user: UserRegistration }>();
        this.sessionService.update(result.user.token);
    }

    isLoggedIn(): boolean {
        return this.sessionService.isLoggedIn();
    }

    async getCurrentUser() {
        const result = await this.http
            .extend(this.authorization())
            .get(`${this.config.apiBase}/user`)
            .json<{ user: UserRegistration }>();
        return result.user;
    }

    async updateCurrentUser(user: UserSettingsInput) {
        return this.http
            .extend(this.authorization())
            .extend({
                hooks: {
                    afterResponse: [
                        async (_request, _options, response) => {
                            const code = response.status;
                            const { errors } = await response.json();
                            return Promise.reject({ code, errors });
                        },
                    ],
                },
            })
            .put(`${this.config.apiBase}/user`, { json: { user } })
            .json<{ user: UserRegistration }>()
            .then(result => result.user);
    }
}
