import React from 'react';
import renderer from 'react-test-renderer';
import AsynSearchInput from './AsyncSearchInput';
import BusinessPartnerListItemMock from '../../../mocks/BusinessPartnerListItem.mock';

const partners = BusinessPartnerListItemMock.getBusinessPartnerListItem(1);
const onSearchItemSelect = jest.fn();
const id = 'theID';
const onSearch = jest.fn(() => Promise.resolve(partners));

describe('[Shared] AsynSearchInput', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<AsynSearchInput onSearchItemSelect={onSearchItemSelect} id={id} onSearch={onSearch} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
