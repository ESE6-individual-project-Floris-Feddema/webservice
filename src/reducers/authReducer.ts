import {initialUserState} from "../domain/User";

const authReducer = (state = {
    user: initialUserState,
    isAuthenticated: false
}, action : any) => {
    switch (action.type) {
        case 'LOGIN':
            state = { ...state, user: action.payload, isAuthenticated: true };
            break;
        case 'LOGOUT':
            state = { ...state, user: initialUserState, isAuthenticated: false };
            break;
        default:
            break;
    };
    return state;
};

export default authReducer;