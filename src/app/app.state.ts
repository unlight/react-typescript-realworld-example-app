import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers, createStore, Reducer } from 'redux';

export const history = createBrowserHistory();

const createReducer = (asyncReducers) => {
    return combineReducers({
        router: connectRouter(history),
        ...asyncReducers,
    });
};

const asyncReducers: Record<string, any> = {};

export const store = createStore(createReducer({}));

export const injectReducer = (key: string, reducer: Reducer) => {
    asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(asyncReducers));
    return store;
};

export const injectReducers = (reducers: Record<string, Reducer>) => {};
