/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React from 'react';
import { useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import { AppState } from '../../../store/store';
import { UserItem } from '../../../helpers/Api/models';

interface Props {
  onChange: (data: UserItem) => void;
  description: string;
  currentSelectedUser?: string;
}

export const UserSearchField: React.FC<Props> = ({ onChange, description, currentSelectedUser }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const options: UserItem[] = state.users.users;
  const [edit, setEdit] = React.useState<boolean>(false);
  const [username, setUserName] = React.useState<string>('');
  // const [userFullName, setFullNameUser] = React.useState<string>('');
  const [defaultSelected, setDefaultSelected] = React.useState<UserItem[]>();

  const onUserChange = (user: UserItem[]) => {
    if (user && user.length) {
      setEdit(false);
      setUserName(user[0].user);
      setDefaultSelected(user);
      onChange(user[0]);
    }
  };

  const onInputValueChange = () => {
    setEdit(true);
  };

  const getSelectedUser = () => {
    const user = state.users.users.find((obj) => obj.user.toLowerCase() === username?.toLowerCase());
    if (user) {
      return user.description;
    }
    return '';
  };

  React.useEffect(() => {
    setUserName(currentSelectedUser || '');
    const user = state.users.users.find((obj) => obj.user.toLowerCase() === currentSelectedUser?.toLowerCase());

    if (user) {
      setDefaultSelected([user]);
    }
  }, []);

  return (
    <>
      {edit ? (
        <Typeahead
          id="handler"
          onChange={onUserChange}
          multiple={false}
          maxResults={options.length}
          options={options}
          defaultSelected={defaultSelected}
          paginate={false}
          placeholder={description}
          labelKey={(option) => `${option.description}`}
        />
      ) : (
        <input type="text" value={getSelectedUser()} className="form-control" onFocus={onInputValueChange} />
      )}
    </>
  );
};

export default UserSearchField;
