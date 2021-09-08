import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { OpportunityListItem } from '../../../helpers/Api/models';

interface Props {
  onChange: () => void;
  onSearch: (key: string) => void;
  onSearchItemSelect: (data: any) => void;
}

const Search: React.FC<Props> = ({ onChange, onSearch, onSearchItemSelect }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    const data: any = await onSearch(query);
    setIsLoading(false);
    setOptions(data);
  };

  const selectItem = async (option: any) => {
    onSearchItemSelect(option[0]);
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <div className="navbar-search-overlap">
      <form role="search">
        <div className="form-group">
          <div className="input-search">
            <i className="input-search-icon wb-search" aria-hidden="true" />
            <AsyncTypeahead
              onChange={selectItem}
              filterBy={filterBy}
              id="async-example"
              isLoading={isLoading}
              labelKey={(option: any) => `${option.opportunityId} ${option.name}`}
              minLength={3}
              delay={300}
              onInputChange={onChange}
              options={options}
              onSearch={handleSearch}
              placeholder="Search"
              renderMenuItemChildren={(option: OpportunityListItem) => (
                <>
                  <span>{option.name}</span>
                </>
              )}
            />
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label  */}
            <button type="button" className="search-settings-button" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
