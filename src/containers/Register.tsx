import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import {login} from '../actions/AuthActions';
import config from '../config.json'
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@material-ui/core';
import './Register.css';
import {Visibility, VisibilityOff} from "@material-ui/icons";

const Register = (props : any) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordRepeat = () => {
        setShowPasswordRepeat(!showPasswordRepeat);
    };

    const handleMouseDownPassword = (event : any) => {
        event.preventDefault();
    };

    const login = () => {
        //TODO add login method
        const token = "🔥🔥lit hackerman🔥🔥";
        props.login(token);
    };

    const googleResponse = (response : any) => {
        if (!response.tokenId) {
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
                    props.login(token);
                });
            })
    };

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
                <div className={"register-form"} >
                    <div className={"register-container"}>
                        <div className={"register-input"}>
                            <form >
                                <h2 style={{marginTop: "0px"}}>Sign up</h2>
                                <div className={"register-field"}>
                                    <FormControl variant={"outlined"} fullWidth={true}>
                                        <InputLabel>Naam</InputLabel>
                                        <OutlinedInput
                                            error={false}
                                            required={true}
                                            type={"text"}
                                            labelWidth={120}
                                        />
                                    </FormControl>
                                </div>
                                <div className={"register-field"}>
                                    <FormControl variant={"outlined"} fullWidth={true}>
                                        <InputLabel>Email</InputLabel>
                                        <OutlinedInput
                                            error={false}
                                            required={true}
                                            type={"text"}
                                            labelWidth={120}
                                        />
                                    </FormControl>
                                </div>
                                <div className={"register-field"}>
                                    <FormControl variant={"outlined"} fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            error={false}
                                            required={true}
                                            type={showPassword ? "text" : "password"}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={70}
                                            fullWidth={true}
                                        />
                                    </FormControl>
                                </div>
                                <div className={"register-field"}>
                                    <FormControl variant={"outlined"} fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            error={false}
                                            required={true}
                                            type={showPasswordRepeat ? "text" : "password"}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPasswordRepeat}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPasswordRepeat ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={70}
                                            fullWidth={true}
                                        />
                                    </FormControl>
                                </div>
                                <div>
                                    <Button variant={"contained"} size={"large"} onClick={login}>Register</Button>
                                </div>
                            </form>
                        </div>
                        <div className={"oauth-input register-input"}>
                            <GoogleLogin className={"register-field"}
                                         clientId={config.GOOGLE_CLIENT_ID}
                                         buttonText='Google Register'
                                         onSuccess={googleResponse}
                                         onFailure={googleResponse}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );

    return (
        <div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
