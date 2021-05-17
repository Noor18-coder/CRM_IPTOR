import {BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Opportunities from './components/Opportunity/Opportunities';
import LoginForm from './components/Login/LoginForm';


function Routes() {
    //let match = useRouteMatch();
    return (
        <Router>
           <Route path="/login" component={LoginForm} exact />
           <ProtectedRoute  path="/"  component={Opportunities}  exact  />
        </Router>
    )
}

export default Routes;
