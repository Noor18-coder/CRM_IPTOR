import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Opportunities from './components/Opportunity/Opportunities';
import LoginForm from './components/Login/LoginForm';
import { OpportunityDetails } from './components/OpportunityDetails/OpportunityDetails';
import CustomerDetails from './components/CustomerDetails/CustomerDetails';
import Dashboard from './components/Dashboard/Dashboard';
import { BusinessPartners } from './components/Customer/CustomerList';
import Reports from './components/Reports/Reports';

function Routes() {
  return (
    <Router>
      <Route path="/login" component={LoginForm} exact />
      <ProtectedRoute path="/" component={Dashboard} exact />
      <ProtectedRoute path="/opportunities" component={Opportunities} exact />
      <ProtectedRoute path="/opp-details" component={OpportunityDetails} exact />
      <ProtectedRoute path="/customers" component={BusinessPartners} exact />
      <ProtectedRoute path="/cust-details" component={CustomerDetails} exact />
      <ProtectedRoute path="/reports" component={Reports} exact />
    </Router>
  );
}

export default Routes;
