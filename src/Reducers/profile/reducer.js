import Immutable from 'seamless-immutable';
import types from './types';

const initialState = Immutable({
    user: null,
    vk: null,
    isLogging: true,
    isRegistering: false,
    finishedOnboarding: true,
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
                finishedOnboarding: false,
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
        case 'FINISH_ONBOARDING':
            return state.merge({
                isLogging: false,
                finishedOnboarding: true,
            });
        default:
            return state;
    }
};