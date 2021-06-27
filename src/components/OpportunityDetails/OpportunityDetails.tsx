import React from 'react'
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import InfoAccordion from './InfoAccordion';
import Actions from './Actions';
import OpportunityInfo from './OpportunityInfo';
import OpportunityInfoMobile from './OpportunityInfoMobile';
import { OpportunityDetailsDefault, OpportunityDetailsGroupItem } from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';

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


    return (
        <>
            <Header />
            <section className="main-wrapper opportunity">
                <div className="container-fluid">
                    <Actions />
                    {defaultOpptyDetail ? <OpportunityInfo data={defaultOpptyDetail} /> : null}
                    {defaultOpptyDetail ? <OpportunityInfoMobile data={defaultOpptyDetail} /> : null}
                    <section className="sec-info-accordion">
                        {opptyDataBasicGroup ? <InfoAccordion title={'Basic Info'} data={opptyDataBasicGroup} /> : null}
                        {opptyDataMoreInfoGroup ? <InfoAccordion title={'More Info'} data={opptyDataMoreInfoGroup} /> : null}
                    </section>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default OpportunityDetails;
