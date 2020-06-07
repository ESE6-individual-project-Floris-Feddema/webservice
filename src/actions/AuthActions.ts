import User from "../domain/User";

export function login(user : User) {
    return {
        type: 'LOGIN',
        payload: user
    };
}

export function logout() {
    return {
        type: 'LOGOUT',
        payload: ``
    };
}
