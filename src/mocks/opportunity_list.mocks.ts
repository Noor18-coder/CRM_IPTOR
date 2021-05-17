import { fake } from 'faker';
import * as faker from 'faker/locale/en_US';

export interface Data {
     name: string,
    number: string,
    type: string,
    customer: string,
    owner: string,
    stage: string,
    forecast: string,
    close_quarter: string,
    size: string
};


export class OpportunitiesList {
    static getOpportunities(num: number): Data[] {
        return Array(num).fill({
            name: 'Dell Laptops',
            number: faker.random.uuid(),
            type: '',
            customer: 'Astra Zenecca, North America',
            owner: 'Mathew King',
            stage: 'A4',
            forecast: 'UPSIDE',
            close_quarter: 'Q2',
            size: '$37K'
        }
        );
    }

}


export const getFields = () => {
    return [
      {
        field: 'type',
        sortable:true,
        headerName: 'Type',
        width : {width: '10%'},
        maxWidth:100,
        cellRender: (params:any) => {
         return params.value;
       }
     },

       {
        field: 'name',
        sortable:true,
        headerName: 'Name and Number',
        width : {width: '10%'},
        maxWidth:100,
        cellRender: (params:any) => {
            return ' <span class="o-name">' + params.value + '</span>' +
            '<span class="o-number">' + params.data.number  + ' </span>';
        }
      },
      {
         field: 'customer',
         sortable:true,
         headerName: 'Customer',
         width : {width: '20%', background:'blue'},
         maxWidth:200,
         cellRender: (params:any) => {
          return params.value;
        }
         
       },
       {
         field: 'owner',
         sortable:true,
         headerName: 'Owner',
         width : {width: '15%'},
         maxWidth:120,
         cellRender: (params:any) => {
          return params.value;
        }
       },
       {
         field: 'stage',
         sortable:true,
         headerName: 'Stage',
         width : {width: '10%'},
         maxWidth:120,
         cellRender: (params:any) => {
          return ' <span class="o-stage">' + params.value + '</span>'
        }
        
       },
       {
         field: 'forecast',
         sortable:true,
         headerName: 'Forecast',
         width : {width: '10%'},
         maxWidth:190,
         cellRender: (params:any) => {
         return '<span class="o-forecast">' + params.value + '</span></div>'
         }
       }, 
       {
         field: 'close_quarter',
         sortable:true,
         headerName: 'Close Quarter',
         width : {width: '10%'},
         maxWidth:120,
         cellRender: (params:any) => {
          return '<span class="o-quarter">' + params.value + '</span></div>'
         }
       },
       {
         field: 'size',
         sortable:true,
         headerName: 'Deal Size',
         width : {width: '10%'},
         maxWidth:80,
         cellRender: (params:any) => {
          return '<span class="o-size">' + params.value + '</span></div>'
         }
       
       }];
 }
