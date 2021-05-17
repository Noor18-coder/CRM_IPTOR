import {getCurrencySymbol, getQuarterOfYearFromDate } from '../helpers/utilities/lib';

const OpportunityGridOptions = [{
        field: 'oppRecordType',
        sortable: true,
        headerName: 'Types',
        cellRender: (params: any) => {
          return params.value;
        }
      },{
        field: 'desc',
        sortable: true,
        headerName: 'Name and Number',
        cellRender: (params: any) => {
          return ' <span class="o-name">' + params.value + '</span>' +
            '<span class="o-number">' + params.data.opportunityId + ' </span>';
        }
      },
      {
        field: 'name',
        sortable: true,
        headerName: 'Customer',
        cellRender: (params: any) => {
          return params.value;
        }
  
      },
      {
        field: 'handler',
        sortable: true,
        headerName: 'Owner',
        cellRender: (params: any) => {
          return params.value;
        }
      },
      {
        field: 'stage',
        sortable: true,
        headerName: 'Stage',
        cellRender: (params: any) => {
          return ' <span class="o-stage">' + params.value + '</span>'
        }
        
      },
     
      {
        field: 'endDate',
        sortable: true,
        headerName: 'Close Quarter',
        cellRender: (params: any) => {
          return '<span class="o-quarter">' + getQuarterOfYearFromDate(params.value) + '</span></div>'
        }
      },
      {
        field: 'curValue',
        sortable: true,
        headerName: 'Deal Size',
        cellRender: (params: any) => {
          return '<span class="o-size">' + getCurrencySymbol(params.data.currency) + ' ' + params.value + '</span></div>'
        }
  
      }];


export default OpportunityGridOptions;
