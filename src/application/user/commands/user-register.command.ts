import { Err, Ok, Result } from 'rsts';

import { UserCreateInput } from '../models';
import { UserService } from '../user-service.interface';

export class UserRegisterCommand {
  constructor(private readonly userService: UserService) {}

  async execute(data: UserCreateInput): Promise<Result<void, Error>> {
    let result: Result<void, Error>;
    try {
      result = Ok(await this.userService.register(data));
    } catch {
      // const innerError = ensureError(error);
      result = Err(new Error('UserRegistration'));
    }
    return result;
  }
}
