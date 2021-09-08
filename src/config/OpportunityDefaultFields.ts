import { AddOpportunityField } from '../helpers/Api/models';

export const OpportunityDefaultFields: AddOpportunityField[] = [
  {
    description: 'Opportunity Name',
    valueFormatDesc: 'ALPHANUMERIC',
    attributeType: 'desc',
    valueFormat: 'A',
    valuesExist: false,
  },
  {
    description: 'Stage',
    valueFormatDesc: 'ALPHANUMERIC',
    attributeType: 'stage',
    valueFormat: 'A',
    valuesExist: true,
    reduxKey: 'crmOpportunityStage',
  },
  {
    description: 'Customer',
    valueFormatDesc: 'ALPHANUMERIC',
    attributeType: 'customer',
    valueFormat: 'A',
    asyncSearch: true,
  },
  {
    description: 'Owner',
    valueFormatDesc: 'ALPHANUMERIC',
    attributeType: 'handler',
    valueFormat: 'A',
  },
  {
    description: 'Opportunity Type',
    attributeType: 'oppRecordType',
    valueFormatDesc: 'ALPHANUMERIC',
    valueFormat: 'A',
    valuesExist: true,
    reduxKey: 'crmOpportunityTypes',
  },
  {
    description: 'End Date',
    attributeType: 'endDate',
    valueFormatDesc: 'ALPHANUMERIC',
    valueFormat: 'A',
    dateInput: true,
  },
  {
    description: 'Currency',
    attributeType: 'currency',
    valueFormatDesc: 'ALPHANUMERIC',
    valueFormat: 'A',
    valuesExist: true,
    reduxKey: 'currency',
  },
  {
    description: 'Total Deal Price',
    attributeType: 'estimatedValue',
    valueFormatDesc: 'NUMERIC',
    valueFormat: 'N',
  },
];
