import CompanyUser, {initialCompanyUserState} from "./CompanyUser";

export default interface Company {
    Id: string,
    Name: string,
    Owner: CompanyUser,
    Users: CompanyUser[]
}

export const initialCompanyState : Company = {
    Id: "",
    Name: "",
    Owner: initialCompanyUserState,
    Users: []
}