import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from './store/store';

const ProtectedRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const { path, exact, component } = props;
  const state: AppState = useSelector((routeState: AppState) => routeState);

  const condition = state.auth.login;

  return condition ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/login" />;
};
export default ProtectedRoute;
