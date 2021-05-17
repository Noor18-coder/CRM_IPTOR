import React, { FormEvent } from "react";
//import "../Login/Shared/scss/LoginForm.css";
import { Container, Row, Col, Form, Button, Nav, Image } from "react-bootstrap";
import logo from '../../assets/images/iptor_logo.png';
import error from '../../assets/images/error.png';
import LoginFooter from "./Shared/LoginFooter";
import {SubmitButton} from "./Shared/SubmitButton";
import { Redirect, useHistory } from 'react-router-dom';

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import { auth, authWithCompany } from '../../store/Auth/Actions';
import { AuthState, AuthRequest } from '../../store/Auth/Types';
import { Dispatch } from "redux"
import { AppState } from '../../store/store';
import CompanySelection from "./CompanySelection";

const LoginForm: React.FC = () => {

  const state: AppState = useSelector(
    (state: AppState) => state
  );


  const [authRequest, setValues] = React.useState<AuthRequest | {}>();
  const [company, setCompany] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...authRequest,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const dispatch: Dispatch<any> = useDispatch();

  const doClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(auth(authRequest));
  }

  const selectCompany = (company: string) => {
    setCompany(company);
  }

  React.useEffect(() => {

    const params = {...authRequest, company:company};
    dispatch(authWithCompany(params));

  }, [company]);

  return (
    <>
      {
        state.auth.loginWithoutCompany ? <CompanySelection selectCompany={selectCompany} /> :
          <Container className="login-bg">

            <Row>
              <Col xl={12}>
                <Image src={logo} width={55} height={20}></Image>
                <h1>Hi there!  Welcome back... </h1>
                <p className="error"> <Image className="alert-icon" src={error} width={15} height={12}></Image>&nbsp; Either your password or user id is wrong</p>
                <Form className="line-input">
                  <Form.Group>
                    <Form.Label>User ID</Form.Label>
                    <Form.Control
                      id='user'
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      id='password'
                      onChange={handleChange}
                      placeholder="Password" />
                  </Form.Group>
                  <Nav.Item className="forgot-pwd">
                    <Nav.Link href="#">Forgot Password?</Nav.Link>
                  </Nav.Item>
                  <Form.Group>
                    <SubmitButton title={'Login'} onClick={doClick} />
                  </Form.Group>
                </Form>
              </Col>
            </Row>

            <LoginFooter></LoginFooter>
          </Container>
      }
    </>
  );
};

export default LoginForm;
