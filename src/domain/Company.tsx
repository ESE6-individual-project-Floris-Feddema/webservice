import CompanyUser, {initialCompanyUserState} from "./CompanyUser";

export default interface Company {
    ID: string,
    Name: string,
    Owner: CompanyUser,
    Users: CompanyUser[]
}

export const initialCompanyState : Company = {
    ID: "",
    Name: "",
    Owner: initialCompanyUserState,
    Users: []
}