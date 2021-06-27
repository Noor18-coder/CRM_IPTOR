import React from 'react'

import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../store/store";
import { UsersData } from '../../store/Users/Types';

import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import { InfoAccordion , InfoAccordionGroups} from './InfoAccordion';
import { ContactAccordian } from '../OpportunityDetails/ContactDetails';
import { ProductAccordian } from '../OpportunityDetails/ProductDetails';
import OpportunityInfo from './OpportunityInfo';
import OpportunityInfoMobile from './OpportunityInfoMobile';
import * as models from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import {NavSection} from '../Shared/DetailsNav/NavSection';
import Loader from '../Shared/Loader/Loader';
import Container from '../EditOpportunity/Container';

import {setLoadingMask, removeLoadingMask } from '../../store/InitialConfiguration/Actions';
import { saveOpportunityDetails, saveOpportunityAttributes, openOpportunityForm} from '../../store/OpportunityDetails/Actions';




const OpportunityDetails: React.FC = (props: any) => {
    const state: AppState = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();
    const opptyId = props.location.state.oppid;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [defaultOpptyDetail, setDefaultOpptyDetails] = React.useState<models.OpportunityDetailsDefault>();
    const [opptyDataBasicGroup, setOpptyDataForBasicInfoGroup] = React.useState<models.OpportunityDetailsBasicInfo[]>();
    const [opptyDataMoreInfoGroup, setOpptyDataForMoreInfoGroup] = React.useState<models.AttributeValueObject[]>();
    const [opptyDataContactInfo, setOpptyDataContactInfo] = React.useState<models.OpportunityContact[]>([]);
    const [opptyDataProductInfo, setOpptyDataProductInfo] = React.useState<models.Product[]>([]);

    const getName = (str: string) => {
        const userObj = state.users.users.find((obj) => obj.handler === str);
        return userObj?.description ? userObj?.description : '';
    }

    const fetchOpportunityDetails = async (opptyId:string) => {
        setLoading(true);
        dispatch(setLoadingMask());
        const opptyDetails:models.OpportunityDetailsDefault = await OpportunityDetailsApi.get(opptyId);
        setDefaultOpptyDetails(opptyDetails);
        dispatch(saveOpportunityDetails(opptyDetails));
        getBasicInfo(opptyDetails);
        const attributeValues:models.AttributeValueObject[] =  await OpportunityDetailsApi.getGroupInfo(opptyId);
        setOpptyDataForMoreInfoGroup(attributeValues);
        dispatch(saveOpportunityAttributes(attributeValues));
        dispatch(removeLoadingMask());
        setLoading(false);
    }

    React.useEffect(() => {
        
        fetchOpportunityDetails(opptyId);
        
        OpportunityDetailsApi.getOpportunityContact(opptyId).then((data) => {
            setOpptyDataContactInfo(data);
        });

        OpportunityDetailsApi.getOpportunityItems(opptyId).then((data) => {
            setOpptyDataProductInfo(data)
        });

    }, []);

    const getBasicInfo = (basicInfo: models.OpportunityDetailsDefault) => {
        const data: models.OpportunityDetailsBasicInfo[] = [];

        Object.entries(basicInfo).forEach(([key, value]) => {
            switch (key) {
                case 'opportunityId': data.push({ description: 'Opp Number', 'attributeValue': value }); break;
                case 'desc': data.push({ description: 'Opp Name', 'attributeValue': value }); break;
                case 'handler': data.push({ description: 'Owner', 'attributeValue': value ? getName(value) : ''}); break;
                case 'stage': data.push({ description: 'Stage', 'attributeValue': value }); break;
                case 'currency': data.push({ description: 'Currency', 'attributeValue': value }); break;
                case 'endDate': data.push({ description: 'Close Date', 'attributeValue': value }); break;
                case 'oppRecordType': data.push({ description: 'Opportunity Type', 'attributeValue': value }); break;
                case 'estimatedValue': data.push({ description: 'Opp Value', 'attributeValue': value + '' }); break;
            }
        });
        setOpptyDataForBasicInfoGroup(data);

    }

    const history = useHistory();
    const backToOpportunityList= () => {
        history.goBack()
      }

      const openEditForm = (groupName:string) => {
        dispatch(openOpportunityForm({open:true,groupName:groupName}))
    }

    const openOpportunityBasicEdit = () => {
        dispatch(openOpportunityForm({open:true,groupName:'opportunity_defaults'}))
    }


    return (
        <>
            <Header page={1}/>
            { loading ?  <Loader component='opportunity'/> :
                <section className="main-wrapper opportunity">
                <div className="container-fluid">
                    <NavSection backToOpportunityList={backToOpportunityList} />
                    {defaultOpptyDetail ? <OpportunityInfo data={defaultOpptyDetail} /> : null}
                    {defaultOpptyDetail ? <OpportunityInfoMobile data={defaultOpptyDetail} /> : null}
                    <section className="sec-info-accordion">
                        {opptyDataBasicGroup?.length ? <InfoAccordion title={'Basics'} data={opptyDataBasicGroup} openEditOpportunity={openOpportunityBasicEdit} /> : null}
                        {opptyDataMoreInfoGroup ? <InfoAccordionGroups title={'More Information'} data={opptyDataMoreInfoGroup} openEditForm={openEditForm}/> : null} 
                        <ProductAccordian title={'Products & Modules'} data={opptyDataProductInfo} />
                        <ContactAccordian title={'Contacts'} data={opptyDataContactInfo} />                         
                    </section>
                </div>
            </section> }
            <Footer />
            <Container />
        </>
    )
}

export default OpportunityDetails;
