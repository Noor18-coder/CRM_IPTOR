/* eslint-disable no-shadow */
import React from 'react';
import { useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import { AppState } from '../../../store/store';
import { UserItem } from '../../../helpers/Api/models';
import ImageConfig from '../../../config/ImageConfig';

interface Props {
  onChange: (data: UserItem) => void;
  description: string;
  currentSelectedUser?: string;
}

const UserSearchField: React.FC<Props> = ({ onChange, description, currentSelectedUser }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const options: UserItem[] = state.users.users;
  const [edit, setEdit] = React.useState<boolean>(false);
  const [username, setUserName] = React.useState<string>('');
  const [defaultSelected, setDefaultSelected] = React.useState<UserItem[]>();

  const onUserChange = (user: UserItem[]) => {
    if (user && user.length) {
      setEdit(false);
      setUserName(user[0].user);
      setDefaultSelected(user);
      onChange(user[0]);
    } else {
      setUserName('');
      onChange(user[0]);
      setDefaultSelected([]);
    }
  };

  const onInputValueChange = (flag: boolean) => {
    setEdit(flag);
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
  }, []);

  return (
    <>
      {edit ? (
        <>
          <Typeahead
            id="userId"
            onChange={onUserChange}
            multiple={false}
            maxResults={options.length}
            options={options}
            defaultSelected={defaultSelected}
            paginate={false}
            placeholder={description}
            autoFocus
            labelKey={(option) => `${option.description}`}
          />
          <button
            type="button"
            className="edit-approver-name"
            onClick={() => {
              onInputValueChange(false);
            }}>
            <img src={ImageConfig.CLOSE_BTN} alt="edit" />
          </button>
        </>
      ) : (
        <input type="text" value={getSelectedUser()} className="form-control" onFocus={() => onInputValueChange(true)} />
      )}
    </>
  );
};

export default UserSearchField;
