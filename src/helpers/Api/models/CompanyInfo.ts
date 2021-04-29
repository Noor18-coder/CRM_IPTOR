export interface CompanyInfoItem {
  companyShortName: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  postalCode: string;
  partyIdentification: string;
  phoneNumber: string;
  faxNumber: string;
  udPhoneNumber: string;
  udFaxNumber: string;
  registrationNo: string;
  vatRegistrationNo: string;
  systemCountry: string;
  systemLanguage: string;
  systemCurrency: string;
  goodsAddressNo: number;
  palletRegistrationNo: number;
  county: string;
  state: string;
  taxJurisdictionCode: string;
  reportingCurrency: string;
  eMailAddress: string;
  homePage: string;
  ibanAccountNo: string;
  bankIdentificationCode: string;
  bankName: string;
  bankAddress: string;
  swiftAddress: string;
  businessIdentityText: string;
  vatRegisterOffice: string;
  recordFound: boolean;  
  environmentId: string;
  company: string;
}


export interface CompanyInfoItemResponse {
  IptorAPI: string;
  data: CompanyInfoItem;
  id: string;
}