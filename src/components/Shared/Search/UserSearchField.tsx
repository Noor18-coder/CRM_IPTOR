/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React from 'react';
import { useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import { AppState } from '../../../store/store';
import { UserItem } from '../../../helpers/Api/models';

interface Props {
  onChange: (data: UserItem[]) => void;
  description: string;
}

const UserSearchField: React.FC<Props> = ({ onChange, description }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const options: UserItem[] = state.users.users;

  return (
    <Typeahead
      id="handler"
      onChange={onChange}
      multiple={false}
      maxResults={options.length}
      options={options}
      paginate={false}
      placeholder={description}
      labelKey={(option) => `${option.description}`}
    />
  );
};

export default UserSearchField;
