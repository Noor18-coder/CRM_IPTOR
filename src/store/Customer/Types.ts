
/** Authentication Action Types */

import { Action } from 'redux';
import { BusinessPartnerListItem, BusinessPartnerFilterItem } from '../../helpers/Api/models/Customer';

/** Enum for Authentication Actions */
export enum BusinessPartnerTypes {
    SAVE_LIST_BUSINESSPARTNER = 'SAVE_LIST_BUSINESSPARTNER',
    SAVE_BUSINESSPARTNER_FILTERS = 'SAVE_BUSINESSPARTNER_FILTERS'
}

/** Authentication success action */
export interface SaveBusinessPartnerAction extends Action<BusinessPartnerTypes.SAVE_LIST_BUSINESSPARTNER> {
    businesspartners: BusinessPartnerListItem[]
}

/** Authentication success action */
export interface SaveBusinessPartnerFilterAction extends Action<BusinessPartnerTypes.SAVE_BUSINESSPARTNER_FILTERS> {
    filter: BusinessPartnerFilterItem[]
}

export type BusinessPartnerActions = SaveBusinessPartnerAction | SaveBusinessPartnerFilterAction;

/** Authentication state definition */
export interface BusinessPartnerState {
    readonly businesspartners: BusinessPartnerListItem[]
    readonly businessPartnerFilters: BusinessPartnerFilterItem[]
}

