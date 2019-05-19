import Immutable from 'seamless-immutable';
import types from './types';

const initialState = Immutable({
    user: null,
    vk: null,
    isLogging: true,
    isRegistering: false,
});

export default (state = initialState, action) => {
    switch(action.type) {
        case types.REGISTER:
            return state.merge({
                isLogging: true
            });
        case types.REGISTERED:
            return state.merge({
                isLogging: false,
                user: action.internalUser,
            });
        case types.LOGIN:
            return state.merge({
                isLogging: true,
                vk: action.vkUser,
            });
        case types.LOGGED_IN:
            return state.merge({
                isLogging: false,
                user: action.internalUser,
            });
        default:
            return state;
    }
};