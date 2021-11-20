/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  BusinessPartnerAreaInfoFilterItem,
  BusinessPartnerIndustriesFilterItem,
  BusinessPartnerListItem,
  SelectOptionMethod,
} from '../../helpers/Api/models/Customer';
import BusinessPartnerList from '../../helpers/Api/CustomerList';
import {
  BusinessPartnerTypes,
  SaveBusinessPartnerAction,
  SaveBusinessPartnerFilterAction,
  SaveBusinessPartnerSearchTextAction,
  SaveBusinessPartnerSelectedFilterAction,
} from './Types';

/** Action to set auth state logged in status */
export const saveBusinessPartnerList: ActionCreator<SaveBusinessPartnerAction> = (businesspartnerList: BusinessPartnerListItem[]) => {
  return {
    type: BusinessPartnerTypes.SAVE_LIST_BUSINESSPARTNER,
    businesspartners: businesspartnerList,
  };
};

/** Action to set auth state logged in status */
export const saveBusinessPartnerFilters: ActionCreator<SaveBusinessPartnerFilterAction> = (
  filter: Array<BusinessPartnerAreaInfoFilterItem | BusinessPartnerIndustriesFilterItem>
) => {
  return {
    type: BusinessPartnerTypes.SAVE_BUSINESSPARTNER_FILTERS,
    filter,
  };
};

export const saveBusinessPartnerSelectedFilter: ActionCreator<SaveBusinessPartnerSelectedFilterAction> = (selected: SelectOptionMethod) => {
  return {
    type: BusinessPartnerTypes.SAVE_BUSINESSPARTNER_SELECTED_FILTER,
    selected,
  };
};

export const saveBusinessPartnerSearchText: ActionCreator<SaveBusinessPartnerSearchTextAction> = (searchText: string) => {
  return {
    type: BusinessPartnerTypes.SAVE_BUSINESSPARTNER_SEARCH_TEXT,
    searchText,
  };
};

export const getBusinesspartners: ActionCreator<
  ThunkAction<
    // The type of the last action to be dispatched - will always be promise<T> for async actions
    Promise<SaveBusinessPartnerAction>,
    // The type for the data within the last action
    BusinessPartnerListItem[],
    // The type of the parameter for the nested function
    null,
    // The type of the last action to be dispatched
    SaveBusinessPartnerAction
  >
> = (freeTextSearch: string, limit?: number, offset?: number) => {
  return async (dispatch: Dispatch) => {
    const businesspartnerList = await BusinessPartnerList.get(freeTextSearch, limit, offset);
    return dispatch(saveBusinessPartnerList(businesspartnerList));
  };
};
