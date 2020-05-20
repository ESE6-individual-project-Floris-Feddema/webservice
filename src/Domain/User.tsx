export default interface User {
    Id: string
    Name: string,
    Email: string,
    Token: string
}

export const initialUserState : User = {
    Id: '',
    Name: '',
    Email: '',
    Token: '',
}
