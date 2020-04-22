import jwt from 'jsonwebtoken';

export function UserIsValid(token : any) {
    console.log('the token is ' + token.user);
    if (token.isAuthenticated) {
        let decodedToken = jwt.decode(token.user);
        let dateNow = new Date();
        if (5 > dateNow.getTime() / 1000) return true;
        else return false;
    }
    return false;
}