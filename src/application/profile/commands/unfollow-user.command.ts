import { inject } from 'njct';
import { Err, Ok, Result } from 'rsts';

import { Interface } from '../..';
import { Profile } from '../../interfaces';

export class UnfollowUserCommand {
  constructor(
    private readonly userService = inject<Interface.UserService>('userservice'),
  ) {}

  async execute(name: string): Promise<Result<Profile, Error>> {
    let result: Result<Profile, Error>;
    try {
      result = Ok(await this.userService.unfollowUser(name));
    } catch {
      result = Err(new Error('UnfollowUser'));
    }
    return result;
  }
}
