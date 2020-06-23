import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import {logout} from '../../reducers/actions/AuthActions';
import {clear} from "../../reducers/actions/CompanyActions";

function Logout (props : any) {
    props.clearStore();
    props.logout();
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
        logout: () => {
            dispatch(logout());
        },
        clearStore: () => {
            dispatch(clear());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
