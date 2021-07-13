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

    async register(user: { name: string; password: string; email: string }) {
        const url = `${this.config.apiBase}/users`;
        const result = await this.httpClient.post(url, { json: { user } }).json();
        console.log('result', result);
        // bio: null
        // createdAt: "2021-07-13T19:06:34.766Z"
        // email: "tetikokucy@mailinator.com"
        // id: 184174
        // image: null
        // token: ""
        // updatedAt: "2021-07-13T19:06:34.775Z"
        // username: "rosih"
        return result;
    }

    login() {}
}
