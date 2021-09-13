import Dots from '../assets/images/nav-more.svg';

const CustomerGridOptions = [
  {
    field: 'description',
    sortable: true,
    headerName: 'Customers',
    cellRenderer: (params: Record<string, any>): string => {
      return params.value ? params.value : '';
    },
  },
  {
    field: 'area',
    sortable: true,
    headerName: 'Area',
    cellRenderer: (params: Record<string, any>): string => {
      return `<span class="c-region">${params.value ? params.value : ''}</span>`;
    },
  },
  {
    field: 'owner',
    sortable: true,
    headerName: 'Account Owner',
    cellRenderer: (params: Record<string, any>): string => {
      return `<span class="c-owner">${params.value ? params.value : ''}</span>`;
    },
  },
  {
    field: 'industry',
    sortable: true,
    headerName: 'Industry',
    cellRenderer: (params: Record<string, any>): string => {
      return params.value ? params.value : '';
    },
  },
  {
    field: 'numberOfActiveOpportunities',
    sortable: true,
    headerName: 'Active Opportunity',
    cellRenderer: (params: Record<string, any>): string => {
      return `<span class="c-active-oppt">${params.value || params.value === 0 ? params.value : ''}</span>`;
    },
  },
  {
    field: '',
    sortable: false,
    suppressAutoSize: true,
    width: 30,
    headerName: '',
    cellRenderer: (): string => {
      return `<img class="nav-more-menu" src="${Dots}" alt="..."/>`;
    },
  },
];

export default CustomerGridOptions;
