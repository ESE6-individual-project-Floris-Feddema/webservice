import config from "../config.json";
import RegisterUser from "./domain/RegisterUser";

export const RegisterGoogle = async (tokenid: string) => {
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify({tokenId: tokenid}),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.AUTHENTICATION + '/user/google', options);
}

export const RegisterPassword = async (user : RegisterUser) => {
    const options : RequestInit = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
    }
    return await fetch(config.SERVICES.AUTHENTICATION + '/user', options);

}