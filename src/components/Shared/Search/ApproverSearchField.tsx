/* eslint-disable no-shadow */
import React from 'react';
import { useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import { AppState } from '../../../store/store';
import { UserItem } from '../../../helpers/Api/models';
import ImageConfig from '../../../config/ImageConfig';

const ApproverRoles = ['Admin', 'Manager'];

interface Props {
  onChange: (data: string) => void;
  description: string;
  currentSelectedUser?: string;
  disabled: boolean;
  value?: string;
}

const ApproverSearchField: React.FC<Props> = (props) => {
  const { onChange, description, disabled, value } = props;
  const state: AppState = useSelector((appState: AppState) => appState);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<UserItem[]>([]);
  const onUserChange = (user: UserItem[]) => {
    if (user && user.length) {
      setEdit(false);
      onChange(user[0].user);
    }
  };

  const onInputValueChange = (flag: boolean) => {
    setEdit(flag);

    if (flag === true) {
      onChange('');
    }
  };

  React.useEffect(() => {
    const users: UserItem[] = state.users.users.filter((obj: UserItem) => {
      const role = obj.ROLE ? obj.ROLE : '';
      return ApproverRoles.indexOf(role) > -1;
    });
    setOptions(users);
  }, []);

  return (
    <>
      {edit ? (
        <>
          <div>
            <Typeahead
              id="userId"
              onChange={onUserChange}
              multiple={false}
              maxResults={options.length}
              options={options}
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
          </div>
        </>
      ) : (
        <>
          <input type="text" value={`${value}`} disabled={disabled} className="form-control" />
          <button
            type="button"
            className="edit-approver-name"
            onClick={() => {
              onInputValueChange(true);
            }}>
            <img src={ImageConfig.EDIT_ICON} alt="edit" />
          </button>
        </>
      )}
    </>
  );
};

export default ApproverSearchField;
