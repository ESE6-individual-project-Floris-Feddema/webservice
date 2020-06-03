import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from "react-redux";

// @ts-ignore
const AuthenticatedRoute = ({Component, auth ,...rest}) => {
    return (
        <Route  {...rest}
                render ={(props) =>
                    auth.isAuthenticated === true ?
                        <Component {...props}/> :
                        <Redirect to={"/"}/>}
        />
    );
};

const mapStateToProps = (state : any) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(AuthenticatedRoute);