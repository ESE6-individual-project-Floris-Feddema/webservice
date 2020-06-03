export default interface User {
    id: string
    name: string,
    email: string,
    token: string
}

export const initialUserState : User = {
    id: '',
    name: '',
    email: '',
    token: '',
}
