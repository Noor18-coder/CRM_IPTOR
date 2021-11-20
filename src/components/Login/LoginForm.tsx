/* eslint-disable consistent-return */
import React from 'react';
import { Dispatch } from 'redux';
import { Form, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { Redirect } from 'react-router';
import logo from '../../assets/images/iptor-logo-orange.svg';
import errorIcon from '../../assets/images/error.png';

import LoginFooter from './Shared/LoginFooter';
import { SubmitButton } from './Shared/SubmitButton';
import { CompanySelection } from './CompanySelection';
import LeftColmData from './Shared/LeftColmData';

import { authentication, authWithCompany, logOutSuccess } from '../../store/Auth/Actions';
import { AuthRequest } from '../../store/Auth/Types';
import { AppState } from '../../store/store';

import Loader from '../Shared/Loader/Loader';
import i18n from '../../i18n';

const LoginForm: React.FC = () => {
  const state: AppState = useSelector((loggedState: AppState) => loggedState);
  const [authRequest, setValues] = React.useState<AuthRequest>();
  const [company, setCompany] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [userError, setUserError] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<boolean>(false);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      setIsSubmit(false);
    }
    setValues({
      ...authRequest,
      [e.currentTarget.id]: e.currentTarget.value,
    });
    setError(false);
    if (e.currentTarget.value === '') {
      setIsSubmit(false);
    } else if (authRequest && authRequest.user && authRequest.password) {
      setIsSubmit(true);
    }
  };

  const dispatch: Dispatch<any> = useDispatch();
  const doClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(authentication(authRequest));
  };

  const selectCompany = (newCompany: string) => {
    setCompany(newCompany);
  };

  const backToLogin = () => {
    setIsSubmit(false);
    dispatch(logOutSuccess());
  };

  const validateField = (_event: any) => {
    const user = document.getElementById('user') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    if (_event.key.length === 9 && _event.key.length !== 3) {
      if (user.value === '') {
        user.style.border = '1px solid #ED2024';
        setUserError(true);
      }

      if (password.value === '') {
        password.style.border = '1px solid #ED2024';
        setPasswordError(true);
      }
      setIsSubmit(false);
      setError(true);
    }
  };
  React.useEffect(() => {
    if (company) {
      const params = { ...authRequest, company };
      dispatch(authWithCompany(params));
    }
    const user = document.getElementById('user') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    setTimeout(() => {
      if (user && password) {
        if (user.matches(':-internal-autofill-selected') && password.matches(':-internal-autofill-selected')) {
          setIsSubmit(true);
        }
      }
    }, 100);
  }, [company]);

  const user = document.getElementById('user') as HTMLInputElement;
  const password = document.getElementById('password') as HTMLInputElement;

  setTimeout(() => {
    if (user && password) {
      if (user.matches(':-internal-autofill-selected') && password.matches(':-internal-autofill-selected')) {
        setIsSubmit(true);
      }
    }
  }, 10);

  return (
    <>
      {(() => {
        if (state.auth.login) {
          return <Redirect to="/" />;
        }
        if (state.auth.loginWithoutCompany) {
          return <CompanySelection selectCompany={selectCompany} backToLogin={backToLogin} />;
        }
        return (
          <div className="main-wrapper loginpage">
            <LeftColmData />
            <>
              <div className="login-panel-container">
                <Image src={logo} className="login-form-logo" alt="Iptor" title="Iptor" />
                <p className="welcome-txt">
                  <span className="hi-txt">{i18n.t('hiMessage')}</span>
                  <span className="welcomeback-txt">{i18n.t('welcomeMessage')}</span>
                </p>
                {state.enviornmentConfigs.loadingMask && <Loader component="opportunity" />}
                {error ? (
                  <p className="error">
                    {' '}
                    <Image className="alert-icon" src={errorIcon} width={15} height={12} />
                    &nbsp; {i18n.t('loginErrorMsg')}
                  </p>
                ) : null}
                {state.auth.error ? (
                  <p className="error">
                    {' '}
                    <Image className="alert-icon" src={errorIcon} width={15} height={12} />
                    &nbsp; {state.auth.error}
                  </p>
                ) : null}
                <div className="form-placeholder-container">
                  <Form>
                    <Form.Group>
                      {userError || state.auth.error ? <Form.Label className="err-text">User ID</Form.Label> : <Form.Label>User ID</Form.Label>}
                      <Form.Control
                        className="form-control"
                        placeholder="Enter UserId"
                        id="user"
                        type="text"
                        onChange={handleChange}
                        onKeyDown={validateField}
                      />
                    </Form.Group>

                    <Form.Group>
                      {passwordError || state.auth.error ? <Form.Label className="err-text">Password</Form.Label> : <Form.Label>Password</Form.Label>}
                      <Form.Control
                        className="form-control"
                        placeholder="Enter password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        onKeyDown={validateField}
                      />
                    </Form.Group>
                    {/* <Nav.Item className="forgotpswd">
                        <Nav.Link href="#">Forgot Password?</Nav.Link>
                      </Nav.Item> */}
                    <SubmitButton title="Login" isSubmit={isSubmit} onClick={doClick} />
                  </Form>
                </div>
                <LoginFooter />
              </div>
            </>
          </div>
        );
      })()}
    </>
  );
};

export default LoginForm;
