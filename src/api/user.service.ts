import type { Interface } from '@libs/application';
import { Profile } from '@libs/application/profile';
import type { User, UserSettingsInput } from '@libs/application/user';
import ky from 'ky';
import { inject } from 'njct';

import { AppConfig } from './types';

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
    const result = await this.http.post(url, { json: { user } }).json<{ user: User }>();
    this.sessionService.update(result.user.token);
  }

  isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn();
  }

  async getCurrentUser() {
    const result = await this.http
      .extend(this.authorization())
      .get(`${this.config.apiBase}/user`)
      .json<{ user: User }>();
    return result.user;
  }

  async updateCurrentUser(user: UserSettingsInput) {
    return this.http
      .extend(this.authorization())
      .extend({
        hooks: {
          afterResponse: [
            async (_request, _options, response) => {
              if (!response.ok) {
                const code = response.status;
                const { errors } = await response.json();
                return Promise.reject({ code, errors });
              }
            },
          ],
        },
      })
      .put(`${this.config.apiBase}/user`, { json: { user } })
      .json<{ user: User }>()
      .then(result => result.user);
  }

  async getProfile(name: string) {
    const result = await this.http
      .get(`${this.config.apiBase}/profiles/${name}`)
      .json<{ profile: Profile }>();
    return result.profile;
  }
}
