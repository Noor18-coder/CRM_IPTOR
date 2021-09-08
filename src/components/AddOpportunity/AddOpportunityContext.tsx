import * as React from 'react';

export interface AddOpportunityContextInterface {
  customerId?: string;
  customerName?: string;
}

export const Context = React.createContext<AddOpportunityContextInterface | null>(null);

export const AddOpportunityContextProvider = Context.Provider;

export const AddOpportunityContextConsumer = Context.Consumer;
