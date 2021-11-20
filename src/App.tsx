import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/iptor.scss';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute } from './router/PrivateRoute';
// import ProtectedRoute from './router/ProtectedRoute';
import Opportunities from './components/Opportunity/Opportunities';
// import LoginForm from './components/Login/LoginForm';
import { SsoLogin } from './components/Login/SsoLogin';
import { OpportunityDetails } from './components/OpportunityDetails/OpportunityDetails';
import CustomerDetails from './components/CustomerDetails/CustomerDetails';
import Dashboard from './components/Dashboard/Dashboard';
import { BusinessPartners } from './components/Customer/CustomerList';
import Reports from './components/Reports/Reports';
import NotificationList from './components/Notifications/NotificationList';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/login" component={SsoLogin} exact />
        <PrivateRoute path="/" component={Dashboard} exact />
        <PrivateRoute path="/opportunities" component={Opportunities} exact />
        <PrivateRoute path="/opp-details" component={OpportunityDetails} exact />
        <PrivateRoute path="/customers" component={BusinessPartners} exact />
        <PrivateRoute path="/cust-details" component={CustomerDetails} exact />
        <PrivateRoute path="/reports" component={Reports} exact />
        <PrivateRoute path="/notifications" component={NotificationList} exact />
      </Switch>
    </Router>
  );
}

export default App;
