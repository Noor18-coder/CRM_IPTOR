import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { AppState } from './store/store';

const  ProtectedRoute: React.FC<{
        component: React.FC;
        path: string;
        exact: boolean;
    }> = (props) => {

    const state : AppState = useSelector(
        (state: AppState) => state
        );

    const condition = state.auth.login;

    return  condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
        (<Redirect  to="/login"  />);
};
export  default  ProtectedRoute;
