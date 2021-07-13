import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { UserService } from '@libs/api';
import { UserCreateInput } from '@libs/application';
import { inject } from 'njct';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export function Register(): JSX.Element {
    const userService = inject.service(UserService);
    const [serverError, setServerError] = useState('');
    const { register, handleSubmit, formState } = useForm<UserCreateInput>({
        resolver: classValidatorResolver(UserCreateInput),
        reValidateMode: 'onBlur',
    });
    const onSubmit = handleSubmit(async data =>
        userService.register(data).catch(err => {
            setServerError(err.message);
        }),
    );

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <a href="/login">Have an account?</a>
                        </p>
                        <form onSubmit={onSubmit}>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Your Name"
                                    {...register('username')}
                                />
                                {formState.errors.username?.message && (
                                    <ul className="error-messages">
                                        <li>{formState.errors.username.message}</li>
                                    </ul>
                                )}
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Email"
                                    {...register('email')}
                                />
                                {formState.errors.email?.message && (
                                    <ul className="error-messages">
                                        <li>{formState.errors.email.message}</li>
                                    </ul>
                                )}
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                    {...register('password')}
                                />
                                {formState.errors.password?.message && (
                                    <ul className="error-messages">
                                        <li>{formState.errors.password.message}</li>
                                    </ul>
                                )}
                            </fieldset>
                            {serverError && (
                                <p className="error-messages">{serverError}</p>
                            )}
                            <button className="btn btn-lg btn-primary pull-xs-right">
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
