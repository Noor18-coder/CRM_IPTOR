import React from 'react'
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import DetailsContent from './DetailsContent';
import { OpportunityDetailsMock} from '../../mocks/OpportunityDetails.mock';

const OpportunityDetails :React.FC = () => {
const OppDetails = OpportunityDetailsMock.getOpportunityByID();
   return (
        <div>
        <Header></Header>
        <DetailsContent data={OppDetails}></DetailsContent>
        <Footer></Footer>
        </div>
       
    )
}

export default OpportunityDetails
