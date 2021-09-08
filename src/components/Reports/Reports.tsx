import React from "react";
import { Dispatch } from "redux";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";
import { CustomerReport } from "./CustomerReport";
import { OpportunityReport } from "./OpportunityReport";
import { CSVLink }  from "react-csv";
import FooterMobile from '../Shared/Footer/FooterMobile';
import { useMediaQuery } from 'react-responsive';
import { OpportunityListItem, BusinessPartnerListItem} from '../../helpers/Api/models';
import OpportunityList from '../../helpers/Api/OpportunityList';
import { AuthState } from '../../store/Auth/Types';
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";
import { setBusinessPartnerLoader } from '../../store/AddCustomer/Actions';
import Loader from '../Shared/Loader/Loader';
import BusinessPartnerList from '../../helpers/Api/CustomerList';
// import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
// import * as models from '../../helpers/Api/models';

const Reports: React.FC = () => {
  const state: AppState = useSelector((state: AppState) => state);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const dispatch: Dispatch<any> = useDispatch();
  const authState: AuthState = useSelector((state: AppState) => state.auth);
  const [showOpportunityResults, setShowOpportunityResults] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState<string>('Opportunity');
  const [oppportunityList,setOpportunityList] = React.useState<OpportunityListItem[]>([]);
  const [customerList,setcustomerList] = React.useState<BusinessPartnerListItem[]>([]);
  // const [mopAttributes, setMopAttributes] = React.useState<models.AttributeValueObject[]>([]);
  const onClickOpptReport = (selectedReport:string) => {
    setSelectedReport(selectedReport);
    setShowCustomerResults(false);
    setShowOpportunityResults(true);
  };
  const [showCustomerResults, setShowCustomerResults] = React.useState(false);
  const onClickCustomerReport = (selectedReport:string) => {
    setSelectedReport(selectedReport);
    setShowOpportunityResults(false);
    setShowCustomerResults(true);
  };
  
  React.useEffect(() => {
    setShowOpportunityResults(true);
    fetchOpptyList();
    fetchCustomerList();
  }, []);
  const OpportunityButton = 'Opportunity' === selectedReport ? " active" : "";
  const CustomerButton = 'Customer' === selectedReport ? " active" : "";
  const fetchOpptyList = async () => {
    dispatch(setBusinessPartnerLoader(true));
    const data: any = await OpportunityList.get(authState.user.handler,'');
    const opptReportsData = data.data.items.map((obj:OpportunityListItem) =>  { return { opportunityId: obj.opportunityId,
        desc: obj.desc, customer:obj.customer, name: obj.name, handler:obj.handler, salesman:obj.salesman , area:obj.area,
        stage:obj.stage, probability:obj.probability, reason:obj.reason, estValue:obj.estValue,
        curValue:obj.curValue, currency:obj.currency, activ:obj.activ}});
        setOpportunityList(opptReportsData);
        dispatch(setBusinessPartnerLoader(false)); 
    }

  const fetchCustomerList = async () => {
    dispatch(setBusinessPartnerLoader(true));
      const data: any = await BusinessPartnerList.get('');
      const custReportsData = data.data.items.map((obj:BusinessPartnerListItem) =>  { return { businessPartner: obj.businessPartner,
          description: obj.description, type:obj.type, internalName: obj.internalName, area:obj.area, addressLine1:obj.addressLine1, 
          addressLine2:obj.addressLine2,addressLine3:obj.addressLine3, addressLine4:obj.addressLine4, country:obj.country,
          postalCode:obj.postalCode, phone:obj.phone, industry:obj.industry, owner:obj.owner, 
          numberOfActiveOpportunities:obj.numberOfActiveOpportunities, active:obj.active}});
          setcustomerList(custReportsData); 
          dispatch(setBusinessPartnerLoader(false)); 
      }

  const opptHeaders = [
    {label:"Opportunity Id",key:"opportunityId"},
    {label:"Desc",key:"desc"},
    {label:"Customer",key:"customer" },
    {label:"Name", key: 'name'},
    {label:"Owner", key: 'handler'},
    {label:"Salesman", key: 'salesman'},
    {label:"Area" , key: 'area'},
    {label:"Stage", key: 'stage'},
    {label:"Probability", key: 'probability'},
    {label:"Reason", key: 'reason'},
    {label:"Estimated Value", key: 'estValue'},
    {label:"Current Value", key: 'curValue'},
    {label:"Currency", key: 'currency'},
    {label:"Active", key: 'activ'},
  ]
  
    const opptCsvReport = {
      filename: 'OpportunityReport.csv',
      headers: opptHeaders,
      data: oppportunityList
    }

    const custHeaders = [
      {label:"BusinessPartner Id",key:"businessPartner"},
      {label:"Description",key:"description"},
      {label:"Type",key:"type" },
      {label:"Name", key: 'internalName'},
      {label:"Area", key: 'area'},
      {label:"AddressLine1", key: 'addressLine1'},
      {label:"AddressLine2" , key: 'addressLine2'},
      {label:"AddressLine3", key: 'addressLine3'},
      {label:"AddressLine4", key: 'addressLine4'},
      {label:"Country", key: 'country'},
      {label:"Postal Code", key: 'postalCode'},
      {label:"Phone", key: 'phone'},
      {label:"Industry", key: 'industry'},
      {label:"Owner", key: 'owner'},
      {label:"Number Of ActiveOpportunities", key: 'numberOfActiveOpportunities'},
      {label:"Active", key: 'active'},
    ]
    
      const custCsvReport = {
        filename: 'CustomerReport.csv',
        headers: custHeaders,
        data: customerList
      }
    // Promise.all(oppportunityList.map((id: any) => {
    //   return OpportunityDetailsApi.getGroupInfo(id.opportunityId);
    // })).then((attributesData) => {
    //   console.log("attributesData",attributesData)
    //   // setMopAttributes(attributesData);
    //   return attributesData;
    // });

  return (
    <>
      <Header page={3} />
      {state.addBusinessPartner.loader && <Loader component='opportunity' />}
      <div className="section-reports">
        <div className="d-flex justify-content-between action-btns-row">
          <div className="lft-col">
            <input type="button" className={"report-btns" +OpportunityButton} value="Opportunity Report" onClick={()=>onClickOpptReport("Opportunity")}/>
            <input type="button" className={"report-btns" +CustomerButton} value="Customer Report" onClick={()=>onClickCustomerReport("Customer")}
            />
          </div>
          <div className="rgt-col">
          {showOpportunityResults ? <CSVLink className="download-csv-btn" {...opptCsvReport}> Download CSV</CSVLink> : null}
          {showCustomerResults ?   <CSVLink className="download-csv-btn" {...custCsvReport}> Download CSV</CSVLink> : null}
          </div>
        </div>

        <div className="actioncards-container">
          {showOpportunityResults ? <OpportunityReport /> : null}
          {showCustomerResults ? <CustomerReport /> : null}
        </div>

        {showOpportunityResults ?  <CSVLink className="mob-download-csv-btn" {...opptCsvReport}>CSV</CSVLink> : null}
        {showCustomerResults ?  <CSVLink className="mob-download-csv-btn" {...custCsvReport}>CSV</CSVLink> : null}
      </div>
   
      { isDesktop ? <Footer /> : null }
      { (isMobile || isTablet) ? <FooterMobile page={4} /> : null }
    </>
  );
};

export default Reports;
