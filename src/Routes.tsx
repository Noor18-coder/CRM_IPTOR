import {BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Opportunities from './components/Opportunity/Opportunities';
import LoginForm from './components/Login/LoginForm';
import OpportunityDetails from './components/OpportunityDetails/OpportunityDetails';
import CustomerDetails from './components/CustomerDetails/CustomerDetails';
import Dashboard from './components/Dashboard/Dashboard';
import Customers from './components/Customer/CustomerList'


function Routes() {
    //let match = useRouteMatch();
    return (
        <Router>
           <Route path="/login" component={LoginForm} exact />
           <ProtectedRoute  path="/"  component={Dashboard}  exact  />
           <ProtectedRoute  path="/opportunities"  component={Opportunities}  exact  />
           <ProtectedRoute  path="/opp-details"  component={OpportunityDetails}  exact  />
           <ProtectedRoute path="/customers" component={Customers} exact />
           <ProtectedRoute  path="/cust-details"  component={CustomerDetails}  exact  />
        </Router>
    )
}

export default Routes;

