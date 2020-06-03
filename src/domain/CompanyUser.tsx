export default interface CompanyUser {
    UserId: string,
    Name: string
}

export const initialCompanyUserState : CompanyUser = {
    Name: '',
    UserId: '',
}