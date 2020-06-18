import {initialCompanyState} from "../domain/Company";

const companyReducer = (state = {
    company: initialCompanyState,
}, action : any) => {
    switch (action.type) {
        case 'SELECT':
            state = { ...state, company: action.payload };
            break;
        case 'CLEAR':
            state = {...state, company: initialCompanyState};
            break;
        default:
            break;
    };
    return state;
};

export default companyReducer;