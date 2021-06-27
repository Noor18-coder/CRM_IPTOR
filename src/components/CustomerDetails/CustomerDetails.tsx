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

    React.useEffect(() => {
        CustomerDetailsApi.get(custId).then((data) => {
            setDefaultCustDetails(data);
        });

},[]);
        return (
            <>
            <Header page={1}/>
            <section className="main-wrapper opportunity">
            <div className="container-fluid">
                {defaultCustDetail ? <CustomerInfo data={defaultCustDetail} /> : null}
                {defaultCustDetail ? <CustomerCard data={defaultCustDetail} /> : null}
            </div>
            </section>
            <Footer />
            </>
        
        )
}

export default CustomerDetails;