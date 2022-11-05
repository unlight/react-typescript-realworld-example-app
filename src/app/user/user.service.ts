import { SessionServiceInterface, Tokens } from '@application';
import { Profile } from '@application/profile';
import type {
  User,
  UserService as IUserService,
  UserSettingsInput,
} from '@application/user';
import ky from 'ky';
import { inject } from 'njct';
import { Err, Ok, Result } from 'rsts';

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

  async register(data: {
    username: string;
    password: string;
    email: string;
  }): Promise<Result<User>> {
    const url = `${this.config.apiBase}/users`;
    let user: User;

    try {
      user = await this.http
        .post(url, { json: { user: data } })
        .json<{ user: User }>()
        .then(r => r.user);
    } catch (cause) {
      return Err(new Error('UserRegistration', { cause }));
    }

    this.sessionService.update(user.token);

    return Ok(user);
  }

  isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn();
  }

  async getCurrentUser() {
    return this.http
      .extend(this.authorization())
      .get(`${this.config.apiBase}/user`)
      .json<{ user: User }>()
      .then(data => Ok(data.user))
      .catch((cause: unknown) => Err(new Error('GetCurrentUser', { cause })));
  }

  async updateCurrentUser(data: UserSettingsInput): Promise<Result<User>> {
    if (!data.password) {
      delete data.password;
    }
    // eslint-disable-next-line sonarjs/prefer-immediate-return
    const result = await this.http
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
      .put(`${this.config.apiBase}/user`, { json: { user: data } })
      .json<{ user: User }>()
      .then(result => Ok(result.user))
      .catch((cause: unknown) =>
        Err(new Error('UpdateCurrentUser', { cause })),
      );

    return result;
  }

  async getProfile(name: string) {
    const result = await this.http
      .extend(this.authorization())
      .get(`${this.config.apiBase}/profiles/${name}`)
      .json<{ profile: Profile }>();
    return result.profile;
  }

  async followUser(name: string) {
    return await this.http
      .extend(this.authorization())
      .post(`${this.config.apiBase}/profiles/${name}/follow`)
      .json<{ profile: Profile }>()
      .then(data => Ok(data.profile))
      .catch((cause: unknown) => Err(new Error('FollowUser', { cause })));
  }

  async unfollowUser(name: string) {
    return this.http
      .extend(this.authorization())
      .delete(`${this.config.apiBase}/profiles/${name}/follow`)
      .json<{ profile: Profile }>()
      .then(data => Ok(data.profile))
      .catch((cause: unknown) => Err(new Error('UnfollowUser', { cause })));
  }
}
