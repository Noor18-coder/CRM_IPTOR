import React from 'react'
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import CustomerCard from './CustomerCard'
import CustomerInfo from './CustomerInfo'
import * as models from '../../helpers/Api/models';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';

const CustomerDetails: React.FC = (props: any) => {
    const custId = props.location.state.custId;
    const [defaultCustDetail, setDefaultCustDetails] = React.useState<models.CustomerDetailsDefault>();
    const [contactDetails, setContactDetails] = React.useState<models.CustomerDetailsContactsGroupItem[]>([]);

    React.useEffect(() => {
        CustomerDetailsApi.get(custId).then((data) => {
            setDefaultCustDetails(data);
        });
        CustomerDetailsApi.getAllContactDetails(custId).then((data) => {
            setContactDetails(data);
        });

},[]);
        return (
            <>
            <Header page={2}/>
            <section className="main-wrapper customer">
            <div className="container-fluid">
                {defaultCustDetail ? <CustomerInfo data={defaultCustDetail} /> : null}
                {defaultCustDetail ? <CustomerCard data={defaultCustDetail} contactsData={contactDetails}/> : null}
            </div>
            </section>
            <Footer />
            </>
        
        )
}

export default CustomerDetails;