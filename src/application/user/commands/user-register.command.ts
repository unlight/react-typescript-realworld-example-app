import { Err, Ok, Result } from '@hqoss/monads';
import ensureError from 'ensure-error';
import Error from 'rerror';

import { UserRegisterService } from '../../interfaces';
import { UserCreateInput } from '../user-create-input';

export class UserRegisterCommand {
    constructor(private readonly userRegisterService: UserRegisterService) {}

    async execute(data: UserCreateInput): Promise<Result<void, Error>> {
        let result: Result<void, Error>;
        try {
            result = Ok(await this.userRegisterService.register(data));
        } catch (error) {
            const innerError = ensureError(error);
            result = Err(new Error({ name: 'UserRegistration', cause: innerError }));
        }
        return result;
    }
}
