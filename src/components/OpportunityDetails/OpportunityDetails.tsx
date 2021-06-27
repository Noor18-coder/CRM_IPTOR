import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../store/store";
import { UsersData } from '../../store/Users/Types';

import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import { InfoAccordion , InfoAccordionGroups} from './InfoAccordion';
import { ContactAccordian } from '../OpportunityDetails/ContactDetails';
import { ProductAccordian } from '../OpportunityDetails/ProductDetails';
import OpportunityActions from './OpportunityActions';
import OpportunityInfo from './OpportunityInfo';
import OpportunityInfoMobile from './OpportunityInfoMobile';
import * as models from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';


const OpportunityDetails: React.FC = (props: any) => {
    const usersData: UsersData = useSelector((state: AppState) => state.users);

    const opptyId = props.location.state.oppid;
    const [defaultOpptyDetail, setDefaultOpptyDetails] = React.useState<models.OpportunityDetailsDefault>();
    const [opptyDataBasicGroup, setOpptyDataForBasicInfoGroup] = React.useState<models.OpportunityDetailsBasicInfo[]>();
    const [opptyDataMoreInfoGroup, setOpptyDataForMoreInfoGroup] = React.useState<models.IStringList>();
    const [opptyDataContactInfo, setOpptyDataContactInfo] = React.useState<models.OpportunityContact[]>([]);
    const [opptyDataProductInfo, setOpptyDataProductInfo] = React.useState<models.Product[]>([]);

    const getName = (str: string) => {
        const userObj = usersData.users.find((obj) => obj.handler === str);
        return userObj?.description ? userObj?.description : '';
    }

    React.useEffect(() => {
        OpportunityDetailsApi.get(opptyId).then((data) => {
            setDefaultOpptyDetails(data);
            getBasicInfo(data);
        });


    OpportunityDetailsApi.getGroupInfo(opptyId).then((data) => {
        const groups = new Set(data.map((obj) => { return obj.group }));
        let response:any = {};
        groups.forEach((group:string) => {
            const groupName = group.toLowerCase();
            response[groupName] = data.filter((obj) => obj.group.toLowerCase() === groupName);
        });
        setOpptyDataForMoreInfoGroup(response);
    });
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
                case 'oppRecordType': data.push({ description: 'Record Type', 'attributeValue': value }); break;
                case 'estimatedValue': data.push({ description: 'Opp Value', 'attributeValue': value + '' }); break;
            }
        });
        setOpptyDataForBasicInfoGroup(data);

    }

    const history = useHistory();
    const backToOpportunityList= () => {
        history.goBack()
      }

    return (
        <>
            <Header page={1}/>
            <section className="main-wrapper opportunity">
                <div className="container-fluid">
                    <OpportunityActions backToOpportunityList={backToOpportunityList} />
                    {defaultOpptyDetail ? <OpportunityInfo data={defaultOpptyDetail} /> : null}
                    {defaultOpptyDetail ? <OpportunityInfoMobile data={defaultOpptyDetail} /> : null}
                    <section className="sec-info-accordion">
                        {opptyDataBasicGroup?.length ? <InfoAccordion title={'Basics'} data={opptyDataBasicGroup} /> : null}
                        {opptyDataMoreInfoGroup ? <InfoAccordionGroups title={'More Information'} data={opptyDataMoreInfoGroup} /> : null}
                        <ProductAccordian title={'Products & Modules'} data={opptyDataProductInfo} />
                        <ContactAccordian title={'Contacts'} data={opptyDataContactInfo} />                         
                    </section>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default OpportunityDetails;
