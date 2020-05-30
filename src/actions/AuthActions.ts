import User from "../domain/User";

export function login(user : User) {
    return (dispath: any) => {
        dispath({
            type: 'LOGIN',
            payload: user
        });
    }
}

export function logout() {
    return (dispath: any) => {
        dispath({
            type: 'LOGOUT',
            payload: ``
        });
    };
}
