/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React, { Fragment, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { BusinessPartnerListItem } from '../../../helpers/Api/models';


interface Props {
  onChange: () => void;
  onSearch: (key:string) => void;
  onSearchItemSelect: (data:any) => void;
}


const AsynSearchInput:React.FC<Props>= ({onChange, onSearch, onSearchItemSelect}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<BusinessPartnerListItem[]>([]);

  const handleSearch = async (query:string) => {
    setOptions([]);
    setIsLoading(true);
    const data: any = await onSearch(query);
    setOptions(data);
    setIsLoading(false);
      
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      onChange={onSearchItemSelect}
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey="description"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder={"Type Customer"}
      renderMenuItemChildren={(option, props) => (
        <Fragment>
          <span>{option.description}</span>
        </Fragment>
      )}
    />
  );
};
/* example-end */

export default AsynSearchInput;