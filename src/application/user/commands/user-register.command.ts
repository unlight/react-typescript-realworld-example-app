import { Err, Ok, Result } from '@hqoss/monads';
import ensureError from 'ensure-error';
import Exception from 'rerror';

import { UserService } from '../../interfaces';
import { UserCreateInput } from '../user-create-input';

export class UserRegisterCommand {
    constructor(private readonly userService: UserService) {}

    async execute(data: UserCreateInput): Promise<Result<void, Exception>> {
        let result: Result<void, Exception>;
        try {
            result = Ok(await this.userService.register(data));
        } catch (error) {
            const innerError = ensureError(error);
            result = Err(
                new Exception({ name: 'UserRegistration', cause: innerError }),
            );
        }
        return result;
    }
}
