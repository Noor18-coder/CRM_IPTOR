import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import ImageConfig from '../../config/ImageConfig';
import * as models from '../../helpers/Api/models';
import { AppState } from "../../store/store";

import EditAttributes from './EditAttributes';
import EditBasicInfo from './EditBasicInfo';
import AddContact from './AddContact';
import EditItem from './EditItem';
import AddItem from './AddItem';
import AssignOpportunity  from './AssignOpportunity';
import { saveOpportunityDetails, saveOpportunityAttributes, openOpportunityForm} from '../../store/OpportunityDetails/Actions';


interface Props {
    reloadOpportunityDetailsPage : () => void
}
const EditOpportunity: React.FC<Props> = ({reloadOpportunityDetailsPage}) => {
    const state: AppState = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();
    const [opportunity, setOpportunity] = React.useState<models.OpportunityDetailsDefault>();
    const [headerName, setHeaderName] = React.useState<string>('Edit Opportunity');
 
    

    const closeAction = () => {
        document.body.classList.remove('body-scroll-hidden');
        dispatch(openOpportunityForm({open:false}))
    }



    const loadComponent = () => {
        const groupName = state.opportuntyDetails.editOportunity.groupName; 

        if(groupName == 'opportunity_defaults'){
            return <EditBasicInfo reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />;
        } else if('add_contact' === groupName){
            return <AddContact refresh={reloadOpportunityDetailsPage} edit={false} />;
        } else if(groupName == 'edit_item'){
            return  <EditItem reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />;
        } else if(groupName == 'add_item'){
            return  <AddItem reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />;
        }else if(groupName == 'assign_opportunity'){
            return  <AssignOpportunity reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />;
        }else {
            return <EditAttributes reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />;
        }
    }

    React.useEffect(() => {
        const groupName = state.opportuntyDetails.editOportunity.groupName; 
        if(groupName === 'add_contact'){
            setHeaderName('Add Contacts');
        } else if(groupName == 'add_item') {
            setHeaderName('Add Product');
        } else if(groupName == 'edit_item') {
            setHeaderName('Edit Product')
        } else if(groupName == 'assign_opportunity'){
            setHeaderName('Assign Opportunity')
        }
    }, [])

   

    return (
        <>
            <div className="sliding-panel-container">
                <div className="sliding-panel">
                    <div className="title-row opp-header-text">
                        <img src={ImageConfig.CHEVRON_LEFT} className="mob-steps-back" onClick={closeAction} />
                        {headerName}
                        <a className="panel-close-icon" onClick={closeAction} >
                            <img src={ImageConfig.CLOSE_BTN} /></a>
                    </div>

                    <div className="all-opportunity-steps-container">
                        <div className="opportunity-forms">
                            {/* <p className="stepone-title">Opportunity Name</p> */}
                            <div className="">
                                <div className="steps-one-forms">
                                    {loadComponent()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditOpportunity;