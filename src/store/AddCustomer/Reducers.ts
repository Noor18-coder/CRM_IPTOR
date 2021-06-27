/**
 * Authentication State Reducer
 */

 import { Reducer } from 'redux';
 import { AddBusinessPartnerReduxActions , AddBusinessPartnerState, AddBusinessPartnerTypes} from './Types';
 
 /**
  * Initial State
  */
 export const createAddBusinessPartnerInitialState = (): AddBusinessPartnerState => {
     return {
         loader:false,
         addBusinessPartnerWindowActive:false,
         businessPartnerDefaultParams:{},
         attributes: [],
         businessPartnerWindowGroup: ''
     }
 };
 
 const initialState = createAddBusinessPartnerInitialState();
 
 /**
  * Sales Order Reducer
  * @param state auth state object
  * @param action auth actions
  */
 const addBusinessPartnerReducer: Reducer<AddBusinessPartnerState, AddBusinessPartnerReduxActions> = (state = initialState, action) => {
     switch (action.type) {
         case AddBusinessPartnerTypes.SAVE_ADD_BUSINESS_PARTNER_DEFAULT_FIELDS:
             return {
                 ...state,
                 businessPartnerDefaultParams: { ...state.businessPartnerDefaultParams, ...action.businessPartner }
             };
         case AddBusinessPartnerTypes.SAVE_ADD_BUSINESS_PARTNER_ATTRIBUTE:
             return {
                 ...state,
                 attributes: action.attributes
             };
         case AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_LOADER:
                return {
                    ...state,
                    loader: action.loader
             };
         case AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_WINDOW:
            return {
                ...state,
                addBusinessPartnerWindowActive: action.addBusinessPartnerWindowActive
             };
         case AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_WINDOW_GROUP:
             return {
                 ...state,
                 businessPartnerWindowGroup: action.businessPartnerWindowGroup
             };
         case AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_DATA:
            return {...state,
                loader:false,
                addBusinessPartnerWindowActive:false,
                businessPartnerDefaultParams:{},
                attributes:[],
                items: [],
                businessPartnerWindowGroup: ''
            }

        default:
             return state;
     }
 };
 
export default addBusinessPartnerReducer;