import Company from "../domain/Company";

export function clear() {
    return {
        type: 'CLEAR',
        payload: ''
    }
}

export function select(company : Company) {
    return {
        type: 'SELECT',
        payload: company
    };
}
