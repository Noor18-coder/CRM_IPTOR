import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Shared/scss/index.scss';
import LeftColmData from "./LeftColmData";
import LoginForm from "./../LoginForm";
import CompanySelection from './../CompanySelection';
import {BrowserRouter, Route} from "react-router-dom";


const Login = () => {
  return (
      <div className="bg">
        <LeftColmData></LeftColmData>
          <BrowserRouter>
            {/* <Route exact path="/" component={CompanySelection}></Route> */}
            <Route exact path="/" component={LoginForm}></Route>
          </BrowserRouter>
      </div>
  );
}

export default Login;