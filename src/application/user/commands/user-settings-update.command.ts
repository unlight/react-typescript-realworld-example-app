import { Err, Ok, Result } from '@hqoss/monads';
import { inject } from 'njct';

import { UserService } from '../../interfaces';
import { User, UserSettingsInput } from '../models';

export class UserSettingsUpdateCommand {
    // maybe create service for notify errors
    constructor(private readonly userService = inject<UserService>('userservice')) {}

    async execute(data: UserSettingsInput) {
        let result: Result<
            User,
            { code: string; errors: { [field: string]: string[] } }
        >;

        if (!data.password) {
            delete data.password;
        }

        try {
            result = Ok(await this.userService.updateCurrentUser(data));
        } catch (err: any) {
            result = Err(err);
        }
        return result;
    }
}
