/**
 * Authentication Actions and Middleware definition
 */
 import { ActionCreator, Dispatch } from 'redux';
 import { ThunkAction } from 'redux-thunk';
 import axios from 'axios';
 import * as actionTypes from './Types';
 //import { AuthRequest } from '../models';
 import * as apiModels from '../../helpers/Api/models';
 //import { User, CompanyInfo } from '../../helpers/Api';
 import { AppState } from '../store';
 //import { isEmpty } from 'lodash';
 
 
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
 export const logOutSuccess: ActionCreator<actionTypes.LogoutSuccessAction> = () => {
   return {
     type: actionTypes.AuthTypes.LOGOUT_SUCCESS
   };
 };
 
 /** Middleware to handle authentication */
 export const auth: ActionCreator<ThunkAction<
   Promise<actionTypes.AuthSuccessAction | actionTypes.LogoutSuccessAction>,
   AppState,
   actionTypes.AuthRequest,
   actionTypes.AuthSuccessAction | actionTypes.LogoutSuccessAction
 >> = (authRequest: actionTypes.AuthRequest) => {
   return async (dispatch: Dispatch, getState) => {
     const {auth} = getState();
     dispatch(authStart());
 
     if (auth.login) {
       return dispatch(authSuccess());
     }
 
     try {
       const response = await axios.post('http://sepdvs137.rd.ibs.net:8219/api/login', authRequest);
       if (response.status === 200) {
        //  const user = await User.get(response.config.data.user);
        //  const companyInfo = await CompanyInfo.get();
        //  if (companyInfo !== undefined && !isEmpty(companyInfo)){
        //    user.currentEnvironment = companyInfo;
        //  }
        //  dispatch(setUserInfo(user))
         return dispatch(authSuccess());
       }
       return dispatch(logOutSuccess());
     } catch (error) {
       //alert('Unauthorized Access');
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
       console.log(error);
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
     const {auth} = getState();
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
 