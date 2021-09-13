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
import BusinessPartnerList from '../../helpers/Api/CustomerList';
import { Constants } from '../../config/Constants';

const Reports: React.FC = () => {
  const state: AppState = useSelector((reportState: AppState) => reportState);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const dispatch: Dispatch<any> = useDispatch();
  const [showOpportunityResults, setShowOpportunityResults] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState<string>('Opportunity');
  const [opportunityList, setReportsOpptyBasicList] = React.useState<apiModels.ReportOpptyList[]>([]);
  const [opptyProdList, setReportsopptyProdList] = React.useState<apiModels.ProductList[]>([]);
  const [opptyContList, setReportsopptyContList] = React.useState<apiModels.ContactsList[]>([]);
  const [customerList, setcustomerList] = React.useState<apiModels.BusinessPartnerListItem[]>([]);
  const [custAddrList, setcustAddrList] = React.useState<apiModels.AddressesList[]>([]);
  const [custContList, setcustcontList] = React.useState<apiModels.CustomerContactsList[]>([]);

  const csvLinkRef = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const csvProdRef = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const csvContRef = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

  const csvCustLinkRef = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const csvAddrRef = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const csvCustContRef = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

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

    const allData: apiModels.ReportOpptyList[] = [];
    const prodData: apiModels.ProductList[] = [];
    const contData: apiModels.ContactsList[] = [];

    let newOffset = 0;

    dispatch(setBusinessPartnerLoader(true));
    const data: any = await ReportsOpptyList.get(opptyReportRequestParams, newOffset, Constants.OPPORTUNITY_REPORT_COUNT);

    if (data && data.control && data.control.total && newOffset < data.control.total) {
      const Promises = [];
      newOffset += Constants.OPPORTUNITY_REPORT_COUNT;
      while (newOffset < data.control.total) {
        const p1 = ReportsOpptyList.get(opptyReportRequestParams, newOffset, Constants.OPPORTUNITY_REPORT_COUNT);
        Promises.push(p1);
        newOffset += Constants.OPPORTUNITY_REPORT_COUNT;
      }

      Promise.all(Promises).then((response: any) => {
        dispatch(setBusinessPartnerLoader(false));
        response.forEach((res: any) => {
          allData.splice(allData.length, 0, ...res.data.items);
        });
        response.forEach((res: any) => {
          res.data.items.forEach((rptData: apiModels.ReportOpptyList) => {
            if (rptData.products) {
              rptData.products.forEach((pData: apiModels.ProductList) => {
                prodData.splice(prodData.length, 0, pData);
              });
            }
            if (rptData.contacts) {
              rptData.contacts.forEach((cData: apiModels.ContactsList) => {
                contData.splice(contData.length, 0, cData);
              });
            }
          });
        });
        createOpportunityReports(allData);
        createProdReports(prodData);
        createContReports(contData);
      });
    } else {
      allData.push(data.data.items);
      data.data.items.forEach((rptData: apiModels.ReportOpptyList) => {
        if (rptData.products) {
          rptData.products.forEach((pData: apiModels.ProductList) => {
            prodData.push(pData);
          });
        }
        if (rptData.contacts) {
          rptData.contacts.forEach((cData: apiModels.ContactsList) => {
            contData.push(cData);
          });
        }
      });
      createOpportunityReports(allData);
      createProdReports(prodData);
      createContReports(contData);
    }
  };

  const createOpportunityReports = (data: apiModels.ReportOpptyList[]) => {
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
    setReportsOpptyBasicList(opptReportsData);
    csvLinkRef?.current?.link.click();
  };

  const createProdReports = (data: apiModels.ProductList[]) => {
    const opptReportsProdData = data.map((pobj: apiModels.ProductList) => {
      return {
        opportunityId: pobj.opportunityId,
        itemId: pobj.itemId,
        itemDescription: pobj.itemDescription,
        lineNumber: pobj.lineNumber,
        item: pobj.item,
        ourPrice: pobj.ourPrice,
        systemPrice: pobj.systemPrice,
        quantity: pobj.quantity,
        unit: pobj.unit,
        isFreeOfCharge: pobj.isFreeOfCharge,
      };
    });
    const prodObj = opptReportsProdData.flat().filter(function prod(element: any) {
      return element !== undefined;
    });
    setReportsopptyProdList(prodObj);
    csvProdRef?.current?.link.click();
  };

  const createContReports = (data: apiModels.ContactsList[]) => {
    const opptReportsContData = data.map((cObj: apiModels.ContactsList) => {
      return {
        contactId: cObj.contactId,
        contactPerson: cObj.contactPerson,
        contactDC: cObj.contactDC,
        email: cObj.email,
        phone: cObj.phone,
        mobile: cObj.mobile,
        fax: cObj.fax,
      };
    });
    const contactObj = opptReportsContData.flat().filter(function contact(element: any) {
      return element !== undefined;
    });
    setReportsopptyContList(contactObj);
    csvContRef?.current?.link.click();
  };

  const onDownloadReport = () => {
    fetchOpptyList();
    setReportsOpptyBasicList([]);
    setReportsopptyProdList([]);
    setReportsopptyContList([]);
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
    { label: 'Contact Id', key: 'contactId' },
    { label: 'contact Person', key: 'contactPerson' },
    { label: 'Contact DC', key: 'contactDC' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Mobile', key: 'mobile' },
    { label: 'Fax', key: 'fax' },
  ];

  const fetchCustomerList = async () => {
    dispatch(setBusinessPartnerLoader(true));
    const params: apiModels.CustomerFilters = state.reports.customerReportParams;

    const allData: apiModels.BusinessPartnerListItem[] = [];
    const addrData: apiModels.AddressesList[] = [];
    const contData: apiModels.CustomerContactsList[] = [];
    let newOffset = 0;

    dispatch(setBusinessPartnerLoader(true));
    const data: any = await BusinessPartnerList.get('', Constants.OPPORTUNITY_REPORT_COUNT, newOffset, '', params);

    if (data && data.control && data.control.total && newOffset < data.control.total) {
      const Promises = [];
      newOffset += Constants.OPPORTUNITY_REPORT_COUNT;
      while (newOffset < data.control.total) {
        const p1 = BusinessPartnerList.get('', Constants.OPPORTUNITY_REPORT_COUNT, newOffset, '', params);
        Promises.push(p1);
        newOffset += Constants.OPPORTUNITY_REPORT_COUNT;
      }

      Promise.all(Promises).then((response: any) => {
        dispatch(setBusinessPartnerLoader(false));
        response.forEach((res: any) => {
          allData.splice(allData.length, 0, ...res.data.items);
          res.data.items.forEach((rptData: apiModels.BusinessPartnerListItem) => {
            if (rptData.addresses) {
              rptData.addresses.forEach((aData: apiModels.AddressesList) => {
                addrData.splice(addrData.length, 0, aData);
              });
            }
            if (rptData.contacts) {
              rptData.contacts.forEach((cData: apiModels.CustomerContactsList) => {
                contData.splice(contData.length, 0, cData);
              });
            }
          });
        });
        createCustomerReportsData(allData);
        createAddressReports(addrData);
        createCustomerContactsReports(contData);
      });
    } else if (data && data.data && data.data.items && data.data.items.length) {
      data.data.items.forEach((rptData: apiModels.BusinessPartnerListItem) => {
        if (rptData.addresses) {
          rptData.addresses.forEach((aData: apiModels.AddressesList) => {
            addrData.push(aData);
          });
        }
        if (rptData.contacts) {
          rptData.contacts.forEach((cData: apiModels.CustomerContactsList) => {
            contData.push(cData);
          });
        }
      });
      dispatch(setBusinessPartnerLoader(false));
      createCustomerReportsData(data.data.items);
      createAddressReports(addrData);
      createCustomerContactsReports(contData);
    }
  };

  const createCustomerReportsData = (data: apiModels.BusinessPartnerListItem[]) => {
    const custReportsData = data.map((obj: apiModels.BusinessPartnerListItem) => {
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
        businessPartner: obj.businessPartner,
        description: obj.description,
        type: obj.type,
        internalName: obj.internalName,
        area: obj.area,
        addressLine1: obj.addressLine1,
        addressLine2: obj.addressLine2,
        addressLine3: obj.addressLine3,
        addressLine4: obj.addressLine4,
        country: obj.country,
        postalCode: obj.postalCode,
        phone: obj.phone,
        numberOfActiveOpportunities: obj.numberOfActiveOpportunities,
        active: obj.active,
        attributeExist: obj.attributeExist,
        BASICTEST2: getCsvValues(obj.BASICTEST2),
        BASICTEST3: getCsvValues(obj.BASICTEST3),
        BOOL_FIELD_TEST: getCsvValues(obj.BOOL_FIELD_TEST),
        CAMPAIGN: getCsvValues(obj.CAMPAIGN),
        CMS_ACCOUNT_OWNER: getCsvValues(obj.CMS_ACCOUNT_OWNER),
        CMS_SERVICES: getCsvValues(obj.CMS_SERVICES),
        CURRENT_SYSTEM: getCsvValues(obj.CURRENT_SYSTEM),
        CUSTOMER_AT_RISK: getCsvValues(obj.CUSTOMER_AT_RISK),
        CUSTOMER_UNTIL: getCsvValues(obj.CUSTOMER_UNTIL),
        DC1_VERSION: getCsvValues(obj.DC1_VERSION),
        DO_NOT_CONTACT: getCsvValues(obj.DO_NOT_CONTACT),
        industry: getCsvValues(obj.industry),
        IP1_VERSION: getCsvValues(obj.IP1_VERSION),
        NUMERIC_TEST_FIELD: getCsvValues(obj.NUMERIC_TEST_FIELD),
        owner: getCsvValues(obj.owner),
        productFamily: getCsvValues(obj.productFamily),
        PARENT_ID: getCsvValues(obj.PARENT_ID),
        PERP_USE_MAINT_CONV: getCsvValues(obj.PERP_USE_MAINT_CONV),
        REFERENCEABLE: getCsvValues(obj.REFERENCEABLE),
        TYPE: getCsvValues(obj.TYPE),
      };
    });
    setcustomerList(custReportsData);
    csvCustLinkRef?.current?.link.click();
  };

  const createAddressReports = (data: apiModels.AddressesList[]) => {
    const custReportsAddressData = data.map((addrobj: apiModels.AddressesList) => {
      return {
        address: addrobj.address,
        name: addrobj.name,
        addressLine1: addrobj.addressLine1,
        addressLine2: addrobj.addressLine2,
        addressLine4: addrobj.addressLine4,
        postalCode: addrobj.postalCode,
        country: addrobj.country,
        isDispatchAddress: addrobj.isDispatchAddress,
        isConfirmationAddress: addrobj.isConfirmationAddress,
        isInvoiceAddress: addrobj.isInvoiceAddress,
        isDebtorAddress: addrobj.isDebtorAddress,
        isPurchaseOrderAddress: addrobj.isPurchaseOrderAddress,
        isPayeeAddress: addrobj.isPayeeAddress,
        isSupplierDispatchAddress: addrobj.isSupplierDispatchAddress,
        isMsdsAddress: addrobj.isMsdsAddress,
        isDirectDeliveryPreferred: addrobj.isDirectDeliveryPreferred,
        isDEAAddress: addrobj.isDEAAddress,
        isValidAsShipToAddress: addrobj.isValidAsShipToAddress,
      };
    });
    const AddressesObj = custReportsAddressData.flat().filter(function prod(element: any) {
      return element !== undefined;
    });
    setcustAddrList(AddressesObj);
    csvAddrRef?.current?.link.click();
  };

  const createCustomerContactsReports = (data: apiModels.CustomerContactsList[]) => {
    const custReportsContactsData = data.map((contobj: apiModels.CustomerContactsList) => {
      return {
        contactDC: contobj.contactDC,
        contactPerson: contobj.contactPerson,
        isPublicContact: contobj.isPublicContact,
        userID: contobj.userID,
        phone: contobj.phone,
        email: contobj.email,
        fax: contobj.fax,
        DO_NOT_CONTACT: contobj.DO_NOT_CONTACT,
        NO_LONGER_AT_COMP: contobj.NO_LONGER_AT_COMP,
        OPTED_OUT_OF_EMAIL: contobj.OPTED_OUT_OF_EMAIL,
        PRIMARY_CONTACT: contobj.PRIMARY_CONTACT,
        TITLE: contobj.TITLE,
      };
    });
    const contactsObj = custReportsContactsData.flat().filter(function addr(element: any) {
      return element !== undefined;
    });
    setcustcontList(contactsObj);
    csvCustContRef?.current?.link.click();
  };

  const onDownloadCustReport = () => {
    fetchCustomerList();
    setcustomerList([]);
    setcustAddrList([]);
    setcustcontList([]);
  };
  const custHeaders = [
    { label: 'BusinessPartner Id', key: 'businessPartner' },
    { label: 'Description', key: 'description' },
    { label: 'Type', key: 'type' },
    { label: 'Name', key: 'internalName' },
    { label: 'Area', key: 'area' },
    { label: 'AddressLine1', key: 'addressLine1' },
    { label: 'AddressLine2', key: 'addressLine2' },
    { label: 'AddressLine3', key: 'addressLine3' },
    { label: 'AddressLine4', key: 'addressLine4' },
    { label: 'Country', key: 'country' },
    { label: 'Postal Code', key: 'postalCode' },
    { label: 'Phone', key: 'phone' },
    { label: 'Number Of ActiveOpportunities', key: 'numberOfActiveOpportunities' },
    { label: 'Active', key: 'active' },
    { label: 'BASICTEST2', key: 'BASICTEST2' },
    { label: 'BASICTEST3', key: 'BASICTEST3' },
    { label: 'BOOL_FIELD_TEST', key: 'BOOL_FIELD_TEST' },
    { label: 'CMS_ACCOUNT_OWNER', key: 'CMS_ACCOUNT_OWNER' },
    { label: 'CMS_SERVICES', key: 'CMS_SERVICES' },
    { label: 'CURRENT_SYSTEM', key: 'CURRENT_SYSTEM' },
    { label: 'CUSTOMER_AT_RISK', key: 'CUSTOMER_AT_RISK' },
    { label: 'CUSTOMER_UNTIL', key: 'CUSTOMER_UNTIL' },
    { label: 'DC1_VERSION', key: 'DC1_VERSION' },
    { label: 'Industry', key: 'industry' },
    { label: 'IP1_VERSION', key: 'IP1_VERSION' },
    { label: 'NUMERIC_TEST_FIELD', key: 'NUMERIC_TEST_FIELD' },
    { label: 'owner', key: 'owner' },
    { label: 'productFamily', key: 'productFamily' },
    { label: 'PARENT_ID', key: 'PARENT_ID' },
    { label: 'PERP_USE_MAINT_CONV', key: 'PERP_USE_MAINT_CONV' },
    { label: 'REFERENCEABLE', key: 'REFERENCEABLE' },
    { label: 'TYPE', key: 'TYPE' },
  ];

  const custAddrHeaders = [
    { label: 'Address', key: 'address' },
    { label: 'Name', key: 'name' },
    { label: 'Address Line1', key: 'addressLine1' },
    { label: 'Address Line2', key: 'addressLine2' },
    { label: 'Address Line4', key: 'addressLine4' },
    { label: 'Postal Code', key: 'postalCode' },
    { label: 'Country', key: 'country' },
    { label: 'isDispatchAddress', key: 'isDispatchAddress' },
    { label: 'isConfirmationAddress', key: 'isConfirmationAddress' },
    { label: 'isInvoiceAddress', key: 'isInvoiceAddress' },
    { label: 'isDebtorAddress', key: 'isDebtorAddress' },
    { label: 'isPurchaseOrderAddress', key: 'isPurchaseOrderAddress' },
    { label: 'isSupplierDispatchAddress', key: 'isSupplierDispatchAddress' },
    { label: 'isMsdsAddress', key: 'isMsdsAddress' },
    { label: 'isDirectDeliveryPreferred', key: 'isDirectDeliveryPreferred' },
    { label: 'isDEAAddress', key: 'isDEAAddress' },
    { label: 'isValidAsShipToAddress', key: 'isValidAsShipToAddress' },
  ];

  const custContHeaders = [
    { label: 'Contact DC', key: 'contactDC' },
    { label: 'Contact Person', key: 'contactPerson' },
    { label: 'isPublicContact', key: 'isPublicContact' },
    { label: 'userID', key: 'userID' },
    { label: 'phone', key: 'phone' },
    { label: 'email', key: 'email' },
    { label: 'fax', key: 'fax' },
    { label: 'DO_NOT_CONTACT', key: 'DO_NOT_CONTACT' },
    { label: 'NO_LONGER_AT_COMP', key: 'NO_LONGER_AT_COMP' },
    { label: 'OPTED_OUT_OF_EMAIL', key: 'OPTED_OUT_OF_EMAIL' },
    { label: 'PRIMARY_CONTACT', key: 'PRIMARY_CONTACT' },
    { label: 'TITLE', key: 'TITLE' },
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
            {showOpportunityResults ? (
              <>
                <input type="button" className="download-csv-btn" value="Download CSV" onClick={() => onDownloadReport()} />
                <CSVLink ref={csvLinkRef} data={opportunityList} filename="OpportunityReport.csv" headers={opptHeaders} />
                <CSVLink ref={csvProdRef} data={opptyProdList} filename="OpportunityReport-products.csv" headers={opptProdHeaders} />
                <CSVLink ref={csvContRef} data={opptyContList} filename="OpportunityReport-contacts.csv" headers={opptContHeaders} />
              </>
            ) : null}
            {showCustomerResults ? (
              <>
                <input type="button" className="download-csv-btn" value="Download CSV" onClick={() => onDownloadCustReport()} />
                <CSVLink ref={csvCustLinkRef} data={customerList} filename="CustomerReport.csv" headers={custHeaders} />
                <CSVLink ref={csvAddrRef} data={custAddrList} filename="CustomerReport-adresses.csv" headers={custAddrHeaders} />
                <CSVLink ref={csvCustContRef} data={custContList} filename="CustomerReport-contacts.csv" headers={custContHeaders} />
              </>
            ) : null}
          </div>
        </div>

        <div className="actioncards-container">
          {showOpportunityResults ? <OpportunityReport /> : null}
          {showCustomerResults ? <CustomerReport /> : null}
        </div>
        {showOpportunityResults ? (
          <>
            <input type="button" className="mob-download-csv-btn" value="CSV" onClick={() => onDownloadReport()} />
            <CSVLink ref={csvLinkRef} data={opportunityList} filename="OpportunityReport.csv" headers={opptHeaders} />
            <CSVLink ref={csvProdRef} data={opptyProdList} filename="OpportunityReport-products.csv" headers={opptProdHeaders} />
            <CSVLink ref={csvContRef} data={opptyContList} filename="OpportunityReport-contacts.csv" headers={opptContHeaders} />
          </>
        ) : null}
        {showCustomerResults ? (
          <>
            <input type="button" className="mob-download-csv-btn" value="CSV" onClick={() => onDownloadCustReport()} />
            <CSVLink ref={csvCustLinkRef} data={customerList} filename="CustomerReport.csv" headers={custHeaders} />
            <CSVLink ref={csvAddrRef} data={custAddrList} filename="CustomerReport-adresses.csv" headers={custAddrHeaders} />
            <CSVLink ref={csvCustContRef} data={custContList} filename="CustomerReport-contacts.csv" headers={custContHeaders} />
          </>
        ) : null}
      </div>

      {isDesktop ? <Footer /> : null}
      {isMobile || isTablet ? <FooterMobile page={3} /> : null}
    </>
  );
};

export default Reports;
