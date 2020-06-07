import config from "../config.json";
import LoginUser from "./domain/LoginUser";

export const LoginGoogle = async (tokenid: string) => {
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify({tokenId: tokenid}),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.AUTHENTICATION + '/user/login/google', options);
}

export const LoginPassword = async (user: LoginUser) => {
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
    }
    return await fetch(config.SERVICES.AUTHENTICATION + '/user/login', options);

}