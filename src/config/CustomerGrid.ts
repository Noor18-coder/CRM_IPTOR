import Dots from '../assets/images/nav-more.svg';

const CustomerGridOptions = [{
    field: 'description',
    sortable: true,
    headerName: 'Customers',
    cellRenderer: (params: any) => {
        return params.value ? params.value : '';
    }
}, {
    field: 'country',
    sortable: true,
    headerName: 'Region',
    cellRenderer: (params: any) => {
        return params.value ? params.value : '';
    }
},
{
    field: 'accountOwner',
    sortable: true,
    headerName: 'Account Owner',
    cellRenderer: (params: any) => {
        return params.value ? params.value : ''
    }

},
{
    field: 'industry',
    sortable: true,
    headerName: 'Industry',
    cellRenderer: (params: any) => {
        return params.value ? params.value : ''
    }
},
{
    field: 'activeOpp',
    sortable: true,
    headerName: 'Active Opportunity',
    cellRenderer: (params: any) => {
        return params.value ? params.value : ''
    }

},
{
    field: '',
    sortable: true,
    suppressAutoSize: true,
    width: 30,
    headerName: '',
    cellRenderer: (params: any) => {
        return '<img class="nav-more-menu" src="' + Dots + '" alt="..."/>'
    }
}];


export default CustomerGridOptions;