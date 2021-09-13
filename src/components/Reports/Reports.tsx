import React from 'react';
import { Dispatch } from 'redux';
import { isArray } from 'lodash';
import { CSVLink } from 'react-csv';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import { CustomerReport } from './CustomerReport';
import { OpportunityReport } from './OpportunityReport';
import FooterMobile from '../Shared/Footer/FooterMobile';
import * as apiModels from '../../helpers/Api/models';
import { ReportsOpptyList } from '../../helpers/Api/ReportsOpptyList';
import { AppState } from '../../store/store';
import { setBusinessPartnerLoader } from '../../store/AddCustomer/Actions';
import Loader from '../Shared/Loader/Loader';
import { getEndDateOfQuarterAndYear, getStartDateOfQuarterAndYear } from '../../helpers/utilities/lib';

const Reports: React.FC = () => {
  const state: AppState = useSelector((reportState: AppState) => reportState);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const dispatch: Dispatch<any> = useDispatch();
  const [showOpportunityResults, setShowOpportunityResults] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState<string>('Opportunity');
  const [opportunityList, setReportsOpptyBasicList] = React.useState<apiModels.ReportOpptyList[]>([]);
  const [opptyProdList, setReportsopptyProdList] = React.useState<apiModels.ReportOpptyList[]>([]);
  const [opptyContList, setReportsopptyContList] = React.useState<apiModels.ReportOpptyList[]>([]);

  const csvLinkRef = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const csvProdRef = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const csvContRef = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const onClickOpptReport = (opptReport: string) => {
    setSelectedReport(opptReport);
    setShowCustomerResults(false);
    setShowOpportunityResults(true);
  };
  const [showCustomerResults, setShowCustomerResults] = React.useState(false);
  const onClickCustomerReport = (custReport: string) => {
    setSelectedReport(custReport);
    setShowOpportunityResults(false);
    setShowCustomerResults(true);
  };

  React.useEffect(() => {
    setShowOpportunityResults(true);
  }, []);
  const OpportunityButton = selectedReport === 'Opportunity' ? ' active' : '';
  const CustomerButton = selectedReport === 'Customer' ? ' active' : '';
  const fetchOpptyList = async () => {
    dispatch(setBusinessPartnerLoader(true));
    const params: apiModels.SelectedFilters = JSON.parse(JSON.stringify(state.reports.opportunityReportsParams));
    const dateParams = params.selectCloseDate.map((CloseDate: string) => {
      return {
        dateFrom: getStartDateOfQuarterAndYear(CloseDate.substr(CloseDate.length - 1), CloseDate.substring(0, 4)),
        dateTo: getEndDateOfQuarterAndYear(CloseDate.substr(CloseDate.length - 1), CloseDate.substring(0, 4)),
      };
    });
    const opptyReportRequestParams: apiModels.ReportRequestParams = {
      selectOppRecordType: params.selectOppRecordType,
      selectStage: params.selectStage,
      selectForecastCategory: params.selectForecastCategory,
      selectCloseDate: dateParams,
    };
    const data: any = await ReportsOpptyList.get(opptyReportRequestParams);
    const opptReportsData = data.map((rptobj: apiModels.ReportOpptyList) => {
      const getCsvValues = (objValue: any) => {
        if (isArray(objValue)) {
          return Array.prototype.map
            .call(objValue, function csvFormat(csvobj) {
              return csvobj;
            })
            .join(',');
        } else {
          return objValue;
        }
      };

      return {
        opportunityId: rptobj.opportunityId,
        desc: rptobj.desc,
        customer: rptobj.customer,
        name: rptobj.name,
        handler: rptobj.handler,
        salesman: rptobj.salesman,
        area: rptobj.area,
        stage: rptobj.stage,
        probability: rptobj.probability,
        reason: rptobj.reason,
        estValue: rptobj.estValue,
        currency: rptobj.currency,
        activ: rptobj.activ,
        rootId: rptobj.rootId,
        oppRecordType: rptobj.oppRecordType,
        forecastCategory: rptobj.forecastCategory,
        exchangeRate: rptobj.exchangeRate,
        estValueSys: rptobj.estValueSys,
        approvalStatus: rptobj.approvalStatus,
        logExist: rptobj.logExist,
        noteExist: rptobj.noteExist,
        contactExist: rptobj.contactExist,
        taskExist: rptobj.taskExist,
        itemExist: rptobj.itemExist,
        attributeExist: rptobj.attributeExist,
        ACTION_PENDING: rptobj.ACTION_PENDING,
        CLOUD_OPP_SIZING: getCsvValues(rptobj.CLOUD_OPP_SIZING),
        CLOUD_Y1: getCsvValues(rptobj.CLOUD_Y1),
        CLOUD_Y2: getCsvValues(rptobj.CLOUD_Y2),
        CLOUD_Y3: getCsvValues(rptobj.CLOUD_Y3),
        CLOUD_Y4: getCsvValues(rptobj.CLOUD_Y4),
        CLOUD_Y5: getCsvValues(rptobj.CLOUD_Y5),
        CLOUD_Y6: getCsvValues(rptobj.CLOUD_Y6),
        CLOUD_Y7: getCsvValues(rptobj.CLOUD_Y7),
        CMP_ONE_OFF_FEE: getCsvValues(rptobj.CMP_ONE_OFF_FEE),
        CMS_PRESALE_CONS: getCsvValues(rptobj.CMS_PRESALE_CONS),
        CONTACT_TERM_M: getCsvValues(rptobj.CONTACT_TERM_M),
        ENTER_ILF_OPP_VALUE: getCsvValues(rptobj.ENTER_ILF_OPP_VALUE),
        LEADSOURCE: getCsvValues(rptobj.LEADSOURCE),
        LICENSE_CATEGORY: getCsvValues(rptobj.LICENSE_CATEGORY),
        LICENSE_SUM: getCsvValues(rptobj.LICENSE_SUM),
        MAINT_SUPP_FIRST_Y: getCsvValues(rptobj.MAINT_SUPP_FIRST_Y),
        NEXTSTEP: getCsvValues(rptobj.NEXTSTEP),
        PARTNER: getCsvValues(rptobj.PARTNER),
        PBU: getCsvValues(rptobj.PBU),
        PRESALE_CONULTANT: getCsvValues(rptobj.PRESALE_CONULTANT),
        PS_REVENUE_GENERATED: getCsvValues(rptobj.PS_REVENUE_GENERATED),
        REGION: getCsvValues(rptobj.REGION),
        REP_ANNUAL_REVE_CMS: getCsvValues(rptobj.REP_ANNUAL_REVE_CMS),
        REP_ANNUAL_REVE_CS: getCsvValues(rptobj.REP_ANNUAL_REVE_CS),
        REP_ANNUAL_REVENUE: getCsvValues(rptobj.REP_ANNUAL_REVENUE),
        RLF_VALUE: getCsvValues(rptobj.RLF_VALUE),
        SUBSCRIPTION_Y1: getCsvValues(rptobj.SUBSCRIPTION_Y1),
        SUBSCRIPTION_Y2: getCsvValues(rptobj.SUBSCRIPTION_Y2),
        SUBSCRIPTION_Y3: getCsvValues(rptobj.SUBSCRIPTION_Y3),
        SUBSCRIPTION_Y4: getCsvValues(rptobj.SUBSCRIPTION_Y4),
        SUBSCRIPTION_Y5: getCsvValues(rptobj.SUBSCRIPTION_Y5),
        SUBSCRIPTION_Y6: getCsvValues(rptobj.SUBSCRIPTION_Y6),
        SUBSCRIPTION_Y7: getCsvValues(rptobj.SUBSCRIPTION_Y7),
        TEST_NUMERIC_MANDATO: getCsvValues(rptobj.TEST_NUMERIC_MANDATO),
        THIRD_PARTY_COGS: getCsvValues(rptobj.THIRD_PARTY_COGS),
      };
    });
    const opptReportsProdData = data.map((pobj: apiModels.ReportOpptyList) => {
      return (
        pobj.products &&
        pobj.products.map((prodpobj: apiModels.ProductList) => {
          return {
            opportunityId: pobj.opportunityId,
            itemId: prodpobj.itemId,
            itemDescription: prodpobj.itemDescription,
            lineNumber: prodpobj.lineNumber,
            item: prodpobj.item,
            ourPrice: prodpobj.ourPrice,
            systemPrice: prodpobj.systemPrice,
            quantity: prodpobj.quantity,
            unit: prodpobj.unit,
            isFreeOfCharge: prodpobj.isFreeOfCharge,
          };
        })
      );
    });

    const prodObj = opptReportsProdData.flat().filter(function prod(element: any) {
      return element !== undefined;
    });

    const opptReportsContData = data.map((cobj: apiModels.ReportOpptyList) => {
      return (
        cobj.contacts &&
        cobj.contacts.map((contObj: apiModels.ContactsList) => {
          return {
            opportunityId: cobj.opportunityId,
            contactId: contObj.contactId,
            contactPerson: contObj.contactPerson,
            contactDC: contObj.contactDC,
            email: contObj.email,
            phone: contObj.phone,
            mobile: contObj.mobile,
            fax: contObj.fax,
          };
        })
      );
    });

    const contactObj = opptReportsContData.flat().filter(function contact(element: any) {
      return element !== undefined;
    });
    setReportsOpptyBasicList(opptReportsData);
    setReportsopptyProdList(prodObj);
    setReportsopptyContList(contactObj);
    csvLinkRef?.current?.link.click();
    csvProdRef?.current?.link.click();
    csvContRef?.current?.link.click();
    dispatch(setBusinessPartnerLoader(false));
  };

  const onDownloadReport = () => {
    fetchOpptyList();
  };

  const opptHeaders = [
    { label: 'Opportunity Id', key: 'opportunityId' },
    { label: 'Desc', key: 'desc' },
    { label: 'Customer', key: 'customer' },
    { label: 'Name', key: 'name' },
    { label: 'Owner', key: 'handler' },
    { label: 'Salesman', key: 'salesman' },
    { label: 'Area', key: 'area' },
    { label: 'Stage', key: 'stage' },
    { label: 'Probability', key: 'probability' },
    { label: 'Reason', key: 'reason' },
    { label: 'Estimated Value', key: 'estValue' },
    { label: 'Currency', key: 'currency' },
    { label: 'Active', key: 'activ' },
    { label: 'RootId', key: 'rootId' },
    { label: 'Opportunity Record Type', key: 'oppRecordType' },
    { label: 'Forecast Category', key: 'forecastCategory' },
    { label: 'ExchangeRate', key: 'exchangeRate' },
    { label: 'EstValueSys', key: 'estValueSys' },
    { label: 'ApprovalStatus', key: 'approvalStatus' },
    { label: 'LogExist', key: 'logExist' },
    { label: 'NoteExist', key: 'noteExist' },
    { label: 'ContactExist', key: 'contactExist' },
    { label: 'TaskExist', key: 'taskExist' },
    { label: 'ItemExist', key: 'itemExist' },
    { label: 'AttributeExist', key: 'attributeExist' },
    { label: 'ACTION_PENDING', key: 'ACTION_PENDING' },
    { label: 'CLOUD_OPP_SIZING', key: 'CLOUD_OPP_SIZING' },
    { label: 'CLOUD_Y1', key: 'CLOUD_Y1' },
    { label: 'CLOUD_Y2', key: 'CLOUD_Y2' },
    { label: 'CLOUD_Y3', key: 'CLOUD_Y3' },
    { label: 'CLOUD_Y4', key: 'CLOUD_Y4' },
    { label: 'CLOUD_Y5', key: 'CLOUD_Y5' },
    { label: 'CLOUD_Y6', key: 'CLOUD_Y6' },
    { label: 'CLOUD_Y7', key: 'CLOUD_Y7' },
    { label: 'CMP_ONE_OFF_FEE', key: 'CMP_ONE_OFF_FEE' },
    { label: 'CMS_PRESALE_CONS', key: 'CMS_PRESALE_CONS' },
    { label: 'CONTACT_TERM_M', key: 'CONTACT_TERM_M' },
    { label: 'ENTER_ILF_OPP_VALUE', key: 'ENTER_ILF_OPP_VALUE' },
    { label: 'LEADSOURCE', key: 'LEADSOURCE' },
    { label: 'LICENSE_CATEGORY', key: 'LICENSE_CATEGORY' },
    { label: 'LICENSE_SUM', key: 'LICENSE_SUM' },
    { label: 'MAINT_SUPP_FIRST_Y', key: 'MAINT_SUPP_FIRST_Y' },
    { label: 'NEXTSTEP', key: 'NEXTSTEP' },
    { label: 'PARTNER', key: 'PARTNER' },
    { label: 'PBU', key: 'PBU' },
    { label: 'PRESALE_CONULTANT', key: 'PRESALE_CONULTANT' },
    { label: 'PS_REVENUE_GENERATED', key: 'PS_REVENUE_GENERATED' },
    { label: 'REGION', key: 'REGION' },
    { label: 'REP_ANNUAL_REVE_CMS', key: 'REP_ANNUAL_REVE_CMS' },
    { label: 'REP_ANNUAL_REVE_CS', key: 'REP_ANNUAL_REVE_CS' },
    { label: 'REP_ANNUAL_REVENUE', key: 'REP_ANNUAL_REVENUE' },
    { label: 'RLF_VALUE', key: 'RLF_VALUE' },
    { label: 'SUBSCRIPTION_Y1', key: 'SUBSCRIPTION_Y1' },
    { label: 'SUBSCRIPTION_Y2', key: 'SUBSCRIPTION_Y2' },
    { label: 'SUBSCRIPTION_Y3', key: 'SUBSCRIPTION_Y3' },
    { label: 'SUBSCRIPTION_Y4', key: 'SUBSCRIPTION_Y4' },
    { label: 'SUBSCRIPTION_Y5', key: 'SUBSCRIPTION_Y5' },
    { label: 'SUBSCRIPTION_Y6', key: 'SUBSCRIPTION_Y6' },
    { label: 'SUBSCRIPTION_Y7', key: 'SUBSCRIPTION_Y7' },
    { label: 'TEST_NUMERIC_MANDATO', key: 'TEST_NUMERIC_MANDATO' },
    { label: 'THIRD_PARTY_COGS', key: 'THIRD_PARTY_COGS' },
  ];

  const opptProdHeaders = [
    { label: 'Opportunity Id', key: 'opportunityId' },
    { label: 'Item Id', key: 'itemId' },
    { label: 'Item Desc', key: 'itemDescription' },
    { label: 'Line Number', key: 'lineNumber' },
    { label: 'Item', key: 'item' },
    { label: 'ourPrice', key: 'ourPrice' },
    { label: 'systemPrice', key: 'systemPrice' },
    { label: 'quantity', key: 'quantity' },
    { label: 'unit', key: 'unit' },
    { label: 'isFreeOfCharge', key: 'isFreeOfCharge' },
  ];

  const opptContHeaders = [
    { label: 'Opportunity Id', key: 'opportunityId' },
    { label: 'Contact Id', key: 'contactId' },
    { label: 'contact Person', key: 'contactPerson' },
    { label: 'Contact DC', key: 'contactDC' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Mobile', key: 'mobile' },
    { label: 'Fax', key: 'fax' },
  ];

  return (
    <>
      <Header page={3} />
      {state.addBusinessPartner.loader && <Loader component="opportunity" />}
      <div className="section-reports">
        <div className="d-flex justify-content-between action-btns-row">
          <div className="lft-col">
            <input
              type="button"
              className={`report-btns${OpportunityButton}`}
              value="Opportunity Report"
              onClick={() => onClickOpptReport('Opportunity')}
            />
            <input
              type="button"
              className={`report-btns${CustomerButton}`}
              value="Customer Report"
              onClick={() => onClickCustomerReport('Customer')}
            />
          </div>
          <div className="rgt-col">
            <input type="button" className="download-csv-btn" value="Download CSV" onClick={() => onDownloadReport()} />
            {showOpportunityResults ? (
              <>
                <CSVLink ref={csvLinkRef} data={opportunityList} filename="OpportunityReport.csv" headers={opptHeaders} />
                <CSVLink ref={csvProdRef} data={opptyProdList} filename="OpportunityReport-products.csv" headers={opptProdHeaders} />
                <CSVLink ref={csvContRef} data={opptyContList} filename="OpportunityReport-contacts.csv" headers={opptContHeaders} />
              </>
            ) : null}
          </div>
        </div>

        <div className="actioncards-container">
          {showOpportunityResults ? <OpportunityReport /> : null}
          {showCustomerResults ? <CustomerReport /> : null}
        </div>
        <input type="button" className="mob-download-csv-btn" value="CSV" onClick={() => onDownloadReport()} />
        {showOpportunityResults ? (
          <>
            <CSVLink ref={csvLinkRef} data={opportunityList} filename="OpportunityReport.csv" headers={opptHeaders} />
            <CSVLink ref={csvProdRef} data={opptyProdList} filename="OpportunityReport-products.csv" headers={opptProdHeaders} />
            <CSVLink ref={csvContRef} data={opptyContList} filename="OpportunityReport-contacts.csv" headers={opptContHeaders} />
          </>
        ) : null}
      </div>

      {isDesktop ? <Footer /> : null}
      {isMobile || isTablet ? <FooterMobile page={3} /> : null}
    </>
  );
};

export default Reports;
