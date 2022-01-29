import { User } from '@libs/application/user';
import { inject } from 'njct';
import { Err, Ok, Result } from 'rsts';

import { UserService } from '../../interfaces';

export class UserSettingsHandler {
  constructor(
    private readonly userService: UserService = inject<UserService>('userservice'),
  ) {}

  async execute() {
    let result: Result<User, Error>;
    try {
      result = Ok(await this.userService.getCurrentUser());
    } catch (error: any) {
      result = Err(error);
    }
    return result;
  }
}
