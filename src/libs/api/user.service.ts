import { AppConfig } from '@libs/application';
import ky from 'ky';
import { inject } from 'njct';

export class UserService {
    constructor(
        private readonly config = inject<AppConfig>('config', () => {
            throw new Error('Provide config');
        }),
        private readonly httpClient = inject('httpClient', () => ky),
    ) {}

    async register(data: { name: string; password: string; email: string }) {
        const url = `${this.config.apiBase}/users`;
        const result = await this.httpClient.post(url, { json: data });
        console.log('result', result);
        return result;
    }

    login() {}
}
