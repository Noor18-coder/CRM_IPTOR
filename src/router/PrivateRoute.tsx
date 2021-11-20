import { Redirect, Route } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import { AppState } from '../store';
import { authentication } from '../store/Auth/Actions';
import { AuthState } from '../store/Auth/Types';

export function PrivateRoute({ component: Component, ...rest }: any) {
  const { keycloak, initialized } = useKeycloak();
  console.log(keycloak);
  const dispatch: Dispatch<any> = useDispatch();
  const authState: AuthState = useSelector((authStates: AppState) => authStates.auth);

  if (keycloak?.authenticated === undefined || !initialized) {
    return <Route render={() => <div />} />;
  } else {
    if (keycloak?.authenticated) {
      // send auth request to api after keycloak auth - move it to App or index?
      if (!authState.loginWithoutCompany && !authState.login && !authState.loading) {
        const token: any = keycloak.idTokenParsed;
        const authRequest = { user: token.app_user_id };
        dispatch(authentication(authRequest));
      }
      if (authState.user.selectedCompany !== '' || rest.path.toString() === '/login') {
        return (
          <Route
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
            render={(props) => {
              // eslint-disable-next-line react/jsx-props-no-spreading
              return <Component {...props} />;
            }}
          />
        );
      } else {
        return <Redirect to="/login" />;
      }
    } else {
      keycloak?.login({ redirectUri: 'http://localhost:3000/check/sso' });
    }
    return <Route render={() => <div />} />;
  }
}
