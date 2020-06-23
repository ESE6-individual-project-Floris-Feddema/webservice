import WorkDay from "../../domain/WorkDay";

export default interface CreatePlanningObject {
    companyId: string,
    name: string,
    startDate: Date,
    endDate: Date,
    workDays: WorkDay[]
}