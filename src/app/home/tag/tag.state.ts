import { createReducer } from '@reduxjs/toolkit';

import { AllState } from '../../types';
import { loadTags, tagsLoadError, tagsLoadInProgress, tagsLoadSuccess } from './tag.actions';

export const defaultState = {
    data: undefined as string[] | undefined,
    loading: true,
    error: undefined,
};

export type State = typeof defaultState;

export type ConnectedProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

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
