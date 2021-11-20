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
import ImageConfig from '../../config/ImageConfig';
import {
  opptHeaders,
  opptProdHeaders,
  opptContHeaders,
  oppProductKeys,
  oppContactKeys,
  customerContactHeaderKeys,
  customerContactHeaders,
} from '../../config/ReportHeaders';
import i18n from '../../i18n';

interface ReportHeader {
  label: string;
  key: string;
}

interface ReportObj {
  [index: string]: string;
}

const Reports: React.FC = () => {
  const state: AppState = useSelector((reportState: AppState) => reportState);
  const isMobile = useMediaQuery({ maxWidth: 767.98 });
  const dispatch: Dispatch<any> = useDispatch();
  const [showOpportunityResults, setShowOpportunityResults] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState<string>('Opportunity');
  const [opportunityList, setReportsOpptyBasicList] = React.useState<apiModels.ReportOpptyList[]>([]);
  const [opptyProdList, setReportsopptyProdList] = React.useState<ReportObj[]>([]);
  const [opptyContList, setReportsopptyContList] = React.useState<ReportObj[]>([]);
  const [customerList, setcustomerList] = React.useState<apiModels.BusinessPartnerListItem[]>([]);
  const [custAddrList, setcustAddrList] = React.useState<apiModels.AddressesList[]>([]);
  const [custContList, setcustcontList] = React.useState<apiModels.CustomerContactsList[]>([]);
  const [csvOpportunityProductHeaders, setCsvOpportunityProductHeaders] = React.useState<ReportHeader[]>([]);
  const [csvOpportunityContactsHeaders, setCsvOpportunityContactsHeaders] = React.useState<ReportHeader[]>([]);
  const [csvCustomerContactHeaders, setCsvCustomerContactHeaders] = React.useState<ReportHeader[]>([]);
  // const [, setNoRecordsMsg] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

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
    const { productAttributes, customerContactAttributes, opportunityContactAttributes } = state.enviornmentConfigs;

    if (productAttributes.length) {
      const opptyProductsAttributeHeaders: ReportHeader[] = productAttributes.map((obj: apiModels.AttributeField) => {
        return {
          label: obj.description,
          key: obj.attributeType,
        };
      });
      setCsvOpportunityProductHeaders([...opptProdHeaders, ...opptyProductsAttributeHeaders]);
    }

    const tempCustContactAttributesLabels: ReportHeader[] = customerContactAttributes.map((obj: apiModels.AttributeField) => {
      return {
        label: obj.description,
        key: obj.attributeType,
      };
    });

    const tempOpptyContactAttributesLabels: ReportHeader[] = opportunityContactAttributes.map((obj: apiModels.AttributeField) => {
      return {
        label: obj.description,
        key: obj.attributeType,
      };
    });
    setCsvOpportunityContactsHeaders([...opptContHeaders, ...tempOpptyContactAttributesLabels, ...tempCustContactAttributesLabels]);
    setCsvCustomerContactHeaders([...customerContactHeaders, ...tempCustContactAttributesLabels]);
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
      allData.splice(allData.length, 0, ...data.data.items);
      const Promises = [];
      newOffset += Constants.OPPORTUNITY_REPORT_COUNT;
      while (newOffset < data.control.total) {
        const p1 = ReportsOpptyList.get(opptyReportRequestParams, newOffset, Constants.OPPORTUNITY_REPORT_COUNT);
        Promises.push(p1);
        newOffset += Constants.OPPORTUNITY_REPORT_COUNT;
      }

      Promise.all(Promises)
        .then((response: any) => {
          dispatch(setBusinessPartnerLoader(false));
          response.forEach((res: any) => {
            allData.splice(allData.length, 0, ...res.data.items);
          });
          allData.forEach((rptData: apiModels.ReportOpptyList) => {
            const opptyId = rptData.opportunityId;
            if (rptData.products) {
              rptData.products.forEach((pData: apiModels.ProductList) => {
                prodData.splice(prodData.length, 0, { ...pData, opportunityId: opptyId });
              });
            }
            if (rptData.contacts) {
              rptData.contacts.forEach((cData: apiModels.ContactsList) => {
                contData.splice(contData.length, 0, { ...cData, opportunityId: opptyId });
              });
            }
          });
          createOpportunityReports(allData);
          createProdReports(prodData);
          createContReports(contData);
        })
        .catch(() => {
          dispatch(setBusinessPartnerLoader(false));
          setErrorMessage(i18n.t('errorReportDownloading'));
        });
    } else if (data && data.data && data.data.items && data.data.items.length) {
      // allData.push(data.data.items);
      allData.splice(allData.length, 0, ...data.data.items);
      data.data.items.forEach((rptData: apiModels.ReportOpptyList) => {
        const opptyId = rptData.opportunityId;
        if (rptData.products) {
          rptData.products.forEach((pData: apiModels.ProductList) => {
            prodData.push({ ...pData, opportunityId: opptyId });
          });
        }
        if (rptData.contacts) {
          rptData.contacts.forEach((cData: apiModels.ContactsList) => {
            contData.push({ ...cData, opportunityId: opptyId });
          });
        }
      });
      dispatch(setBusinessPartnerLoader(false));
      createOpportunityReports(data.data.items);
      createProdReports(prodData);
      createContReports(contData);
    } else {
      dispatch(setBusinessPartnerLoader(false));
      setErrorMessage(i18n.t('NoRecordsMsg'));
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
        ATRTST1: rptobj.ATRTST1,
        ATRTST2: rptobj.ATRTST2,
        MULTIPLE_TEXT: rptobj.MULTIPLE_TEXT,
        TEST_MULTY: rptobj.TEST_MULTY,
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
      return getOpportunityProductTuple(pobj);
    });
    const prodObj = opptReportsProdData.flat().filter(function prod(element: any) {
      return element !== undefined;
    });
    setReportsopptyProdList(prodObj);
    csvProdRef?.current?.link.click();
  };

  const getValues = (objValue: any) => {
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

  const getOpportunityProductTuple = (pobj: any) => {
    const { productAttributes } = state.enviornmentConfigs;
    const tempAttributes: ReportObj = {};

    const attributeColumns = productAttributes.map((obj: apiModels.AttributeField) => {
      return obj.attributeType;
    });

    const columns: string[] = [...oppProductKeys, ...attributeColumns];

    columns.forEach((key: string) => {
      tempAttributes[key] = getValues(pobj[key]);
    });
    return tempAttributes;
  };

  const createContReports = (data: apiModels.ContactsList[]) => {
    const opptReportsContData = data.map((cObj: apiModels.ContactsList) => {
      return getOppprtunityContactTuple(cObj);
    });
    const contactObj = opptReportsContData.flat().filter(function contact(element: any) {
      return element !== undefined;
    });
    setReportsopptyContList(contactObj);
    csvContRef?.current?.link.click();
  };

  const getOppprtunityContactTuple = (pobj: any) => {
    const { opportunityContactAttributes, customerContactAttributes } = state.enviornmentConfigs;
    const tempAttributes: ReportObj = {};

    const attributeOpptyColumns = opportunityContactAttributes.map((obj: apiModels.AttributeField) => {
      return obj.attributeType;
    });

    const attributeColumns = customerContactAttributes.map((obj: apiModels.AttributeField) => {
      return obj.attributeType;
    });

    const columns: string[] = [...oppContactKeys, ...attributeOpptyColumns, ...attributeColumns];

    columns.forEach((key: string) => {
      tempAttributes[key] = getValues(pobj[key]);
    });
    return tempAttributes;
  };

  const onDownloadReport = () => {
    fetchOpptyList();
    setReportsOpptyBasicList([]);
    setReportsopptyProdList([]);
    setReportsopptyContList([]);
  };

  const fetchCustomerList = async () => {
    const params: apiModels.CustomerFilters = state.reports.customerReportParams;

    const allData: apiModels.BusinessPartnerListItem[] = [];
    const addrData: apiModels.AddressesList[] = [];
    const contData: apiModels.CustomerContactsList[] = [];
    let newOffset = 0;

    dispatch(setBusinessPartnerLoader(true));
    const data: any = await BusinessPartnerList.get('', Constants.OPPORTUNITY_REPORT_COUNT, newOffset, '', params);

    if (data && data.control && data.control.total && newOffset < data.control.total) {
      allData.splice(allData.length, 0, ...data.data.items);
      const Promises = [];
      newOffset += Constants.OPPORTUNITY_REPORT_COUNT;
      while (newOffset < data.control.total) {
        const p1 = BusinessPartnerList.get('', Constants.OPPORTUNITY_REPORT_COUNT, newOffset, '', params);
        Promises.push(p1);
        newOffset += Constants.OPPORTUNITY_REPORT_COUNT;
      }

      Promise.all(Promises)
        .then((response: any) => {
          dispatch(setBusinessPartnerLoader(false));
          response.forEach((res: any) => {
            allData.splice(allData.length, 0, ...res.data.items);
          });

          allData.forEach((rptData: apiModels.BusinessPartnerListItem) => {
            const custId = rptData.businessPartner;
            if (rptData.addresses) {
              rptData.addresses.forEach((aData: apiModels.AddressesList) => {
                addrData.splice(addrData.length, 0, { ...aData, businessPartner: custId });
              });
            }
            if (rptData.contacts) {
              rptData.contacts.forEach((cData: apiModels.CustomerContactsList) => {
                contData.splice(contData.length, 0, { ...cData, businessPartner: custId });
              });
            }
          });
          createCustomerReportsData(allData);
          createAddressReports(addrData);
          createCustomerContactsReports(contData);
        })
        .catch(() => {
          dispatch(setBusinessPartnerLoader(false));
          setErrorMessage(i18n.t('errorReportDownloading'));
        });
    } else if (data && data.data && data.data.items && data.data.items.length) {
      // allData.push(data.data.items);
      allData.splice(allData.length, 0, ...data.data.items);
      data.data.items.forEach((rptData: apiModels.BusinessPartnerListItem) => {
        const custId = rptData.businessPartner;
        if (rptData.addresses) {
          rptData.addresses.forEach((aData: apiModels.AddressesList) => {
            addrData.push({ ...aData, businessPartner: custId });
          });
        }
        if (rptData.contacts) {
          rptData.contacts.forEach((cData: apiModels.CustomerContactsList) => {
            contData.push({ ...cData, businessPartner: custId });
          });
        }
      });
      dispatch(setBusinessPartnerLoader(false));
      createCustomerReportsData(data.data.items);
      createAddressReports(addrData);
      createCustomerContactsReports(contData);
    } else {
      dispatch(setBusinessPartnerLoader(false));
      setErrorMessage(i18n.t('NoRecordsMsg'));
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
        businessPartner: addrobj.businessPartner,
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

  const createCustomerContactsReports = (data: any) => {
    const custReportsContactsData = data.map((contobj: apiModels.CustomerContactsList) => {
      return getCustomerContactsTuple(contobj);
    });
    const contactsObj = custReportsContactsData.flat().filter(function addr(element: any) {
      return element !== undefined;
    });
    setcustcontList(contactsObj);
    csvCustContRef?.current?.link.click();
  };

  const getCustomerContactsTuple = (pobj: any) => {
    const { customerContactAttributes } = state.enviornmentConfigs;
    const tempAttributes: ReportObj = {};

    const attributeColumns = customerContactAttributes.map((obj: apiModels.AttributeField) => {
      return obj.attributeType;
    });

    const columns: string[] = [...customerContactHeaderKeys, ...attributeColumns];

    columns.forEach((key: string) => {
      tempAttributes[key] = getValues(pobj[key]);
    });
    return tempAttributes;
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
    { label: 'BusinessPartner Id', key: 'businessPartner' },
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

  const hideNoRecordsMsg = () => {
    setErrorMessage('');
  };

  return (
    <>
      <Header page={3} />
      {errorMessage ? (
        <div className="iptor-alert">
          <div className="alert-wrapper">
            <div role="alert" className="alert alert-danger">
              <button className="btn alert-close" type="button" onClick={hideNoRecordsMsg}>
                <img src={ImageConfig.CLOSE_BTN} alt="close" />
              </button>
              {errorMessage}
            </div>
          </div>
        </div>
      ) : null}
      {state.addBusinessPartner.loader && <Loader component="opportunity" />}
      <div className="section-reports">
        <div className="d-flex justify-content-between action-btns-row">
          <div className="lft-col">
            <input
              type="button"
              className={`report-btns${OpportunityButton}`}
              value={`${i18n.t('opptReport')}`}
              onClick={() => onClickOpptReport('Opportunity')}
            />
            <input
              type="button"
              className={`report-btns${CustomerButton}`}
              value={`${i18n.t('custReport')}`}
              onClick={() => onClickCustomerReport('Customer')}
            />
          </div>
          <div className="rgt-col">
            {showOpportunityResults ? (
              <>
                <input type="button" className="download-csv-btn" value={`${i18n.t('downloadCSV')}`} onClick={() => onDownloadReport()} />
                <CSVLink ref={csvLinkRef} data={opportunityList} filename="OpportunityReport.csv" headers={opptHeaders} />
                <CSVLink ref={csvProdRef} data={opptyProdList} filename="OpportunityReport-products.csv" headers={opptProdHeaders} />
                <CSVLink ref={csvContRef} data={opptyContList} filename="OpportunityReport-contacts.csv" headers={opptContHeaders} />
              </>
            ) : null}
            {showCustomerResults ? (
              <>
                <input type="button" className="download-csv-btn" value={`${i18n.t('downloadCSV')}`} onClick={() => onDownloadCustReport()} />
                <CSVLink ref={csvCustLinkRef} data={customerList} filename="CustomerReport.csv" headers={custHeaders} />
                <CSVLink ref={csvAddrRef} data={custAddrList} filename="CustomerReport-adresses.csv" headers={custAddrHeaders} />
                <CSVLink ref={csvCustContRef} data={custContList} filename="CustomerReport-contacts.csv" headers={customerContactHeaders} />
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
            <input type="button" className="mob-download-csv-btn" value={`${i18n.t('csv')}`} onClick={() => onDownloadReport()} />
            <CSVLink ref={csvLinkRef} data={opportunityList} filename="OpportunityReport.csv" headers={opptHeaders} />
            <CSVLink ref={csvProdRef} data={opptyProdList} filename="OpportunityReport-products.csv" headers={csvOpportunityProductHeaders} />
            <CSVLink ref={csvContRef} data={opptyContList} filename="OpportunityReport-contacts.csv" headers={csvOpportunityContactsHeaders} />
          </>
        ) : null}
        {showCustomerResults ? (
          <>
            <input type="button" className="mob-download-csv-btn" value={`${i18n.t('csv')}`} onClick={() => onDownloadCustReport()} />
            <CSVLink ref={csvCustLinkRef} data={customerList} filename="CustomerReport.csv" headers={custHeaders} />
            <CSVLink ref={csvAddrRef} data={custAddrList} filename="CustomerReport-adresses.csv" headers={custAddrHeaders} />
            <CSVLink ref={csvCustContRef} data={custContList} filename="CustomerReport-contacts.csv" headers={csvCustomerContactHeaders} />
          </>
        ) : null}
      </div>

      {isMobile ? <FooterMobile page={3} /> : <Footer />}
    </>
  );
};

export default Reports;
