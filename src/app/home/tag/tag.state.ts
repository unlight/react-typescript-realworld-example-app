import { createAction, createReducer } from '@reduxjs/toolkit';

import { AllState } from '../../types';

export const defaultState = {
    data: undefined as string[] | undefined,
    loading: true,
    error: undefined,
};

export type State = typeof defaultState;
export type ConnectedProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const tagsLoadInProgress = createAction('tagsLoadInProgress', (value: boolean) => {
    return {
        payload: value,
    };
});

export const tagsLoadSuccess = createAction('tagsLoadSuccess', (tags: string[]) => {
    return {
        payload: tags,
    };
});

export const tagsLoadError = createAction('tagsLoadError', (err: unknown) => {
    return {
        payload: err,
    };
});

export const loadTags = () => async (dispatch, getState) => {
    const apiBase = (getState() as AllState).config.apiBase;
    try {
        const response = await fetch(`${apiBase}/tags`);
        const body = await response.json();
        dispatch(tagsLoadSuccess(body.tags));
    } catch (e) {
        dispatch(tagsLoadError(e));
    }
};

export const tagReducer = createReducer(defaultState, {
    [tagsLoadInProgress.type]: (state, { payload }) => {
        state.loading = payload;
    },
    [tagsLoadSuccess.type]: (state, { payload }) => {
        state.error = undefined;
        state.data = payload;
        state.loading = false;
    },
    [tagsLoadError.type]: (state, { payload }) => {
        return { data: undefined, loading: false, error: payload };
    },
});

export function mapStateToProps(state: AllState) {
    return {
        tags: state.tag.data,
        loading: state.tag.loading,
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        requestLoadTags: () => {
            dispatch(loadTags());
        },
    };
}
