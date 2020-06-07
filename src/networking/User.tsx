import config from "../config.json";

export const GetUser = async (email: string) => {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.AUTHENTICATION + '/user/' + email, options);
}