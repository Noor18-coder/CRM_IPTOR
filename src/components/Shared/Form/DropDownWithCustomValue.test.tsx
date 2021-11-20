import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import DropDownWithCustomValue from './DropDownWithCustomValue';
import StoreMock from '../../../mocks/Store.mock';

const store = StoreMock.createInitialStore();

const obj = [
  {
    parentFile: 'jhj',
    attributeType: 'jshjd',
    description: 'ndndss',
    preloaded: true,
    allowCopy: true,
    valueFormat: 'jdsh',
    valueFormatDesc: 'dfhvf',
    attributeId: 'dghgd',
    validate: true,
    uniqueRecord: true,
    statement: 'hdsghdsg',
    sequence: 4736,
    group: 'sfhsdg',
    initializeAttribute: true,
    initialValueN: 867,
    protectData: true,
    valuesExist: true,
  },
  {
    parentFile: 'jjfg',
    attributeType: 'wrwe',
    description: 'lkjl',
    preloaded: true,
    allowCopy: true,
    valueFormat: 'vnv',
    valueFormatDesc: 'iui',
    attributeId: 'dasd',
    validate: true,
    uniqueRecord: true,
    statement: 'uoyu',
    sequence: 4736,
    group: 'xvss',
    initializeAttribute: true,
    initialValueN: 867,
    protectData: true,
    valuesExist: true,
  },
];
const options = {
  data: [
    { values: 'Option1', attributeId: 'id1' },
    { values: 'Option2', attributeId: 'id2' },
    { values: 'Option3', attributeId: 'id3' },
  ],
};
const onSelect = jest.fn();

describe('[Shared] DropDownWithCustomValue', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <DropDownWithCustomValue obj={obj} options={options} onSelect={onSelect} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
