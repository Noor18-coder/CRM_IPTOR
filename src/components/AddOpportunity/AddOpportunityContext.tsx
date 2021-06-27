import * as React from 'react';
import { AddOpportunityDefaultParams, CustomerDetailsContactsGroupItem} from '../../helpers/Api/models';

export interface AddOpportunityContextInterface {
  customerId?: string,
  customerName?:string;
}

export const Context = React.createContext<AddOpportunityContextInterface | null>(null);

export const AddOpportunityContextProvider = Context.Provider;
  
export const AddOpportunityContextConsumer = Context.Consumer;