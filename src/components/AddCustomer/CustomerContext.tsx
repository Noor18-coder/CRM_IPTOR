import * as React from 'react';

export interface CustomerContextInterface {
  containerType: string;
  containerData?: any;
}

export const Context = React.createContext<CustomerContextInterface | null>(null);

export const CustomerContextProvider = Context.Provider;

export const CustomerContextConsumer = Context.Consumer;
