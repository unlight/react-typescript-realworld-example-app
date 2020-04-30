import { Middleware } from 'redux';
import logger from 'redux-logger';

import { AllState } from '../app/types';

export const production = false;

const noop: Middleware<any, AllState, any> = (store) => (next) => (action) => {
    return next(action);
};

export const reduxMiddleware: Middleware<any, any, any>[] = [noop, logger];
