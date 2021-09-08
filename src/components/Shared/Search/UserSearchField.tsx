/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../store/store";
import { Typeahead} from 'react-bootstrap-typeahead';
import { UserItem } from '../../../helpers/Api/models';
import { User } from '../../../helpers/Api';


interface Props {
  onChange: (data:UserItem[]) => void;
  description: string;
  selected? : string;
}


const UserSearchField:React.FC<Props> = ({onChange, description, selected }) => {
    const state: AppState = useSelector((state: AppState) => state);
    const options:UserItem[] = state.users.users;
    const [selectedUser, setSelectedUser] = React.useState<UserItem[]>();

    React.useEffect(() => {
        const data:UserItem[] | undefined = state.users.users.filter((obj:UserItem) => {return obj.handler === selected});
        setSelectedUser(data);
    },[]);

  return (
    <Typeahead
      id={'handler'}
      onChange={onChange}
      multiple={false}
      maxResults={options.length    }
      options={options}
      paginate={false}
      placeholder={description}
      labelKey={option => `${option.description}`}
    />
  );
};
/* example-end */

export default UserSearchField;