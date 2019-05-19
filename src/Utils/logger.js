const excludedActionTypes = new Set([

]);

const logger = excludedTypes => store => next => action => {
    if (excludedTypes.has(action.type)) {
        return next(action);
    }

    console.log("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    return result;
};

export default logger(excludedActionTypes);
