import React from 'react';
import ImageConfig from '../../config/ImageConfig';
import { Dispatch } from "redux";
import { AppState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";

interface Props {
    changeStep: (num: number) => void
}

const AddOpportunityUserDefinedFields: React.FC<Props> = ({ changeStep }) => {
    const [step, setStep] = React.useState<number>(1);
    const state: AppState = useSelector((state: AppState) => state);
    

    return (
        <>
            <div className="opportunity-step-circles">
                <ul className="list-inline step-circles">
                    <li className="list-inline-item circle-stepone steps active"><span className="num">1</span>
                        <span className="checked"><img src="../assets/images/steps-completed-check.svg" /></span></li>
                    <li className="list-inline-item circle-steptwo steps"><span className="num">2</span>
                        <span className="checked"><img src="../assets/images/steps-completed-check.svg" /></span></li>
                    <li className="list-inline-item circle-stepthree steps"><span className="num">3</span>
                        <span className="checked"><img src="../assets/images/steps-completed-check.svg" /></span></li>
                </ul>
            </div>
        </>
    )
}

export default AddOpportunityUserDefinedFields;  