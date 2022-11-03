import { UserCreateInput } from '@application/user';
import React from 'react';
import { FieldError } from 'react-hook-form';
import { Link } from 'react-router-dom';

type RegisterViewProps = {
  errors: {
    [K in keyof UserCreateInput]?: FieldError;
  };
  onSubmit: React.FormEventHandler;
  register: (k: keyof UserCreateInput) => any;
  serverErrorMessage: string;
};

export function RegisterView(props: RegisterViewProps): JSX.Element {
  const { errors, onSubmit, register, serverErrorMessage } = props;
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center font-bold">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>
            <form onSubmit={onSubmit}>
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
              {serverErrorMessage && (
                <p className="error-messages">{serverErrorMessage}</p>
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
