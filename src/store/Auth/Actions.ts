/**
 * Authentication Actions and Middleware definition
 */
 import { ActionCreator, Dispatch } from 'redux';
 import { ThunkAction } from 'redux-thunk';
 import axios from 'axios';
 import * as actionTypes from './Types';
 import * as apiModels from '../../helpers/Api/models';
 import { AppState } from '../store';
 import { isEmpty } from 'lodash';
 import { User, CompanyInfo, Attributes } from '../../helpers/Api';
import { AttributeValueObject } from '../../helpers/Api/models';
 
 
 
 /** Action to set auth state logged in status */
 export const authSuccess: ActionCreator<actionTypes.AuthSuccessAction> = () => {
   return {
     type: actionTypes.AuthTypes.AUTH_SUCCESS
   };
 };
 
 /** Action to set auth state loading status */
 export const authStart: ActionCreator<actionTypes.AuthStartAction> = () => {
   return {
     type: actionTypes.AuthTypes.AUTH_START
   };
 };
 
 /** Action to set auth state logged out status */
 export const loginWithoutCompanySuccess: ActionCreator<actionTypes.AuthWithoutCompany> = () => {
   return {
     type: actionTypes.AuthTypes.LOGIN_WITHOUT_COMPANY
   };
 };
 
 /** Action to set auth state logged out status */
 export const logOutSuccess: ActionCreator<actionTypes.LogoutSuccessAction> = () => {
   return {
     type: actionTypes.AuthTypes.LOGOUT_SUCCESS
   };
 };
 
 /** Action to set auth state logged out status */
 export const authServiceFailure: ActionCreator<actionTypes.AuthServiceErrorAction> = () => {
   return {
     type: actionTypes.AuthTypes.AUTH_ERROR
   };
 };
 
 
 /** Middleware to handle authentication */
 export const auth: ActionCreator<ThunkAction<
   Promise<actionTypes.AuthWithoutCompany | actionTypes.LogoutSuccessAction>,
   AppState,
   actionTypes.AuthRequest,
   actionTypes.AuthWithoutCompany | actionTypes.LogoutSuccessAction
 >> = (authRequest: actionTypes.AuthRequest) => {
   return async (dispatch: Dispatch, getState) => {
     dispatch(authStart());
 
     try {
       const response = await axios.post('/api/login', authRequest);
       if (response.status === 200) {
         const user = await User.getUserProfile();
           user.handler = user.user;
           if (user.handler == '') {
               const loader = true
           }
         const companyInfo = await CompanyInfo.get();
         const newArray = companyInfo.items.map((obj: apiModels.CompanyInfoItem) => { return { ...obj, selected: false } });
         if (companyInfo !== undefined && !isEmpty(companyInfo)) {
           user.currentEnvironment = newArray;
           }
         dispatch(setUserInfo(user))
         return dispatch(loginWithoutCompanySuccess());
       }
       dispatch(authServiceFailure());
       return dispatch(logOutSuccess());
     } catch (error) {
       //alert('Unauthorized Access');
       dispatch(authServiceFailure());
       return dispatch(logOutSuccess());
     }
   };
 };
 
 /** Middleware to handle authentication */
 export const authWithCompany: ActionCreator<ThunkAction<
   Promise<actionTypes.AuthSuccessAction | actionTypes.LogoutSuccessAction>,
   AppState,
   actionTypes.AuthRequest,
   actionTypes.AuthSuccessAction | actionTypes.LogoutSuccessAction
 >> = (authRequest: actionTypes.AuthRequest) => {
   return async (dispatch: Dispatch, getState) => {
     const { auth } = getState();
     dispatch(authStart());
 
     if (auth.login) {
       return dispatch(authSuccess());
     }
 
       try {
         const response = await axios.post('/api/login', authRequest);
         if (response.status === 200) {
         const user = await User.get(response.config.data.user);
        const userAttributes:any = await Attributes.getAttributes("SROUSP", user.handler);

        if(userAttributes &&  userAttributes.items){
            const role = userAttributes.items.find((obj:AttributeValueObject) => { return obj.attributeType === 'ROLE'});
            user.role = role?.attributeValue;
        }
       
        user.selectedCompany = authRequest.company ? authRequest.company : '';
         dispatch(setUserInfo(user))
         return dispatch(authSuccess());
       }
       dispatch(authServiceFailure());
       return dispatch(logOutSuccess());
     } catch (error) {
       //alert('Unauthorized Access');
       dispatch(authServiceFailure());
       return dispatch(logOutSuccess());
     }
   };
 };
 
 /** Middleware to handle logout */
 export const logOut: ActionCreator<ThunkAction<
   Promise<actionTypes.LogoutSuccessAction>,
   undefined,
   undefined,
   actionTypes.LogoutSuccessAction
 >> = () => {
   return async (dispatch: Dispatch) => {
     try {
       await axios.post('/api/logout');
     } catch (error) {
     } finally {
       sessionStorage.clear();
       return dispatch(logOutSuccess());
     }
   };
 };
 
 /** Middle to check authentication status */
 export const authCheckState: ActionCreator<ThunkAction<
   Promise<actionTypes.AuthSuccessAction | actionTypes.LogoutSuccessAction>,
   AppState,
   undefined,
   actionTypes.AuthSuccessAction | actionTypes.LogoutSuccessAction
 >> = () => {
   return async (dispatch: Dispatch, getState) => {
     const { auth } = getState();
     if (auth.login) {
       return dispatch(authSuccess());
     } else {
       return dispatch(logOutSuccess());
     }
   };
 };
 
 export const setUserInfo: ActionCreator<actionTypes.UserSetAction> = (user: apiModels.UserItem) => {
   return { type: actionTypes.AuthTypes.USER_SET, user };
 };
 
 