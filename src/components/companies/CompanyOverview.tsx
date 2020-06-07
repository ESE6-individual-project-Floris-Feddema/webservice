import {select} from "../../actions/CompanyActions";
import {Redirect, withRouter} from "react-router";
import {connect} from "react-redux";
import React, {useEffect, useState} from 'react';
import Company from "../../domain/Company";
import {
    Button,
    FormControl, IconButton,
    InputLabel,
    OutlinedInput,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip, withStyles
} from "@material-ui/core";
import './CompanyOverview.css'
import {Delete} from "@material-ui/icons";
import {GetCompany, UpdateCompany} from "../../networking/Company";
import {GetUser} from "../../networking/User";
import {Alert} from "@material-ui/lab";

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

const CompanyOverview = (props: any) => {
    const [company, setCompany] = useState<Company>(props.companyReducer.company);
    const [name, setName] = useState<string>(company.name);
    const [email, setEmail] = useState<string>('');
    const [notification, setNotification] = useState<JSX.Element>(<></>)

    const updateCompany = async () => {
        let result = await GetCompany(company.id);
        let json : Company = await result.json();
        props.select(json);
        setCompany(json);
    }

    useEffect(() => {
        updateCompany().then(() => {});
        // eslint-disable-next-line
    }, [])

    const onNameChange = (event : any) => {
        let newCompany = company;
        newCompany.name = event.target.value;
        setCompany(newCompany);

        setName(event.target.value)
    }

    const onSaveCompanyClick = async () => {
        if (company.name.length === 0) {
            return;
        }
        let response = await UpdateCompany(company);
        let json : Company = await response.json();
        props.select(json);
    }

    let nameForm = <form className={"company-details"}>
        <div className={"company-items"}>
            <FormControl variant={"outlined"} className={"email-input"}>
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                    error={false}
                    required={true}
                    type={"text"}
                    labelWidth={43}
                    value={name}
                    onChange={onNameChange}
                />
            </FormControl>
        </div>
        <div className={"company-items"}>
            <Button variant={"contained"} color={"primary"} size={"medium"} onClick={onSaveCompanyClick}>Save</Button>
        </div>
    </form>;


    const onEmailChange = (event : any) => {
        setEmail(event.target.value.toLowerCase());
    }

    const onAddUserClick = async () => {
        if (email.length === 0){
            return;
        }

        let result = await GetUser(email);
        if (result.status >= 400){
            let text = await result.text();
            setNotification( <Alert severity="error" className={"notification"} >
                {text}
            </Alert>)
        } else {
            let json = await result.json();
            setNotification( <Alert severity="success" className={"notification"} >
                {json.name} is added to the company!
            </Alert>)
            setEmail("");
        }
    }

    let userForm = <div className={"user-container"}>
        <TableContainer className={"user-table"} >
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell className={"column"}><b>Actions</b></StyledTableCell>
                        <StyledTableCell className={"column"}><b>Name</b></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {company.users.map((row) => (
                        <StyledTableRow key={row.userId} >
                            <StyledTableCell size="small">
                                <Tooltip  title={'Delete'}>
                                    <IconButton onClick={() => {console.log(row)}} size="small">
                                        <Delete/>
                                    </IconButton>
                                </Tooltip>
                            </StyledTableCell>
                            <StyledTableCell>{row.name}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <div className={"add-container"}>
            <div>
                <FormControl variant={"outlined"} className={"email-input"}>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                        error={false}
                        required={true}
                        type={"text"}
                        labelWidth={42}
                        value={email}
                        onChange={onEmailChange}
                    />
                </FormControl>
            </div>
            <div className={"company-items"}>
                <Button variant={"contained"} color={"primary"} size={"medium"} onClick={onAddUserClick}>Add</Button>
            </div>
        </div>
    </div>;

    let ownerContent;
    if (company.owner.userId === props.authReducer.user.id){
        ownerContent = <>{nameForm}{userForm}</>
    } else {
        ownerContent = <Redirect to={{pathname: '/companies'}}/>
    }

    return (
        <div className={"content"}>
            <h1>Details</h1>
            {notification}
            <div className={'content-container'}>
                {ownerContent}
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyOverview));