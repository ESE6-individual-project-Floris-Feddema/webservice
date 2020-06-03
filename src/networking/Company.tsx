import config from "../config.json";

export const UserCompanies = async (userId: string) => {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.COMPANY + '/user/' + userId, options);
}