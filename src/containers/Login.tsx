import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import {login} from '../actions/AuthActions';
import config from '../config.json'
// import MicrosoftLogin from "react-microsoft-login";

const Login = (props : any) => {
    let googleResponse = (response : any) => {
        if (!response.tokenId) {
            console.error('Unable to get tokenId from Google', response);
            return;
        }

        fetch(config.GOOGLE_AUTH_CALLBACK_URL, {
            method: 'POST',
            body: JSON.stringify({ tokenId: response.tokenId }),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        })
            .then(r => {
                r.json().then(user => {
                    const token = user.token;
                    // console.log(token);
                    props.login(token);
                });
            })
    };

    // let microsoftResponse = (err : any, data : any) => {
    //     console.log(data);
    //     console.log(err);
    // };


    let content = props.auth.isAuthenticated ?
        (
            <div>
                <Redirect to={{
                    pathname: '/'
                }} />
            </div>
        ) :
        (
            <div>
                <GoogleLogin
                    clientId={config.GOOGLE_CLIENT_ID}
                    buttonText='Google Login'
                    onSuccess={googleResponse}
                    onFailure={googleResponse}
                />
                {/*<MicrosoftLogin*/}
                {/*    clientId={config.MICROSOFT_CLIENT_ID}*/}
                {/*    authCallback={microsoftResponse}*/}
                {/*    redirectUri={config.MICROSOFT_CALLBACK_URL}*/}
                {/*/>*/}

            </div>
        );

    return (
        <div><h1>Login</h1>
            {content}
        </div>
    );
};

const mapStateToProps = (state : any) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch : any) => {
    return {
        login: (token :any) => {
            dispatch(login(token));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
