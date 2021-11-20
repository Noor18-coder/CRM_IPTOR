import { ICellRendererParams, ColDef } from 'ag-grid-community';
import { getCurrencySymbol, getQuarterOfYearFromDate } from '../helpers/utilities/lib';
import { APPROVAL_STATUS } from './Constants';

const OpportunityGridOptions: ColDef[] = [
  {
    field: 'oppRecordType',
    sortable: true,
    headerName: 'Types',
    width: 160,
    cellRenderer: (params: ICellRendererParams): string => {
      return params.value ? params.value : '';
    },
  },
  {
    field: 'desc',
    sortable: true,
    headerName: 'Name & Number',
    width: 160,
    cellRenderer: (params: ICellRendererParams): string => {
      return (
        ` <span class="o-name">${params.value ? params.value : ''}</span>` +
        `<span class="o-number">${params.data && params.data.opportunityId ? params.data.opportunityId : ''}</span>`
      );
    },
  },
  {
    field: 'name',
    sortable: true,
    headerName: 'Customer',
    width: 120,
    cellRenderer: (params: ICellRendererParams): string => {
      return `<span class="o-customer">${params.value ? params.value : ''}</span>`;
    },
  },
  {
    field: 'userId',
    sortable: false,
    headerName: 'Owner',
    width: 120,
    cellRenderer: (params: ICellRendererParams): string => {
      return `<span class="o-owner">${params.value ? params.value : ''}</span>`;
    },
  },
  {
    field: 'stage',
    sortable: true,
    headerName: 'Stage',
    wrapText: false,
    width: 90,
    cellRenderer: (params: ICellRendererParams): string => {
      if (params.data && params.data.approvalStatus) {
        let approvalClass = 'o-stage grade';
        if (params.data.approvalStatus === APPROVAL_STATUS.SUBMITTED) {
          approvalClass = 'o-stage submit';
        } else if (params.data.approvalStatus === APPROVAL_STATUS.REJECTED) {
          approvalClass = 'o-stage reject';
        } else if (params.data.approvalStatus === APPROVAL_STATUS.APPROVED) {
          approvalClass = 'o-stage grade';
        } else if (params.data.approvalStatus === APPROVAL_STATUS.LOST) {
          approvalClass = 'o-stage lost';
        } else {
          approvalClass = 'o-stage grade';
        }
        return `<span class="${approvalClass}">${params.value ? params.value : ''}</span>`;
      } else {
        return `<span class="o-stage">${params.value ? params.value : ''}</span>`;
      }
    },
  },

  {
    field: 'forecastCategory',
    sortable: true,
    headerName: 'Forecast',
    width: 115,
    cellRenderer: (params: ICellRendererParams): string => {
      return `<span class="o-forecast">${params.value ? params.value : ''}</span>`;
    },
  },

  {
    field: 'endDate',
    sortable: true,
    headerName: 'Close Quarter',
    width: 150,
    cellRenderer: (params: ICellRendererParams): string => {
      return `<span class="o-quarter">${params.value ? getQuarterOfYearFromDate(params.value) : ''}</span></div>`;
    },
  },
  {
    field: 'estValueSys',
    sortable: true,
    headerName: 'Size',
    width: 120,
    cellRenderer: (params: ICellRendererParams): string => {
      return `<span class="o-size">${params.data && params.data.currency ? getCurrencySymbol(params.data.currency) : ''} ${
        params.value === undefined ? '' : params.value
      }</span></div>`;
    },
  },
  // Commented non-working button {
  //   field: '',
  //   sortable: true,
  //   suppressAutoSize: true,
  //   width: 30,
  //   headerName: '',
  //   cellRenderer: () => {
  //     return `<img class="nav-more-menu" src="${Dots}" alt="..."/>`;
  //   },
  // },
];

export default OpportunityGridOptions;
