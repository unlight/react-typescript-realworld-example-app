import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import thunk from 'redux-thunk';

import { reduxMiddleware } from '../environments/environment';
import { config } from './app.config';

export const history = createBrowserHistory();

const createReducer = (reducers: Record<string, Reducer>) => {
    return combineReducers({
        router: connectRouter(history),
        config: () => config,
        ...reducers,
    });
};

let asyncReducers: Record<string, any> = {};

export const store = createStore(createReducer({}), applyMiddleware(thunk, ...reduxMiddleware));

export type AppState = ReturnType<typeof store['getState']>;

export const injectReducers = (reducers: Record<string, Reducer>) => {
    asyncReducers = {
        ...asyncReducers,
        ...reducers,
    };
    store.replaceReducer(createReducer(asyncReducers));
};
