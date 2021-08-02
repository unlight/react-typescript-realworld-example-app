import { Interface } from '@libs/application';

export class UserSettingsHandler {
    constructor(
        private readonly userService: Interface.UserService,
        private readonly notifyError: any,
    ) {}

    async execute() {
        try {
            return await this.userService.getCurrentUser();
        } catch (error) {
            this.notifyError(error.message);
        }
    }
}
