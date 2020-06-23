import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/general/Home';
import TopNavigation from "./components/general/TopNavigation";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import {Provider} from "react-redux";
import store from "./reducers/store";
import Register from "./components/auth/Register";
import Companies from "./components/companies/Companies";
import AuthenticatedRoute from "./controls/AuthenticatedRoute";
import UnauthenticatedRoute from "./controls/UnauthenticatedRoute";
import CompanyOverview from "./components/companies/CompanyOverview";
import ReleaseNotes from "./components/general/ReleaseNotes";
import PlanningOverview from "./components/planning/PlanningOverview";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

function App() {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <React.StrictMode >
                <Provider store={store} >
                    <Router>
                        <div className={'app-container'}>
                            <TopNavigation />
                            <main role="main" className={"container"}>
                                <Switch>
                                    <Route exact path='/' component={Home} />
                                    <UnauthenticatedRoute path='/login' component={Login} />
                                    <AuthenticatedRoute path='/logout' component={Logout} />
                                    <UnauthenticatedRoute path='/register' component={Register} />
                                    <AuthenticatedRoute exact path='/companies' component={Companies} />
                                    <AuthenticatedRoute exact path='/plannings' component={PlanningOverview} />
                                    <AuthenticatedRoute path='/defaultCompany' component={CompanyOverview} />
                                    <UnauthenticatedRoute path='/releaseNotes' component={ReleaseNotes} />
                                </Switch>
                            </main>
                        </div>
                    </Router>
                </Provider>
            </React.StrictMode>
        </MuiPickersUtilsProvider>
  );
}

export default App;
