export default interface CompanyUser {
    userId: string,
    name: string
}

export const initialCompanyUserState : CompanyUser = {
    userId: '',
    name: '',
}