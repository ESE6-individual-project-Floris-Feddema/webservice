import config from "../config.json";

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