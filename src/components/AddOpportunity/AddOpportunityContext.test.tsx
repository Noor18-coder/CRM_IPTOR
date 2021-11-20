import { Context, AddOpportunityContextProvider, AddOpportunityContextConsumer } from './AddOpportunityContext';

describe('[AddOpportunity] AddOpportunityContext', () => {
  it('should create context', () => {
    expect(AddOpportunityContextProvider).toBe(Context.Provider);
    expect(AddOpportunityContextConsumer).toBe(Context.Consumer);
  });
});
