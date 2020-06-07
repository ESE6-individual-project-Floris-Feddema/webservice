import CompanyUser from "../../domain/CompanyUser";

export default interface CreateCompanyObject {
    name: string,
    owner: CompanyUser,
}