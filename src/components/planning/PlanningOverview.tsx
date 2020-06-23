import React, {useEffect, useState} from 'react';
import './PlanningOverview.css'
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Planning, {initialPlanningState} from '../../domain/Planning';
import {CompanyPlannings, CreatePlanning, DeletePlanning} from "../../networking/Planning";
import {Alert} from "@material-ui/lab";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, IconButton,
    InputLabel,
    LinearProgress,
    OutlinedInput,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip, withStyles
} from "@material-ui/core";
import CreatePlanningObject from "../../networking/domain/CreatePlanningObject";
import {Delete} from "@material-ui/icons";
import {KeyboardDatePicker} from "@material-ui/pickers";
import WorkDay from "../../domain/WorkDay";
import CreateWorkDayView from "../../domain/CreateWorkDayView";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 12,
    },
}))(TableCell);

const StyledSmallTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 10,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const PlanningOverview = (props: any) => {
    const [plannings, setPlannings] = useState<Planning[]>([])
    const [error, setError] = useState<JSX.Element>(<></>);
    const [removeOpen, setRemoveOpen] = useState<boolean>(false);
    const [selectedPlanning, setSelectedPlanning] = useState<Planning>(initialPlanningState);
    const [planningName, setPlanningName] = useState<string>('');
    const [planningStart, setPlanningStart] = useState<Date>(new Date(Date.now()));
    const [planningEnd, setPlanningEnd] = useState<Date>(new Date(Date.now() + 1123200000));
    const [workdays, setWorkdays] = useState<CreateWorkDayView[]>([]);

    const getPlannings = async () => {
        let response = await CompanyPlannings(props.companyReducer.company.id);
        let json : Planning[] = await response.json();
        setPlannings(json);
    }

    useEffect(() => {
        getPlannings().then(() => {})
        // eslint-disable-next-line
    }, [])

    const handleRemoveDialogClose = () => {
        setRemoveOpen(false);
    }

    const setWorkDayView = () => {
        let days = getDaysArray(planningStart, planningEnd);
        let list : CreateWorkDayView[] = []
        for (let i = 0; i <= days.length -1; i++) {
            list.push({
                active: true,
                date: days[i]
            });
        }
        setWorkdays(list);
        console.log(list);
    }

    const ReallyRemovePlanning = async () => {
        let response = await DeletePlanning(selectedPlanning.id, props.companyReducer.company.id);

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

        setPlannings([])
        handleRemoveDialogClose();
        await getPlannings()
    }

    const RemovePlanning = (planning: Planning) => {
        setRemoveOpen(true);
        setSelectedPlanning(planning);
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
                Do you really want to completely remove the whole planning and all of the associated data?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleRemoveDialogClose} color="primary">
                No
            </Button>
            <Button onClick={ReallyRemovePlanning} color="primary" autoFocus>
                Yes
            </Button>
        </DialogActions>
    </Dialog>;

    const AddPlanning = async () => {
        setWorkDayView();
        let planning: CreatePlanningObject = {
            companyId: props.companyReducer.company.id,
            endDate: planningEnd,
            name: planningName,
            startDate: planningStart,
            //TODO WORKDAYS
            workDays: []
        }
        console.log(planning)
        // let response = await CreatePlanning(planning);
        // if (response.status === 200) {
        //     setError(<></>)
        //     // await getPlannings();
        //     return;
        // }
        //
        // let errormsg = await response.text()
        // setError(
        //     <Alert severity="error">
        //         {errormsg}
        //     </Alert>
        // )
    }

    let getDaysArray = function(start : Date, end : Date) {
        let arr=[];
        for(let dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        return arr;
    };

    const onNameChange = (event : any) => {
        setPlanningName(event.target.value);
    }

    let workdayList =
            <TableContainer >
                <Table className={"table"}  aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <StyledSmallTableCell><b>Workday</b></StyledSmallTableCell>
                            <StyledSmallTableCell><b>Date</b></StyledSmallTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workdays.map((row) => (
                            <StyledTableRow>
                                <StyledSmallTableCell size="small">
                                    AAAAAAAAA
                                </StyledSmallTableCell>
                                <StyledSmallTableCell>
                                    {row.date.toDateString()}
                                </StyledSmallTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>;


    let newPlanning = <form>
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
            <KeyboardDatePicker
                className={"date-item"}
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="Start date"
                format="dd/MM/yyyy"
                value={planningStart}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date : any) => setPlanningStart(date)}
            />
            <KeyboardDatePicker
                className={"date-item"}
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="End date"
                format="dd/MM/yyyy"
                value={planningEnd}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date : any) => setPlanningEnd(date)}
            />
            <Button className={"button-item"} variant={"contained"} color={"primary"} onClick={AddPlanning}>Create</Button>
        </div>
        <div className={"create-field"}>
            {workdayList}
        </div>
    </form>;

    let planningList;
    if (plannings.length === 0){
        planningList = <div className={"loader"}>
            <LinearProgress />
        </div>;
    } else {
        planningList =
            <TableContainer >
                <Table className={"table"}  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><b>Actions</b></StyledTableCell>
                            <StyledTableCell><b>Name</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plannings.map((row) => (
                            <StyledTableRow  key={row.id} >
                                <StyledTableCell size="small">
                                    { props.authReducer.user.id === props.companyReducer.company.owner.id &&
                                    <Tooltip title={'Remove'}>
                                        <IconButton onClick={() => {RemovePlanning(row)}} size="small">
                                            <Delete/>
                                        </IconButton>
                                    </Tooltip>
                                    }
                                </StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>;
    }

    return (
        <div className={'planningContent'} >
            {error}
            {removeDialog}
            {newPlanning}
            {planningList}
         </div>
    );
}

const mapStateToProps = (state : any) => {
    return {
        authReducer: state.authReducer,
        companyReducer: state.companyReducer
    };
};

export default withRouter(connect(mapStateToProps)(PlanningOverview));
