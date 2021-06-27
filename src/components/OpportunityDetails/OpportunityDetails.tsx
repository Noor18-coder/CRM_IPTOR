import React from 'react'
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import InfoAccordion from './InfoAccordion';
import OpportunityActions from './OpportunityActions';
import OpportunityInfo from './OpportunityInfo';
import OpportunityInfoMobile from './OpportunityInfoMobile';
import { OpportunityDetailsDefault, OpportunityDetailsGroupItem } from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import {useHistory} from "react-router-dom";

const OpportunityDetails: React.FC = (props: any) => {
    const opptyId = props.location.state.oppid;
    const [defaultOpptyDetail, setDefaultOpptyDetails] = React.useState<OpportunityDetailsDefault>();
    const [opptyDataBasicGroup, setOpptyDataForBasicInfoGroup] = React.useState<OpportunityDetailsGroupItem[]>();
    const [opptyDataMoreInfoGroup, setOpptyDataForMoreInfoGroup] = React.useState<OpportunityDetailsGroupItem[]>();



    React.useEffect(() => {
        OpportunityDetailsApi.get(opptyId).then((data) => setDefaultOpptyDetails(data));
        OpportunityDetailsApi.getGroupInfo(opptyId).then((data) => {
            const response = data.filter((obj) => obj.group.toLowerCase() === 'more info');
            setOpptyDataForMoreInfoGroup(response);
            const responses = data.filter((obj) => obj.group.toLowerCase() === 'basic info');
            setOpptyDataForBasicInfoGroup(responses);
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
                        {opptyDataMoreInfoGroup ? <InfoAccordion title={'Product & Modules'} data={opptyDataMoreInfoGroup} /> : null}
                        {opptyDataMoreInfoGroup ? <InfoAccordion title={'Contacts'} data={opptyDataMoreInfoGroup} /> : null}
                    </section>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default OpportunityDetails;
