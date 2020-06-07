import config from "../config.json";
import CreateCompanyObject from "./domain/CreateCompanyObject";
import Company from "../domain/Company";

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

export const DeleteCompany = async (companyId: string) => {
    const options: RequestInit = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.COMPANY + '/company/' + companyId, options);
}

export const GetCompany = async (companyId: string) => {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.COMPANY + '/company/' + companyId, options);
}

export const CreateCompany = async (company: CreateCompanyObject) => {
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(company),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.COMPANY + '/company', options)
}

export const UpdateCompany = async (company: Company) => {
    const options: RequestInit= {
        method: 'PUT',
        body: JSON.stringify(company),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.COMPANY + '/company/' + company.id, options)

}