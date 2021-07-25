import { UserSettingsInput } from '@libs/application/user';
import React from 'react';
import { FieldError } from 'react-hook-form';

type SettingsViewProps = {
    errors: {
        [K in keyof UserSettingsInput | 'serverError']?: FieldError;
    };
    onSubmit: React.FormEventHandler;
    register: (k: keyof UserSettingsInput) => any;
};

export function SettingsView(props: SettingsViewProps): JSX.Element {
    const { errors, register, onSubmit } = props;
    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center font-bold py-2">Your Settings</h1>

                        <form onSubmit={onSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="URL of profile picture"
                                        {...register('image')}
                                    />
                                    {errors.image?.message && (
                                        <ul className="error-messages">
                                            <li>{errors.image.message}</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your Name"
                                        {...register('username')}
                                    />
                                    {errors.username?.message && (
                                        <ul className="error-messages">
                                            <li>{errors.username.message}</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        rows={8}
                                        placeholder="Short bio about you"
                                        {...register('bio')}
                                    ></textarea>
                                    {errors.bio?.message && (
                                        <ul className="error-messages">
                                            <li>{errors.bio.message}</li>
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

                                    {errors.email?.message && (
                                        <ul className="error-messages">
                                            <li>{errors.email.message}</li>
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
                                    {errors.password?.message && (
                                        <ul className="error-messages">
                                            <li>{errors.password.message}</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right">
                                    Update Settings
                                </button>
                            </fieldset>
                            {errors.serverError && (
                                <p className="error-messages">
                                    {errors.serverError.message}
                                </p>
                            )}
                        </form>

                        <hr className="my-4" />

                        <button
                            className="btn btn-outline-danger"
                            ng-click="$ctrl.logout() todo: implement me"
                        >
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
