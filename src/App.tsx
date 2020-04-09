import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import TopNavigation from "./components/TopNavigation";
import Login from "./containers/Login";
import Logout from "./containers/Logout";
import {Provider} from "react-redux";
import store from "./store";

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
                                <Route path='/login' component={Login} />
                                <Route path='/logout' component={Logout} />
                            </Switch>
                        </main>
                    </div>
                </Router>
            </Provider>
        </React.StrictMode>
  );
}

export default App;
