

import reducer from './reducers'
import {OpportunityTypes } from './Types';

describe('reducer initial state', () => {

    it('should handle ITEMS_REQUEST', () => {
        expect(
           reducer(
              {
                 opportunities: [],
              },
              {
                type: 'ADD',
                opportunity: {
                 id: '1234567',
                 company: 'Serum',
                 dealSize: '$32K',
                 status: 'Closed-Lost'
             }
          }
           )
        ).toEqual( {
          opportunities: [ ],
       })
     })
  
   it('should handle ITEMS_REQUEST', () => {
      expect(
         reducer(
            {
               opportunities: [],
            },
            {
               type: OpportunityTypes.ADD_OPPORTUNITY,
               opportunity: {
                id: '1234567',
                company: 'Serum',
                dealSize: '$32K',
                status: 'Closed-Lost'
            }
        }
         )
      ).toEqual( {
        opportunities: [ {
            id: '1234567',
            company: 'Serum',
            dealSize: '$32K',
            status: 'Closed-Lost'
        }],
     })
   })
})