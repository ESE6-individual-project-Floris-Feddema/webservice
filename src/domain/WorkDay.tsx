import AvailabilitySlot from "./AvailabilitySlot";

export default interface WorkDay {
    id: string,
    date: Date,
    slots: AvailabilitySlot[]
}