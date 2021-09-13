import { AddOpportunityField } from '../helpers/Api/models';

export const OpportunityDefaultFields: AddOpportunityField[] = [
  {
    description: 'Opportunity Name',
    valueFormatDesc: 'ALPHANUMERIC',
    attributeType: 'desc',
    valueFormat: 'ALPHANUMERIC',
    valuesExist: false,
  },
  {
    description: 'Stage',
    valueFormatDesc: 'ALPHANUMERIC',
    attributeType: 'stage',
    valueFormat: 'ALPHANUMERIC',
    valuesExist: true,
    reduxKey: 'crmOpportunityStage',
  },
  {
    description: 'Customer',
    valueFormatDesc: 'ALPHANUMERIC',
    attributeType: 'customer',
    valueFormat: 'ALPHANUMERIC',
    asyncSearch: true,
  },
  {
    description: 'Owner',
    valueFormatDesc: 'ALPHANUMERIC',
    attributeType: 'handler',
    valueFormat: 'ALPHANUMERIC',
  },
  {
    description: 'Opportunity Type',
    attributeType: 'oppRecordType',
    valueFormatDesc: 'ALPHANUMERIC',
    valueFormat: 'ALPHANUMERIC',
    valuesExist: true,
    reduxKey: 'crmOpportunityTypes',
  },
  {
    description: 'Close Date',
    attributeType: 'endDate',
    valueFormatDesc: 'DATE',
    valueFormat: 'DATE',
  },
  {
    description: 'Currency',
    attributeType: 'currency',
    valueFormatDesc: 'ALPHANUMERIC',
    valueFormat: 'ALPHANUMERIC',
    valuesExist: true,
    reduxKey: 'currency',
  },
  {
    description: 'Total Deal Price',
    attributeType: 'estimatedValue',
    valueFormatDesc: 'NUMERIC',
    valueFormat: 'NUMERIC',
  },
];
