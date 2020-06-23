import config from "../config.json";
import CreatePlanningObject from "./domain/CreatePlanningObject";

export const CompanyPlannings = async (companyId: string) => {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.aPLANNING.GETALLCOMPANYPLANNING + companyId, options);
}

export const DeletePlanning = async (planningId: string, companyId: string) => {
    const options: RequestInit = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.aPLANNING.DELETEPLANNING + companyId + "/" + planningId, options);
}

export const CreatePlanning = async (planning: CreatePlanningObject) => {
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(planning),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
    return await fetch(config.SERVICES.aPLANNING.CREATEPLANNING, options)
}
