import {BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Opportunities from './components/Opportunity/Opportunities';
import LoginForm from './components/Login/LoginForm';
import OpportunityDetails from './components/OpportunityDetails/OpportunityDetails';


function Routes() {
    //let match = useRouteMatch();
    return (
        <Router>
           <Route path="/login" component={LoginForm} exact />
           <ProtectedRoute  path="/"  component={Opportunities}  exact  />
           <ProtectedRoute  path="/opp-details"  component={OpportunityDetails}  exact  />
        </Router>
    )
}

export default Routes;
