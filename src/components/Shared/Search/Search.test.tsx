import React from 'react';
import renderer from 'react-test-renderer';
import Search from './Search';

const onChange = jest.fn(() => Promise.resolve([{ opportunityId: '123', name: 'label' }]));
const onSearch = jest.fn();
const onSearchItemSelect = jest.fn();

describe('[Shared] Search', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<Search onChange={onChange} onSearch={onSearch} onSearchItemSelect={onSearchItemSelect} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
