import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";
import Header from '../Shared/Header/Header';

const Dashboard:React.FC = () => {
    
    const state: AppState = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();

    return (
       <>
            <Header page={0}/>
            <h1>Dashboard</h1>
       </>
    )
}

export default Dashboard;