import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import {logout} from '../actions/AuthActions';

function Logout (this : any) {

    return (
        <div><Redirect to={{
            pathname: '/'
        }}/></div>
    );
}

const mapStateToProps = (state : any) => {
    return {
        authReducer: state.authReducer
    };
};

const mapDispatchToProps = (dispatch : any) => {
    return {
        login: () => {
            dispatch(logout());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
