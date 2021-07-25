import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Interface } from '@libs/application';
import { UserSettingsInput } from '@libs/application/user';
import { UserSettingsUpdateCommand } from '@libs/application/user/commands';
import { UserSettingsHandler } from '@libs/application/user/queries';
import { inject } from 'njct';
import React from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { SettingsView } from './SettingsView';

export function Settings(): JSX.Element {
    const userService = inject<Interface.UserService>('userservice');
    const {
        setError,
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSettingsInput & { serverError: string }>({
        resolver: classValidatorResolver(UserSettingsInput),
        reValidateMode: 'onBlur',
        criteriaMode: 'all',
    });
    const { revalidate } = useSWR<void>('user/settings', async () => {
        const query = new UserSettingsHandler(userService);
        const data = await query.execute();
        reset(data);
    });
    const onSubmit = handleSubmit(async data => {
        const command = new UserSettingsUpdateCommand(userService);
        const result = await command.execute(data);
        result.match({
            ok: () => {
                void revalidate();
                // return revalidate();
                // push('/');
            },
            err: error => {
                for (const [field, messages] of Object.entries(error.errors)) {
                    setError(field as any, {
                        message: messages[0],
                    });
                }
            },
        });
    });

    return <SettingsView errors={errors} register={register} onSubmit={onSubmit} />;
}
