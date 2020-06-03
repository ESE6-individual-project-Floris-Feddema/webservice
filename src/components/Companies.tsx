import React, {useEffect, useState} from 'react';
import './Companies.css'
import {UserCompanies} from "../networking/Company";
import User from "../domain/User";
import {login} from "../actions/AuthActions";
import {withRouter} from "react-router";
import {connect} from "react-redux";

const Companies = (props: any) =>  {
    const [companies, setCompanies] = useState()

    useEffect(() => {
        const getCompanies = async () => {
            let userId = props.authReducer.user.id;
            let response = await UserCompanies(userId);
            let json = await response.json();
            setCompanies(json);
        }

        getCompanies()
    })



    return (
        <div className={"content"}>HIER KOMEN COMPANIES</div>
    );
}

const mapStateToProps = (state : any) => {
    return {
        authReducer: state.authReducer,
        companyReducer: state.companyReducer
    };
};

const mapDispatchToProps = (dispatch : any) => {
    return {
        login: (user :User) => {
            dispatch(login(user));
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Companies));
