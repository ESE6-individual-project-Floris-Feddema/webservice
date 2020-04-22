import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import {login} from '../actions/AuthActions';
import config from '../config.json'
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@material-ui/core';
import './Register.css';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Alert} from "@material-ui/lab";

interface RegisterUser {
    Email: string,
    Password: string
}

const Register = (props : any) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordRepeat, setPasswordRepeat] = React.useState('');
    const [error, setError] = React.useState(<div/>);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordRepeat = () => {
        setShowPasswordRepeat(!showPasswordRepeat);
    };

    const handleMouseDownPassword = (event : any) => {
        event.preventDefault();
    };

    const validateInput = (): boolean => {
        //check if passwords are the same
        if (password !== passwordRepeat){
            setError(
                <Alert severity="error">The passwords do not match</Alert>
            )
            return false;
        }

        //checks if the given password meets criteria
        let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,32}$/;
        if (!password.match(reg)){
            setError(
                <Alert severity="error">The password does not meet the criteria</Alert>
            )
            return false;
        }

        //checks if the given email is valid
        reg = /b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/;
        if (!email.match(reg)){
            setError(
                <Alert severity="error">The email is not valid</Alert>
            )
            return false;
        }
        return true;
    }

    const register = async () => {
        if (!validateInput()) {
            return;
        }

        let user : RegisterUser = {
            Email: email,
            Password: password
        }

        const options : RequestInit = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        }
        let response = await fetch(config.SERVICES.AUTHENTICATION + "/authentication", options);

        if (response.status === 200){
            props.history.push("/");
        }

        let errormsg = await response.body
        setError(
            <Alert severity="error">{errormsg}</Alert>
        )
    };

    const googleResponse = async (response : any) => {
        if (!response.tokenId) {
            return;
        }

        const options : RequestInit = {
            method: 'POST',
            body: JSON.stringify({ tokenId: response.tokenId }),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        }
        let reqResponse = await fetch(config.SERVICES.AUTHENTICATION + "/authentication/google", options);

        if (reqResponse.status === 200){
            props.history.push("/");
        }

        let errormsg = await reqResponse.body
        setError(
            <Alert severity="error">{errormsg}</Alert>
        )
    };

    const onEmailChange = (event : any) => {
        setEmail(event.value);
    }

    const onPasswordChange = (event : any) => {
        setPassword(event.value);
    }

    const onPasswordRepeatChange = (event : any) => {
        setPasswordRepeat(event.value);
    }

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
                                {error}
                                <h2 style={{marginTop: "0px"}}>Sign up</h2>
                                <div className={"register-field"}>
                                    <FormControl variant={"outlined"} fullWidth={true}>
                                        <InputLabel>Email</InputLabel>
                                        <OutlinedInput
                                            error={false}
                                            required={true}
                                            type={"text"}
                                            labelWidth={120}
                                            value={email}
                                            onChange={onEmailChange}
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
                                            onChange={onPasswordChange}
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
                                            onChange={onPasswordRepeatChange}
                                        />
                                    </FormControl>
                                </div>
                                <div>
                                    <Button variant={"contained"} size={"large"} onClick={register}>Register</Button>
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
