import React from 'react';

import { useLogin } from './login.hook';

export function Login(): JSX.Element {
    const { serverErrorMessage, onSubmit, register } = useLogin();

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center font-bold">Sign In</h1>
                        <p className="text-xs-center">
                            <a href="/register">Do not have an account yet?</a>
                        </p>
                        <form onSubmit={onSubmit}>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Email"
                                    {...register('email')}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                    {...register('password')}
                                />
                            </fieldset>
                            {serverErrorMessage && (
                                <p className="error-messages">{serverErrorMessage}</p>
                            )}
                            <button className="btn btn-lg btn-primary pull-xs-right">
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
