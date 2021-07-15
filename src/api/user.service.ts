import { AppConfig } from '@libs/application';
import { UserRegisterService } from '@libs/application/ports';
import { UserRegistration } from '@libs/application/user/user-registration';
import ky from 'ky';
import { inject } from 'njct';

export class UserService implements UserRegisterService {
    constructor(
        private readonly config = inject<AppConfig>('config', () => {
            throw new Error('Provide config');
        }),
        private readonly httpClient = inject('httpClient', () => ky),
        private readonly storage: Storage = inject('storage', () => localStorage),
    ) {}

    async register(user: { username: string; password: string; email: string }) {
        const url = `${this.config.apiBase}/users`;
        const result = await this.httpClient
            .post(url, { json: { user } })
            .json<UserRegistration>();
        this.storage.setItem('user', JSON.stringify(result));
        return result;
    }

    isAlreadyRegistered(): boolean {
        return true;
    }
}
