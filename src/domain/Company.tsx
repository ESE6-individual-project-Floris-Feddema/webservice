import CompanyUser, {initialCompanyUserState} from "./CompanyUser";

export default interface Company {
    id: string,
    name: string,
    owner: CompanyUser,
    users: CompanyUser[]
}

export const initialCompanyState : Company = {
    id: "",
    name: "",
    owner: initialCompanyUserState,
    users: []
}