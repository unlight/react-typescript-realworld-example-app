import { Interface } from '@libs/application';
import { UserRegistration } from '@libs/application/user';

export class UserSettingsHandler {
    constructor(private readonly userService: Interface.UserService) {}

    async execute(): Promise<UserRegistration> {
        return await this.userService.getCurrentUser();
    }
}
