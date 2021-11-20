/** Authentication Action Types */

import { Action } from 'redux';
import {
  BusinessPartnerListItem,
  BusinessPartnerAreaInfoFilterItem,
  BusinessPartnerIndustriesFilterItem,
  SelectOptionMethod,
} from '../../helpers/Api/models/Customer';

/** Enum for Authentication Actions */
export enum BusinessPartnerTypes {
  SAVE_LIST_BUSINESSPARTNER = 'SAVE_LIST_BUSINESSPARTNER',
  SAVE_BUSINESSPARTNER_FILTERS = 'SAVE_BUSINESSPARTNER_FILTERS',
  SAVE_BUSINESSPARTNER_SELECTED_FILTER = 'SAVE_BUSINESSPARTNER_SELECTED_FILTERS',
  SAVE_BUSINESSPARTNER_SEARCH_TEXT = 'SAVE_BUSINESSPARTNER_SEARCH_TEXT',
}

/** Authentication success action */
export interface SaveBusinessPartnerAction extends Action<BusinessPartnerTypes.SAVE_LIST_BUSINESSPARTNER> {
  businesspartners: BusinessPartnerListItem[];
}

/** Authentication success action */
export interface SaveBusinessPartnerFilterAction extends Action<BusinessPartnerTypes.SAVE_BUSINESSPARTNER_FILTERS> {
  filter: Array<BusinessPartnerAreaInfoFilterItem | BusinessPartnerIndustriesFilterItem>;
}
export interface SaveBusinessPartnerSelectedFilterAction extends Action<BusinessPartnerTypes.SAVE_BUSINESSPARTNER_SELECTED_FILTER> {
  selected: SelectOptionMethod;
}
export interface SaveBusinessPartnerSearchTextAction extends Action<BusinessPartnerTypes.SAVE_BUSINESSPARTNER_SEARCH_TEXT> {
  searchText: string;
}

export type BusinessPartnerActions =
  | SaveBusinessPartnerAction
  | SaveBusinessPartnerFilterAction
  | SaveBusinessPartnerSelectedFilterAction
  | SaveBusinessPartnerSearchTextAction;

/** Authentication state definition */
export interface BusinessPartnerState {
  readonly businesspartners: BusinessPartnerListItem[];
  readonly businessPartnerFilters: Array<BusinessPartnerAreaInfoFilterItem | BusinessPartnerIndustriesFilterItem>;
  readonly businessPartnerSelectedFilter?: SelectOptionMethod;
  readonly businessPartnerSearchText: string;
}
