import { inject } from 'njct';
import { Err, Ok, Result } from 'rsts';

import { UserService } from '../../interfaces';
import { User, UserSettingsInput } from '../models';

export class UserSettingsUpdateCommand {
  // maybe create service for notify errors
  constructor(private readonly userService = inject<UserService>('userservice')) {}

  async execute(data: UserSettingsInput) {
    let result: Result<User, Error>;

    if (!data.password) {
      delete data.password;
    }

    try {
      result = Ok(await this.userService.updateCurrentUser(data));
    } catch (err: any) {
      // { code: string; errors: { [field: string]: string[] } }
      result = Err(err);
    }
    return result;
  }
}
