import React, {useEffect, useState} from 'react';
import './Companies.css'
import {UserCompanies} from "../networking/Company";
import User from "../domain/User";
import {login} from "../actions/AuthActions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    LinearProgress,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, withStyles
} from "@material-ui/core";
import Company from "../domain/Company";
import { Delete, HowToReg } from '@material-ui/icons'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const Companies = (props: any) =>  {
    const [companies, setCompanies] = useState<Company[]>([])
    const [removeOpen, setRemoveOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company>();

    useEffect(() => {
        const getCompanies = async () => {
            let userId = props.authReducer.user.id;
            let response = await UserCompanies(userId);
            let json : Company[] = await response.json();
            setCompanies(json);
        }
        getCompanies()
        // eslint-disable-next-line
    }, [])

    const handleRemoveDialogClose = () => {
        setRemoveOpen(false);
    }

    const ReallyRemoveCompany = () => {
        handleRemoveDialogClose();
    }

    const UseCompany = (company: Company) => {
        return null;
    }

    const RemoveCompany = (company: Company) => {
        setRemoveOpen(true);
        setSelectedCompany(company);
        return null;
    }

    let removeDialog = <Dialog
        open={removeOpen}
        onClose={handleRemoveDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Do you really want to completely remove the whole company and all of the associated data?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleRemoveDialogClose} color="primary">
                Disagree
            </Button>
            <Button onClick={ReallyRemoveCompany} color="primary" autoFocus>
                Agree
            </Button>
        </DialogActions>
    </Dialog>;


    let content;

    if (companies.length === 0){
        content = <div className={"loader"}>
            <LinearProgress />
        </div>;
    } else {
        content =
            <TableContainer >
                <Table className={"table"}  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><b>Actions</b></StyledTableCell>
                            <StyledTableCell><b>Name</b></StyledTableCell>
                            <StyledTableCell><b>Owner</b></StyledTableCell>
                            <StyledTableCell><b>Users</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((row) => (
                            <StyledTableRow  key={row.ID} >
                                <StyledTableCell>
                                    <IconButton onClick={() => {UseCompany(row)}}>
                                        <HowToReg/>
                                    </IconButton>
                                    { props.authReducer.user.id === row.Owner.userId &&
                                    <IconButton onClick={() => {RemoveCompany(row)}}>
                                        <Delete/>
                                    </IconButton>
                                    }
                                </StyledTableCell>
                                <StyledTableCell>{row.Name}</StyledTableCell>
                                <StyledTableCell>{row.Owner.name}</StyledTableCell>
                                <StyledTableCell>{row.Users.length}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>;
    }

    return (
        <div className={"content"}>
            {removeDialog}
            {content}
        </div>
    );
}

const mapStateToProps = (state : any) => {
    return {
        authReducer: state.authReducer,
        companyReducer: state.companyReducer
    };
};

const mapDispatchToProps = (dispatch : any) => {
    return {
        login: (user :User) => {
            dispatch(login(user));
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Companies));
