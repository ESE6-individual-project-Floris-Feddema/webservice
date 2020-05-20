import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import {login} from '../actions/AuthActions';
import config from '../config.json'
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@material-ui/core';
import './Login.css';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Alert} from "@material-ui/lab";
import User from "../Domain/User";

interface LoginUser {
    Email: string,
    Password: string,
}

const Login = (props : any) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(<div/>);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event : any) => {
        event.preventDefault();
    };

    const onEmailChange = (event : any) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event : any) => {
        setPassword(event.target.value);
    }

    const login = async () => {
        let user: LoginUser = {
            Email: email,
            Password: password
        }

        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        let response = await fetch(config.SERVICES.AUTHENTICATION + '/user/login', options);

        if (response.status === 200) {
            setError(<div/>)
            let responseUser = await response.json()
            props.login(responseUser.Token);
            props.history.push("/");
            return;
        }

        let errormsg = await response.text()
        setError(
            <Alert severity="error">
                {errormsg}
            </Alert>
        )
    };

    const googleResponse = async (response: any) => {
        if (!response.tokenId) {
            return;
        }
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify({tokenId: response.tokenId}),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        }
        let reqResponse = await fetch(config.SERVICES.AUTHENTICATION + '/user/login/google', options);

        if (reqResponse.status === 200) {
            let responseUser = await response.json()
            props.login(responseUser);
            props.history.push("/");
            return;
        }

        let errormsg = await reqResponse.text()
        setError(
            <Alert severity="error">{errormsg}</Alert>
        )
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
               <div className={"login-form"} >
                   <div className={"login-container"}>
                       <div className={"login-input"}>
                           <form >
                               {error}
                               <h2 style={{marginTop: "0px"}}>Log in</h2>
                               <div className={"login-field"}>
                                   <FormControl variant={"outlined"} fullWidth={true}>
                                       <InputLabel>Email</InputLabel>
                                       <OutlinedInput
                                           error={false}
                                           required={true}
                                           type={"text"}
                                           labelWidth={43}
                                           onChange={onEmailChange}
                                       />
                                   </FormControl>
                               </div>
                               <div className={"login-field"}>
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
                                           onChange={onPasswordChange}
                                           labelWidth={70}
                                           fullWidth={true}
                                       />
                                   </FormControl>
                               </div>
                               <div>
                                   <Button variant={"contained"} size={"large"} onClick={login}>Login</Button>
                               </div>
                           </form>
                       </div>
                       <div className={"oauth-input login-input"}>
                           <GoogleLogin className={"login-field"}
                                        clientId={config.GOOGLE_CLIENT_ID}
                                        buttonText='Google Login'
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
        login: (user :User) => {
            dispatch(login(user));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
