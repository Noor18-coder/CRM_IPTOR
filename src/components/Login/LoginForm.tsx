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

const LoginForm: React.FC = () => {
  const state: AppState = useSelector((state: AppState) => state);

  const [authRequest, setValues] = React.useState<AuthRequest | {}>();
  const [company, setCompany] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

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
    const user = (document.getElementById('user') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    if (user === '' || password === '') {
      setError(true);
    } else {
      dispatch(auth(authRequest));
    }
  };

  const selectCompany = (company: string) => {
    setCompany(company);
  };

  const backToLogin= () => {
    dispatch(logOutSuccess());
  }

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
              <span className="hi-txt">Hi there!</span>
              <span className="welcomeback-txt">Welcome back...</span>
            </p>
            {error || state.auth.error ? <p className="error"> <Image className="alert-icon" src={errorIcon} width={15} height={12}></Image>&nbsp; Either your password or user id is wrong</p> : null}
            <div className="form-placeholder-container">
              <Form>
                <Form.Group>
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    className="form-control"
                    placeholder="lynda.john"
                    id="user"
                    type="text"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="form-control"
                    placeholder="Enter password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* <Nav.Item className="forgotpswd">
                  <Nav.Link href="#">Forgot Password?</Nav.Link>
                </Nav.Item> */}
                <SubmitButton title={"Login"} onClick={doClick} />
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
