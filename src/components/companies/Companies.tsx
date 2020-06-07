import React, {useEffect, useState} from 'react';
import './Companies.css'
import {UserCompanies, DeleteCompany, CreateCompany} from "../../networking/Company";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,
    IconButton, InputLabel,
    LinearProgress, OutlinedInput,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip, withStyles
} from "@material-ui/core";
import Company, {initialCompanyState} from "../../domain/Company";
import {Delete, HowToReg} from '@material-ui/icons'
import {Alert} from "@material-ui/lab";
import {select} from "../../actions/CompanyActions";
import CreateCompanyObject from "../../networking/domain/CreateCompanyObject";
import CompanyUser from "../../domain/CompanyUser";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 12,
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
    const [removeOpen, setRemoveOpen] = useState<boolean>(false);
    const [selectedCompany, setSelectedCompany] = useState<Company>(initialCompanyState);
    const [error, setError] = useState<JSX.Element>(<></>);
    const [companyName, setCompanyName] = useState<string>('');

    const getCompanies = async () => {
        let userId = props.authReducer.user.id;
        let response = await UserCompanies(userId);
        let json : Company[] = await response.json();
        setCompanies(json);
    }

    useEffect(() => {
        getCompanies().then(() => {})
        // eslint-disable-next-line
    }, [])

    const handleRemoveDialogClose = () => {
        setRemoveOpen(false);
    }

    const ReallyRemoveCompany = async () => {
        let response = await DeleteCompany(selectedCompany.id);

        if (response.status === 200) {
            setError(<></>)
            return;
        }

        let errormsg = await response.text()
        setError(
            <Alert severity="error">
                {errormsg}
            </Alert>
        )

        setCompanies([])
        handleRemoveDialogClose();
        await getCompanies()
    }

    const UseCompany = (company: Company) => {
        props.select(company);
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
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Remove company?"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Do you really want to completely remove the whole company and all of the associated data?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleRemoveDialogClose} color="primary">
                No
            </Button>
            <Button onClick={ReallyRemoveCompany} color="primary" autoFocus>
                Yes
            </Button>
        </DialogActions>
    </Dialog>;

    const addCompany = async () => {
        if (companyName.length === 0) {
            return;
        }
        let user: CompanyUser = {
            userId: props.authReducer.user.id,
            name: props.authReducer.user.name
        }
        let company: CreateCompanyObject = {
            name: companyName,
            owner: user
        }
        await CreateCompany(company);
        await getCompanies();
    }

    const onNameChange = (event : any) => {
        setCompanyName(event.target.value);
    }

    let newCompany = <form>
        <div className={"create-field"}>
            <FormControl className={"name-item"}  variant={"outlined"}>
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                    error={false}
                    required={true}
                    type={"text"}
                    labelWidth={43}
                    onChange={onNameChange}
                />
            </FormControl>
            <Button className={"button-item"} variant={"contained"} color={"primary"} onClick={addCompany}>Create</Button>
        </div>
    </form>;

    let companyList;
    if (companies.length === 0){
        companyList = <div className={"loader"}>
            <LinearProgress />
        </div>;
    } else {
        companyList =
            <TableContainer >
                <Table className={"table"}  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><b>Actions</b></StyledTableCell>
                            <StyledTableCell><b>Name</b></StyledTableCell>
                            <StyledTableCell><b>Owner</b></StyledTableCell>
                            <StyledTableCell><b>Employees</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((row) => (
                            <StyledTableRow  key={row.id} >
                                <StyledTableCell size="small">
                                    <Tooltip  title={'Default'}>
                                        <IconButton onClick={() => {UseCompany(row)}} size="small">
                                            <HowToReg/>
                                        </IconButton>
                                    </Tooltip>
                                    { props.authReducer.user.id === row.owner.userId &&
                                    <Tooltip title={'Remove'}>
                                        <IconButton onClick={() => {RemoveCompany(row)}} size="small">
                                            <Delete/>
                                        </IconButton>
                                    </Tooltip>
                                    }
                                </StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.owner.name}</StyledTableCell>
                                <StyledTableCell>{row.users.length}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>;
    }


    return (
        <div className={"content"}>
            {error}
            {removeDialog}
            {newCompany}
            {companyList}
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
        select: (company :Company) => {
            dispatch(select(company));
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Companies));
