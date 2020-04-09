import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {AppBar, createStyles, IconButton, Menu, MenuItem, Theme, Toolbar, Typography} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {login, logout} from "../actions/AuthActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // flexGrow: 1,
            background: '#ebf0ff',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            paddingLeft: '200px',
            marginRight: '50px',
            color: 'gray',
        },
        subtitle: {
            padding: '10px',
            color: 'gray',
        },
        barSplit: {
            flexGrow: 1,
        },
        text: {
            color: 'Gray',
        },
        largeIcon: {
            width: 40,
            height: 40,
            color: 'Gray'
        },
        navLink: {
            textDecoration: 'none',
        },
        }));

const TopNavigation = (props : any) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        //TODO add login method
        console.log("☠☠ we lost u ☠☠")
        props.logout();
    };

    let profile;
    if (props.auth.isAuthenticated || true){
        profile = (<div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                className={classes.text}
                size={"small"}
            >
                <AccountCircle
                    className={classes.largeIcon}
                />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>);
    }

    let barLogin;
    if (props.auth.isAuthenticated || true) {

    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.root} position="static">
                <Toolbar>
                    <NavLink className={classes.navLink} to='/'>
                        <h1 className={classes.title} >
                            Plandar
                        </h1>
                    </NavLink>
                    <NavLink exact className={classes.navLink} to='/login'>
                        <h3 className={classes.subtitle} >
                            Log in
                        </h3>
                    </NavLink>
                    <NavLink exact className={classes.navLink} to='/register'>
                        <h3 className={classes.subtitle} >
                            Sign up
                        </h3>
                    </NavLink>
                    <div className={classes.barSplit}/>
                    {profile}
                </Toolbar>
            </AppBar>
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
        logout: () => {
            dispatch(logout());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNavigation));
