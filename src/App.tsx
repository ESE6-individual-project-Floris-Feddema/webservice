import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import TopNavigation from "./components/TopNavigation";
import Login from "./components/Login";
import Logout from "./components/Logout";
import {Provider} from "react-redux";
import store from "./store";
import Register from "./components/Register";
import Companies from "./components/Companies";
import AuthenticatedRoute from "./controls/AuthenticatedRoute";
import UnauthenticatedRoute from "./controls/UnauthenticatedRoute";

function App() {
    return (
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
                                <AuthenticatedRoute path='/companies' component={Companies} />
                            </Switch>
                        </main>
                    </div>
                </Router>
            </Provider>
        </React.StrictMode>
  );
}

export default App;
