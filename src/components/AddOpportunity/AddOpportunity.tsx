import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router';

import AddOpportunityUserDefinedFields from './AddOpportunityUserDefinedFields';
import AddOpportunityDefaultFields from './AddOpportunityDefaultFields';
import AddOpportunitySelectItems from './AddOpportunitySelectItems';
import ImageConfig from '../../config/ImageConfig';

import { AppState } from "../../store/store";
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import { AddOpportunityDefaultParams, UserDefinedFieldReduxParams} from '../../helpers/Api/models';

interface Props {
    closeDrawer: () => void
}


const AddOpportunity:React.FC<Props> = ({closeDrawer}) => {
    const [step, setStep] = React.useState<number>(1);
    const state: AppState = useSelector((state: AppState) => state);
    const history = useHistory();
    
    const createOpportunity = async (items:string[]) => {
        const opportunity:AddOpportunityDefaultParams = state.addOpportunity.opportunityDefaultParams;  
       opportunity.handler = state.auth.user.handler;
       const data = await AddOpportunityApi.add(opportunity);
       const opptyId = data.data.opportunityId;
       const attributes:UserDefinedFieldReduxParams[] = state.addOpportunity.attributes;

       Promise.all(attributes.map((obj:UserDefinedFieldReduxParams) => {
           return AddOpportunityApi.addAttributes(opptyId, obj.attributeType, obj.attributeValue);
       })).then((data)=> {
           return data;
       });

       Promise.all(items.map((item:string) => {
           return AddOpportunityApi.addItem(opptyId,item, 1, 'EACH');
       })).then((data)=> {
           return data;
       });

       closeDrawer();

       if (opptyId) {
          history.push({ pathname: "/opp-details", state: { oppid: opptyId} })
        }
      
    }
   


    const  changeStep = (num:number) => {
        setStep(num);
    }

    return (
        <>
            <div className="sliding-panel-container">
                <div className="sliding-panel">
                    <div className="title-row">
                        <img src={ImageConfig.CHEVRON_LEFT} className="mob-steps-back" />
                    Add New Opportunity
                    <a className="panel-close-icon" href="#" >
                            <img src={ImageConfig.CLOSE_BTN} /></a>
                    </div>

                    <div className="all-opportunity-steps-container">
                    {step == 1 ? <AddOpportunityDefaultFields changeStep={changeStep} /> : null }
                    {step == 2 ? <AddOpportunityUserDefinedFields  changeStep={changeStep}  /> : null }
                    {step == 3 ? <AddOpportunitySelectItems changeStep={changeStep} createOpportunity={createOpportunity}  /> : null }
                   
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default AddOpportunity;  