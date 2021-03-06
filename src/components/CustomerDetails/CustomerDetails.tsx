import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import CustomerCard from './CustomerCard';
import CustomerInfo from './CustomerInfo';
import * as models from '../../helpers/Api/models';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import Container from '../AddOpportunity/Container';
import { AppState } from '../../store/store';
import { saveBusinessPartnerContacts, saveCustomerDefaultFields } from '../../store/AddCustomer/Actions';

const CustomerDetails: React.FC<any> = (props: any) => {
  const customerState: AppState = useSelector((EditState: AppState) => EditState);
  const dispatch: Dispatch<any> = useDispatch();
  const {
    location: { state },
  } = props;
  const custId = state ? state.custId : '';
  const [defaultCustDetail, setDefaultCustDetails] = React.useState<any>(customerState.addBusinessPartner.businessPartnerDefaultFields);
  const [contactDetails, setContactDetails] = React.useState<models.CustomerDetailsContactsGroupItem[]>(customerState.addBusinessPartner.contacts);

  React.useEffect(() => {
    CustomerDetailsApi.get(custId).then((data) => {
      setDefaultCustDetails(data);
    });
    CustomerDetailsApi.getAllContactDetails(custId).then((data) => {
      setContactDetails(data);
    });
  }, []);

  React.useEffect(() => {
    if (contactDetails) {
      dispatch(saveBusinessPartnerContacts(contactDetails));
    }
  }, [contactDetails]);

  React.useEffect(() => {
    if (defaultCustDetail) {
      dispatch(saveCustomerDefaultFields(defaultCustDetail));
    }
  }, [defaultCustDetail]);

  return (
    <>
      <Header page={2} />
      <section className="main-wrapper customer">
        <div className="container-fluid">
          {defaultCustDetail ? <CustomerInfo data={customerState.addBusinessPartner.businessPartnerDefaultFields} /> : null}
          {defaultCustDetail ? (
            <CustomerCard
              data={customerState.addBusinessPartner.businessPartnerDefaultFields}
              contactsData={customerState.addBusinessPartner.contacts}
            />
          ) : null}
        </div>
      </section>
      <Footer />
      <Container customerName={defaultCustDetail?.name} customerId={custId} />
    </>
  );
};

export default CustomerDetails;
