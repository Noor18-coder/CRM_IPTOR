import React from 'react'
import { useMediaQuery } from 'react-responsive';


import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../store/store";
import { UsersData } from '../../store/Users/Types';

import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import { InfoAccordion , InfoAccordionGroups, AccordianForMobileWithGroups} from './InfoAccordion';
import { ContactAccordian } from '../OpportunityDetails/ContactDetails';
import { ProductAccordian } from '../OpportunityDetails/ProductDetails';
import OpportunityInfo from './OpportunityInfo';
import OpportunityInfoMobile from './OpportunityInfoMobile';
import * as models from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import {NavSection} from '../Shared/DetailsNav/NavSection';
import Loader from '../Shared/Loader/Loader';
import Container from '../EditOpportunity/Container';
import { OverlayTrigger, Popover, Image } from 'react-bootstrap';
import ImageConfig from '../../config/ImageConfig';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import {setLoadingMask, removeLoadingMask } from '../../store/InitialConfiguration/Actions';
import { saveOpportunityDetails, saveOpportunityAttributes, openOpportunityForm} from '../../store/OpportunityDetails/Actions';

const OpportunityDetails: React.FC = (props: any) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    const isDesktop = useMediaQuery({ minWidth: 992 });

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

    const popover = () => {
        return (
            <Popover id="popover-basic" className="tool-tip">
                <Popover.Content>
                    <a onClick={assignOpportunity} role="button">
                        Assign To <Image className="logout-image" height="15" src={ImageConfig.LOGOUT_ICON} alt="Iptor" title="Iptor" />
                    </a>
                </Popover.Content>
                { state.auth.user.role?.toLowerCase() === 'admin' ? <Popover.Content>
                    <a  onClick={deleteOpportunity} role="button">
                        Delete <Image className="logout-image" height="15" src={ImageConfig.LOGOUT_ICON} alt="Iptor" title="Iptor" />
                    </a> 
                </Popover.Content> : null }
            </Popover>
        )
    };


    const isOpportunityEditable = (opptyDetails:models.OpportunityDetailsDefault) => {
        if(state.auth.user.user === opptyDetails.handler || state.auth.user.role?.toLowerCase() === 'admin'){
            dispatch(openOpportunityForm({allowEdit:true}));
        }else{
            dispatch(openOpportunityForm({allowEdit:false}));
        }
    }
        
    

    const fetchOpportunityDetails = async (opptyId:string) => {
        setLoading(true);
        dispatch(setLoadingMask());
        const opptyDetails:models.OpportunityDetailsDefault = await OpportunityDetailsApi.get(opptyId);
        setDefaultOpptyDetails(opptyDetails);
        isOpportunityEditable(opptyDetails);
        dispatch(saveOpportunityDetails(opptyDetails));
        getBasicInfo(opptyDetails);
        const attributeValues:models.AttributeValueObject[] =  await OpportunityDetailsApi.getGroupInfo(opptyId);
        setOpptyDataForMoreInfoGroup(attributeValues);
        dispatch(saveOpportunityAttributes(attributeValues));
        const contactData = await OpportunityDetailsApi.getOpportunityContact(opptyId);
        setOpptyDataContactInfo(contactData);
        const opptyItems = await OpportunityDetailsApi.getOpportunityItems(opptyId);
        setOpptyDataProductInfo(opptyItems);


        dispatch(removeLoadingMask());
        setLoading(false);
    }

    React.useEffect(() => {
        
        fetchOpportunityDetails(opptyId);

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
    
    const openAddContactForm = () => {
        dispatch(openOpportunityForm({open:true,groupName:'add_contact'}))
    }

    const deleteOpportunity = async () => {
        const data = await OpportunityDetailsApi.opportunityDelete(opptyId);
        backToOpportunityList();

    }

    const assignOpportunity = () => {
        dispatch(openOpportunityForm({open:true,groupName:'assign_opportunity'}))
    }


    const openAddItemForm = async (action:string, data?:models.Product) => {
        if(action == 'delete_item'){
            
            const params:models.DeleteOpportunityItemParams = {
                parentId:opptyId,
                itemId: data && data.itemId ? data.itemId : ''
            }
            const res = await OpportunityDetailsApi.deleteItem(params);
            reloadOpportunity();
        }else {
            dispatch(openOpportunityForm({open:true,groupName:action, data: data}))
        }
    }

    const deleteContact = async (params:models.DeleteCustomerContactParams) => {
        const response = await AddOpportunityApi.deleteContact(params);
        reloadOpportunity();
     }
 
     const reloadOpportunity = () => {
        fetchOpportunityDetails(opptyId);

    }


    return (
        <>
            <Header page={1}/>
            { loading ?  <Loader component='opportunity'/> :
                <section className="main-wrapper opportunity">
                <div className="container-fluid">
                    <NavSection backToOpportunityList={backToOpportunityList}  popover={popover} />
                    {defaultOpptyDetail ? <OpportunityInfo data={defaultOpptyDetail} /> : null}
                    {defaultOpptyDetail ? <OpportunityInfoMobile data={defaultOpptyDetail} /> : null}
                    <section className="sec-info-accordion">
                        {opptyDataBasicGroup?.length ? <InfoAccordion title={'Basics'} data={opptyDataBasicGroup} openEditOpportunity={openOpportunityBasicEdit} /> : null}
                        {isDesktop && opptyDataMoreInfoGroup ? <InfoAccordionGroups title={'More Information'} data={opptyDataMoreInfoGroup} openEditForm={openEditForm}/> : null} 
                        {(isTablet || isMobile) && opptyDataMoreInfoGroup ? <AccordianForMobileWithGroups title={'More Information'} data={opptyDataMoreInfoGroup} openEditForm={openEditForm}/> : null} 
                        

                        <ProductAccordian title={'Products & Modules'} data={opptyDataProductInfo} openAddItemForm={openAddItemForm} />
                        <ContactAccordian title={'Contacts'} data={opptyDataContactInfo} openAddContactForm={openAddContactForm} deleteContact={deleteContact} />                         
                    </section>
                </div>
            </section> }
            <Footer />
            <Container reloadOpportunityDetailsPage={reloadOpportunity}/>
        </>
    )
}

export default OpportunityDetails;
