import React from "react";
import { Dispatch } from "redux";
import { Form, Nav, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import logo from "../../assets/images/iptor-logo-orange.svg";
import errorIcon from "../../assets/images/error.png";

import LoginFooter from "./Shared/LoginFooter";
import { SubmitButton } from "./Shared/SubmitButton";
import {CompanySelection} from "./CompanySelection";
import LeftColmData from './Shared/LeftColmData';

import { auth, authWithCompany, logOutSuccess} from "../../store/Auth/Actions";
import { AuthRequest } from "../../store/Auth/Types";
import { AppState } from "../../store/store";
import { Redirect } from "react-router";

import Loader from '../Shared/Loader/Loader'
import i18n from '../../i18n'

const LoginForm: React.FC = () => {
    const state: AppState = useSelector((state: AppState) => state);
  const [authRequest, setValues] = React.useState<AuthRequest | {}>();
  const [company, setCompany] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const [userError, setUserError] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<boolean>(false);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...authRequest,
      [e.currentTarget.id]: e.currentTarget.value,
    });
    setError(false);
  };

  const dispatch: Dispatch<any> = useDispatch();
  const doClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(auth(authRequest));
    if (!state.auth.loginWithoutCompany) {
        // setLoader(true)
    }
  };

  const selectCompany = (company: string) => {
    setCompany(company);
  };

  const backToLogin= () => {
      setIsSubmit(false);
      dispatch(logOutSuccess());
      // setLoader(false)
  }

  const validateField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const element = document.getElementById(e.currentTarget.id) as HTMLInputElement
    if (e.currentTarget.value === '' || e.currentTarget.value.includes('Select')) {
        element.style.border = '1px solid #ED2024';
        if(e.currentTarget.id === 'user'){
          setUserError(true);
        }
        if(e.currentTarget.id === 'password'){
          setPasswordError(true);
        }
        setIsSubmit(false);
        setError(true);
    }
    else {
        element.style.border = '1px solid #DAE2E7';
        setIsSubmit(true);
        setUserError(false);
        setPasswordError(false);
    }
};

  React.useEffect(() => {
    if (company) {
      const params = { ...authRequest, company: company };
      dispatch(authWithCompany(params));
    }

  }, [company]);

  return (
      <>
    { state.auth.login ? <Redirect to="/" /> : (state.auth.loginWithoutCompany ? <CompanySelection selectCompany={selectCompany} backToLogin={backToLogin}/> :
      <div className="main-wrapper loginpage">
          <LeftColmData></LeftColmData>
          <>
      
          <div className="login-panel-container">
            <Image
              src={logo}
              className="login-form-logo"
              alt="Iptor"
              title="Iptor"
            ></Image>
            <p className="welcome-txt">
                <span className="hi-txt">{i18n.t('hiMessage')}</span>
                <span className="welcomeback-txt">{i18n.t('welcomeMessage')}</span>
            </p>
            {state.enviornmentConfigs.loadingMask && <Loader component='opportunity'/>}
            {state.auth.error}
            {error  ? <p className="error"> <Image className="alert-icon" src={errorIcon} width={15} height={12}></Image>&nbsp; {i18n.t('loginErrorMsg')}</p> : null}
            {state.auth.error ? <p className="error"> <Image className="alert-icon" src={errorIcon} width={15} height={12}></Image>&nbsp; {state.auth.error}</p> : null}
            <div className="form-placeholder-container">
              <Form>
                <Form.Group>
                  {userError || state.auth.error ?<Form.Label className="err-text">User ID</Form.Label> : <Form.Label>User ID</Form.Label>}
                  <Form.Control
                    className="form-control"
                    placeholder="Enter UserId"
                    id="user"
                    type="text"
                    onChange={handleChange}
                    onBlur={validateField} 
                  />
                </Form.Group>

                <Form.Group>
                {passwordError || state.auth.error?<Form.Label className="err-text">Password</Form.Label> : <Form.Label>Password</Form.Label>}
                  <Form.Control
                    className="form-control"
                    placeholder="Enter password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={validateField}
                  />
                </Form.Group>
                {/* <Nav.Item className="forgotpswd">
                  <Nav.Link href="#">Forgot Password?</Nav.Link>
                </Nav.Item> */}
                <SubmitButton title={"Login"} isSubmit={isSubmit} onClick={doClick} />
              </Form>
            </div>
            <LoginFooter></LoginFooter>
          </div> 
          </> 
        </div>
    )}
    </>
  );
};

export default LoginForm;
