import { Result } from 'rsts';
import { ObjectType } from 'simplytyped';

import { Profile } from '../profile';
import { User, UserCreateInput, UserSettingsInput } from './models';

export interface UserService {
  register(data: ObjectType<UserCreateInput>): Promise<Result<User>>;
  getCurrentUser(): Promise<Result<User>>;
  updateCurrentUser(data: UserSettingsInput): Promise<Result<User>>;
  getProfile(name: string): Promise<Profile>;
  followUser(username: string): Promise<Result<Profile>>;
  unfollowUser(username: string): Promise<Result<Profile>>;
}
