import React from 'react'
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import {InfoAccordion, Accordian} from './InfoAccordion';
import OpportunityActions from './OpportunityActions';
import OpportunityInfo from './OpportunityInfo';
import OpportunityInfoMobile from './OpportunityInfoMobile';
import * as models from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import {useHistory} from "react-router-dom";


const OpportunityDetails: React.FC = (props: any) => {
    const opptyId = props.location.state.oppid;
    const [defaultOpptyDetail, setDefaultOpptyDetails] = React.useState<models.OpportunityDetailsDefault>();
    const [opptyDataBasicGroup, setOpptyDataForBasicInfoGroup] = React.useState<models.OpportunityDetailsGroupItem[]>();
    const [opptyDataMoreInfoGroup, setOpptyDataForMoreInfoGroup] = React.useState<models.OpportunityDetailsGroupItem[]>();
    const [opptyDataContactInfo, setOpptyDataContactInfo] = React.useState<models.OpportunityContact[]>([]);
    const [opptyDataProductInfo, setOpptyDataProductInfo] = React.useState<models.Product[]>([]);
    
    React.useEffect(() => {
        OpportunityDetailsApi.get(opptyId).then((data) => setDefaultOpptyDetails(data));
        OpportunityDetailsApi.getGroupInfo(opptyId).then((data) => {
            const groups = new Set(data.map((obj) => { return obj.group }));
            const response = data.filter((obj) => obj.group.toLowerCase() === 'more info');
            setOpptyDataForMoreInfoGroup(response);
            const responses = data.filter((obj) => obj.group.toLowerCase() === 'basic info');
            setOpptyDataForBasicInfoGroup(responses);
        });
        OpportunityDetailsApi.getOpportunityContact(opptyId).then((data) => {
            setOpptyDataContactInfo(data);
        });

        OpportunityDetailsApi.getOpportunityItems(opptyId).then((data) => {
            setOpptyDataProductInfo(data)
        });
        
    }, []);

    const history = useHistory();
    const backToOpportunityList= () => {
        history.goBack()
      }

    return (
        <>
            <Header />
            <section className="main-wrapper opportunity">
                <div className="container-fluid">
                    <OpportunityActions backToOpportunityList={backToOpportunityList} />
                    {defaultOpptyDetail ? <OpportunityInfo data={defaultOpptyDetail} /> : null}
                    {defaultOpptyDetail ? <OpportunityInfoMobile data={defaultOpptyDetail} /> : null}
                    <section className="sec-info-accordion">
                        {opptyDataBasicGroup ? <InfoAccordion title={'Basics'} data={opptyDataBasicGroup} /> : null}
                        {opptyDataMoreInfoGroup ? <InfoAccordion title={'More Information'} data={opptyDataMoreInfoGroup} /> : null}
                        <Accordian title={'Products & Modules'} data={opptyDataProductInfo} />
                        <Accordian title={'Contacts'} data={opptyDataContactInfo} />                         
                    </section>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default OpportunityDetails;
