import { SessionServiceInterface, Tokens } from '@application';
import { Profile } from '@application/profile';
import type {
  User,
  UserService as IUserService,
  UserSettingsInput,
} from '@application/user';
import ky from 'ky';
import { inject } from 'njct';

import { AppConfig } from './types';

export class UserService implements IUserService {
  private authorization = () => {
    const token = this.sessionService.getToken();
    return {
      headers: {
        Authorization: token ? `Token ${token}` : undefined,
      },
    };
  };
  constructor(
    private readonly config = inject<AppConfig>(Tokens.Config),
    private readonly http = inject('httpclient', () => ky),
    private readonly sessionService = inject<SessionServiceInterface>(
      Tokens.SessionService,
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
                throw { code, errors };
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
      .extend(this.authorization())
      .get(`${this.config.apiBase}/profiles/${name}`)
      .json<{ profile: Profile }>();
    return result.profile;
  }

  async followUser(name: string) {
    const result = await this.http
      .extend(this.authorization())
      .post(`${this.config.apiBase}/profiles/${name}/follow`)
      .json<{ profile: Profile }>();
    return result.profile;
  }

  async unfollowUser(name: string) {
    const result = await this.http
      .extend(this.authorization())
      .delete(`${this.config.apiBase}/profiles/${name}/follow`)
      .json<{ profile: Profile }>();
    return result.profile;
  }
}