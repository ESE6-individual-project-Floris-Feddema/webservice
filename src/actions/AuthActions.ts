export function login(token : any) {
    return (dispath: any) => {
        dispath({
            type: 'LOGIN',
            payload: token
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
