import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Interface } from '@libs/application';
import { UserSettingsInput } from '@libs/application/user';
import { UserSettingsUpdateCommand } from '@libs/application/user/commands';
import { UserSettingsHandler } from '@libs/application/user/queries';
import { inject } from 'njct';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';
import { isLoading } from '@libs/ui/Loader';

import { SettingsView } from './SettingsView';

export function Settings(): JSX.Element {
    const [isLoadingValue, setIsLoading] = useRecoilState(isLoading);
    const userService = inject<Interface.UserService>('userservice');
    const { error, data, revalidate } = useSWR('user/settings', async () => {
        const query = new UserSettingsHandler(userService, notifyError);
        const data = await query.execute();
        return data;
    });
    const {
        setError,
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<UserSettingsInput & { serverError: string }>({
        resolver: classValidatorResolver(UserSettingsInput),
        reValidateMode: 'onBlur',
        criteriaMode: 'all',
    });
    const notifyError = (message: string) => setError('serverError', { message });

    useEffect(() => {
        if (data) {
            setIsLoading(false);
            reset(data);
        } else {
            setIsLoading(true);
        }
    }, [reset, data]);

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

    return (
        <SettingsView
            errors={errors}
            register={register}
            onSubmit={onSubmit}
            disabled={!data}
        />
    );
}
