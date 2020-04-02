import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import TopNavigation from "./components/TopNavigation";
import Login from "./containers/Login";
import Logout from "./containers/Logout";

function App() {
  return (
      <div>
        <TopNavigation />
        <main role="main" className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
          </Switch>
        </main>
      </div>
  );
}

export default App;
