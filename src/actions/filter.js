import * as types from '../actions/actionType';

// action creator
export function setFilter(filter) {
    return {
        type: types.SET_FILTER,
        filter
    };
}
