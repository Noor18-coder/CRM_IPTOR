import {getCurrencySymbol, getQuarterOfYearFromDate } from '../helpers/utilities/lib';
import Dots from '../assets/images/nav-more.svg';

const OpportunityGridOptions = [{
        field: 'oppRecordType',
        sortable: true,
        headerName: 'Types',
        cellRenderer: (params: any) => {
          return params.value;
        }
      },{
        field: 'name',
        sortable: true,
        headerName: 'Name & Number',
        cellRenderer: (params: any) => {
          return ' <span class="o-name">' +  params.value + '</span>' +
            '<span class="o-number">' + ( params.data && params.data.opportunityId ? params.data.opportunityId  : '')  + '</span>';
        }
      },
      {
        field: 'name',
        sortable: true,
        headerName: 'Customer',
        cellRenderer: (params: any) => {
          return ' <span class="o-customer">' + params.value + '</span>'
        }
  
      },
      {
        field: 'handler',
        sortable: true,
        headerName: 'Owner',
        cellRenderer: (params: any) => {
          return ' <span class="o-owner">' + params.value + '</span>'
        }
      },
      {
        field: 'stage',
        sortable: true,
        headerName: 'Stage',
        cellRenderer: (params: any) => {
          return ' <span class="o-stage">' + params.value + '</span>'
        }
        
      },
     
      {
        field: 'endDate',
        sortable: true,
        headerName: 'Close Quarter',
        cellRenderer: (params: any) => {
          return '<span class="o-quarter">' + getQuarterOfYearFromDate(params.value) + '</span></div>'
        }
      },
      {
        field: 'curValue',
        sortable: true,
        headerName: 'Size',
        cellRenderer: (params: any) => {
          return '<span class="o-size">' + ( params.data && params.data.currency ? getCurrencySymbol(params.data.currency) : '') + ' ' + params.value + '</span></div>'
        }
      },
      {
        field: '',
        sortable: true,
        suppressAutoSize:true,
        width:30,
        headerName: '',
        cellRenderer: (params: any) => {
          return '<img class="nav-more-menu" src="' + Dots + '" alt="...">';
        }
    }];


export default OpportunityGridOptions;
