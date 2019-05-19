import types from 'src/Reducers/profile/types';
import UserApi from "./api";

const logIn = user => dispatch => {
    dispatch({
        type: types.LOGIN,
        vkUser: user,
    });

    return UserApi
        .getUserByVkId(user.id)
        .then(({data}) => dispatch({
            type: types.LOGGED_IN,
            internalUser: data,
        }))
        .catch(e => {
            if (e.response && e.response.status === 404) { // user not registered
                dispatch({
                    type: types.REGISTER
                });

                return UserApi
                    .createPerson({
                        vkId: user.id,
                        firstName: user.first_name,
                        lastName: user.last_name,
                    })
                    .then(({data}) => dispatch({
                        type: types.REGISTERED,
                        internalUser: data,
                    }))
                    .catch(e => {
                        console.error(e);
                        dispatch({
                            type: types.LOGIN_FAILURE
                        });
                    })
            } else {
                console.error('Unknown error', e);
                dispatch({
                    type: types.LOGIN_FAILURE
                });
                throw e;
            }
        })
};

export {
    logIn,
};