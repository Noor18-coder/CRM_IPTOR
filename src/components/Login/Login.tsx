import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Shared/scss/index.scss';
import LeftColmData from './Shared/LeftColmData';
import LoginForm from "./LoginForm";
//import Login from "./../Login";

const Login = () => { 

    return (
        <div className="bg">
            <LeftColmData></LeftColmData>
            <LoginForm  />
        </div>
    );
}

export default Login;