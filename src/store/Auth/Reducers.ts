/**
 * Authentication State Reducer
 */

 import { Reducer } from 'redux';
 import { UserItem } from '../../helpers/Api/models';
 import { AuthTypes, AuthActions, AuthState } from '../Auth/Types';
 
 /**
  * Initial State
  */
 export const createAuthInitialState = () : AuthState => {
   return {
     loginWithoutCompany:false,
     login: false,
     loading: false,
     error: false,
     user: {
       defaultSalesOrderType: '',
       description: '',
       text:'',
       user: '',
       handler: '',
       language: '',
       currentEnvironment: []
     } as UserItem
   }
 };
 const initialState = createAuthInitialState();
 
 /**
  * Sales Order Reducer
  * @param state auth state object
  * @param action auth actions
  */
 export const authReducer: Reducer<AuthState, AuthActions> = (state = initialState, action) => {
   switch (action.type) {
     case AuthTypes.AUTH_SUCCESS:
       return {
         ...state,
         login: true,
         loading: false
       };
 
     case AuthTypes.LOGOUT_SUCCESS:
         return {
          ...state,
          login: false,
          loginWithoutCompany: false
        }; //maintained in root reducer
     case AuthTypes.AUTH_START:
       return {
         ...state,
         loading: true
       };
     case AuthTypes.USER_SET:
       return {
         ...state,
         user: { ...action.user }
       };
      case AuthTypes.LOGIN_WITHOUT_COMPANY:
       return {
         ...state,
         loginWithoutCompany:true,
         loading: false
       };
       case AuthTypes.AUTH_ERROR:
        return {
          ...state,
          error:true,
          loading: false
        };
     default:
       return state;
   }
 };
 