import { Interface } from '@libs/application';
import { inject } from 'njct';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'wouter';

import { LoginFormData } from './types';

export function useLogin() {
    const authenticationService = inject<Interface.AuthenticationService>(
        'authenticationservice',
    );
    const { 1: navigateTo } = useLocation();
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const { register, handleSubmit } = useForm<LoginFormData>();
    const onSubmit = handleSubmit(async data => {
        try {
            await authenticationService.login(data);
            navigateTo('/');
        } catch (err) {
            setServerErrorMessage(err.message);
        }
    });

    return {
        serverErrorMessage,
        onSubmit,
        register,
    };
}
