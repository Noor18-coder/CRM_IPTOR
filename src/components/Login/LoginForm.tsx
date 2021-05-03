import React from "react";
//import "../Login/Shared/scss/LoginForm.css";
import { Container, Row, Col, Form, Button, Nav, Image } from "react-bootstrap";
import logo from '../../assets/images/iptor_logo.png';
import LoginFooter from "./Shared/LoginFooter";
import SubmitButton from "./Shared/SubmitButton";
import { useHistory } from 'react-router-dom';

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import { auth  } from '../../store/Auth/Actions';
import { AuthState, AuthRequest} from '../../store/Auth/Types';
import { Dispatch } from "redux"
import { AppState } from '../../store/store';

const LoginForm = () => {


  const history = useHistory();
  
  const state : AppState = useSelector(
    (state: AppState) => state
  );

 

  const [authRequest, setValues] = React.useState<AuthRequest | {}>();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...authRequest,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }
  
  
  const dispatch: Dispatch<any> = useDispatch();

  
  const doClick = () => {
     dispatch(auth(authRequest));
     history.push('/company-selection');

  }
 

  return (
    <Container className="login-bg">
      
      <Row>
        <Col xl={12}>   
        <Image src={logo}  width={55} height={20}></Image>
        <h1>Hi there!  Welcome back... </h1>
          <Form className="line-input">
            <Form.Group>
              <Form.Label>User ID</Form.Label>
              <Form.Control
                id='user'
                type="text"
                placeholder="Ex: lynda.clipp@iptor.com"
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
              <SubmitButton title={'Login'} onClick= {doClick }/>
            </Form.Group>
          </Form>
          <LoginFooter></LoginFooter>
        </Col>  
      </Row>

    </Container>
  );
};

export default LoginForm;
