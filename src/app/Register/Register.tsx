import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ports, UserCreateInput } from '@libs/application';
import { inject } from 'njct';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ObjectType } from 'simplytyped';
import { Redirect, useLocation } from 'wouter';

import { RegisterView } from './RegisterView';

export function Register(): JSX.Element {
    const userService = inject<ports.UserRegisterService>('UserRegisterService', () => {
        throw 'UserRegisterService is not configured';
    });
    if (userService.isAlreadyRegistered()) {
        return <Redirect to="/" />;
    }
    const { 1: navigateTo } = useLocation();
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ObjectType<UserCreateInput>>({
        resolver: classValidatorResolver(UserCreateInput),
        reValidateMode: 'onBlur',
    });
    const onSubmit = handleSubmit(async data => {
        try {
            await userService.register(data);
            navigateTo('/');
        } catch (err: any) {
            setServerErrorMessage(err?.message || 'Unknown error');
        }
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
