import config from "../config.json";
import CreateCompanyObject from "./domain/CreateCompanyObject";
import Company from "../domain/Company";
import CompanyUser from "../domain/CompanyUser";
import User from "../domain/User";

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

export const DeleteCompanyUser = async (company: Company, user: CompanyUser) => {
    const options: RequestInit= {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.COMPANY + '/user/' + company.id + '/' + user.userId, options)

}

export const AddCompanyUser = async (company: Company, user: User) => {
    const options: RequestInit= {
        method: 'POST',
        body: JSON.stringify({userId: user.id, name: user.name}),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.COMPANY + '/user/' + company.id, options)

}