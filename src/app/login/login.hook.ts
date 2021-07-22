import { Interface } from '@libs/application';
import { inject } from 'njct';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { LoginFormData } from './types';

export function useLogin() {
    const sessionService = inject<Interface.SessionService>('sessionservice');
    const { push } = useHistory();
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const { register, handleSubmit } = useForm<LoginFormData>();
    const onSubmit = handleSubmit(async data => {
        try {
            await sessionService.login(data);
            push('/');
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
