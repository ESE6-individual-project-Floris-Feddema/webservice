import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import {login} from '../actions/AuthActions';
import config from '../config.json'
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@material-ui/core';
import './Login.css';
import {Visibility, VisibilityOff} from "@material-ui/icons";

const Login = (props : any) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
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

        fetch(config.SERVICES.AUTHENTICATION + '/authentication/google"', {
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
               <div className={"login-form"} >
                   <div className={"login-container"}>
                       <div className={"login-input"}>
                           <form >
                               <h2 style={{marginTop: "0px"}}>Log in</h2>
                               <div className={"login-field"}>
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
        login: (token :any) => {
            dispatch(login(token));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
