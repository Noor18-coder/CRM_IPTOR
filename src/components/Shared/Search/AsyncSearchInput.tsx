/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { BusinessPartnerListItem } from '../../../helpers/Api/models';

interface Props {
  id: string;
  onSearch: (key: string) => Promise<BusinessPartnerListItem[]>;
  onSearchItemSelect: (data: any) => void;
}

const AsynSearchInput: React.FC<Props> = ({ id, onSearch, onSearchItemSelect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<BusinessPartnerListItem[]>([]);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>('');

  const onSelect = async (data: any) => {
    if (data && data.length) {
      const selectItem: BusinessPartnerListItem = data[0];
      setInputValue(selectItem.description);
      onSearchItemSelect(data);
      setEdit(false);
    }
  };

  const handleSearch = async (query: string) => {
    setOptions([]);
    setIsLoading(true);
    const data: any = await onSearch(query);
    setOptions(data);
    setIsLoading(false);
  };

  const onInputValueChange = (flag: boolean) => {
    setEdit(flag);
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <>
      {edit ? (
        <AsyncTypeahead
          onChange={onSelect}
          filterBy={filterBy}
          id={id}
          isLoading={isLoading}
          labelKey="description"
          minLength={3}
          onSearch={handleSearch}
          options={options}
          placeholder="Type Customer"
          renderMenuItemChildren={(option) => (
            <>
              <span>{option.description}</span>
            </>
          )}
        />
      ) : (
        <input type="text" value={inputValue} className="form-control" placeholder="Type Customer" onFocus={() => onInputValueChange(true)} />
      )}
    </>
  );
};

export default AsynSearchInput;
