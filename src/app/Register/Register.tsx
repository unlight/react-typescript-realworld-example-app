import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Interface, UserCreateInput } from '@libs/application';
import { UserRegisterCommand } from '@libs/application/user/commands';
import { inject } from 'njct';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';

import { RegisterView } from './RegisterView';

export function Register(): JSX.Element {
    const userService = inject<Interface.UserRegisterService>('userregisterservice');
    const { push } = useHistory();
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserCreateInput>({
        resolver: classValidatorResolver(UserCreateInput),
        reValidateMode: 'onBlur',
        criteriaMode: 'all',
    });
    const command = new UserRegisterCommand(userService);

    if (userService.isAlreadyRegistered()) {
        return <Redirect to="/" />;
    }

    const onSubmit = handleSubmit(async data => {
        const result = await command.execute(data);
        result.match({
            ok: () => {
                push('/');
            },
            err: error => {
                setServerErrorMessage(error.message);
            },
        });
    });

    return (
        <RegisterView
            onSubmit={onSubmit}
            errors={errors}
            register={register}
            serverErrorMessage={serverErrorMessage}
        />
    );
}
