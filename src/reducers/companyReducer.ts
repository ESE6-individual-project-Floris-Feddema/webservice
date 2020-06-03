import {initialCompanyState} from "../domain/Company";

const companyReducer = (state = {
    company: initialCompanyState,
}, action : any) => {
    switch (action.type) {
        case 'SET_COMPANY':
            state = { ...state, company: action.payload };
            break;
        default:
            break;
    };
    return state;
};

export default companyReducer;