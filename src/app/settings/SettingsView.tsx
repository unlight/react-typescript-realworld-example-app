import { UserSettingsInput } from '@libs/application/user';
import classNames from 'clsx';
import React from 'react';
import { FieldError } from 'react-hook-form';

type SettingsViewProps = {
  errors: {
    [K in keyof UserSettingsInput]?: FieldError;
  };
  serverError: string;
  onSubmit: React.FormEventHandler;
  register: (k: keyof UserSettingsInput) => any;
  disabled: boolean;
  logout: (event: React.BaseSyntheticEvent) => void;
};

export function SettingsView(props: SettingsViewProps): JSX.Element {
  const { errors, register, onSubmit, disabled, logout, serverError } = props;
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center font-bold mb-4">Your Settings</h1>

            <form onSubmit={onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    disabled={disabled}
                    {...register('image')}
                  />
                  {errors.image?.message && (
                    <ul className="error-messages text-sm">
                      <li>{errors.image.message}</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    disabled={disabled}
                    {...register('username')}
                  />
                  {errors.username?.message && (
                    <ul className="error-messages text-sm">
                      <li>{errors.username.message}</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    disabled={disabled}
                    {...register('bio')}
                  ></textarea>
                  {errors.bio?.message && (
                    <ul className="error-messages text-sm">
                      <li>{errors.bio.message}</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    disabled={disabled}
                    {...register('email')}
                  />

                  {errors.email?.message && (
                    <ul className="error-messages text-sm">
                      <li>{errors.email.message}</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    disabled={disabled}
                    {...register('password')}
                  />
                  {errors.password?.message && (
                    <ul className="error-messages text-sm">
                      <li>{errors.password.message}</li>
                    </ul>
                  )}
                </fieldset>
                {serverError && (
                  <p className="error-messages text-sm my-4">{serverError}</p>
                )}
                <button
                  className={`btn btn-lg btn-primary pull-xs-right ${
                    disabled ? ' disabled' : ''
                  }`}
                  disabled={disabled}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>

            <hr className="my-4" />

            <button
              disabled={disabled}
              className={classNames('btn btn-outline-danger', {
                disabled,
              })}
              onClick={logout}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
