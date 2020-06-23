import WorkDay from "./WorkDay";

export default interface Planning {
    id: string,
    companyId: string,
    name: string,
    startDate: Date,
    endDate: Date,
    workDays: WorkDay[]
}

export const initialPlanningState : Planning = {
    companyId: "",
    endDate: new Date(1900, 1, 1),
    id: "",
    name: "",
    startDate: new Date(1900, 1, 1),
    workDays: []

}