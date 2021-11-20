import { Context, CustomerContextProvider, CustomerContextConsumer } from './CustomerContext';

describe('[AddCustomer] CustomerContext', () => {
  it('should create context', () => {
    expect(CustomerContextProvider).toBe(Context.Provider);
    expect(CustomerContextConsumer).toBe(Context.Consumer);
  });
});
