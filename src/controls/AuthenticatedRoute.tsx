import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from "react-redux";

// @ts-ignore
const AuthenticatedRoute = ({Component, authReducer ,...rest}) => {
    return (
        <Route  {...rest}
                render ={(props) =>
                    authReducer.isAuthenticated === true ?
                        <Component {...props}/> :
                        <Redirect to={"/"}/>}
        />
    );
};

const mapStateToProps = (state : any) => {
    return {
        authReducer: state.authReducer
    };
};

export default connect(mapStateToProps)(AuthenticatedRoute);