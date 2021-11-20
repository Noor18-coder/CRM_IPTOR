import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { isArray } from 'lodash';
import Alert from 'react-bootstrap/Alert';
import AddOpportunityUserDefinedFields from './AddOpportunityUserDefinedFields';
import AddOpportunityDefaultFields from './AddOpportunityDefaultFields';
import AddOpportunitySelectItems from './AddOpportunitySelectItems';
import ImageConfig from '../../config/ImageConfig';
import { Constants } from '../../config/Constants';

import { AppState } from '../../store/store';
import {
  setOpportunityWindowActive,
  setOpportunityLoader,
  resetOpportunityData,
  setAddOpportunityError,
  setAddOpportunitySuccess,
} from '../../store/AddOpportunity/Actions';

import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import { Attributes } from '../../helpers/Api/Attributes';
import * as models from '../../helpers/Api/models';
import i18n from '../../i18n';

const AddOpportunity: React.FC = () => {
  const [step, setStep] = React.useState<number>(1);
  const state: AppState = useSelector((appState: AppState) => appState);
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();

  const createOpportunity = async () => {
    const { attributes, contacts, opportunityDefaultParams, products } = state.addOpportunity;
    opportunityDefaultParams.handler = state.auth.user.user;
    dispatch(setOpportunityLoader(true));
    const data = await AddOpportunityApi.add(opportunityDefaultParams);

    if (data && data.data && data.data.opportunityId) {
      const opptyId = data.data.opportunityId;
      Promise.all(
        attributes.map((obj: models.SaveAttributeFieldParam) => {
          obj.parentFile = Constants.OPPORTUNITY_ATTRIBUTES_PARENT_FILE;
          obj.parentId = opptyId;

          const params: models.SaveAttributeFieldParam = {
            parentFile: Constants.OPPORTUNITY_ATTRIBUTES_PARENT_FILE,
            parentId: opptyId,
            attributeType: obj.attributeType,
          };

          if (obj.attributeValueD) {
            params.attributeValueD = obj.attributeValueD;
          } else {
            params.attributeValue = obj.attributeValue;
          }
          return Attributes.addAttribute(params);
        })
      ).then((response) => {
        return response;
      });

      Promise.all(
        products.map((item: models.Item) => {
          return AddOpportunityApi.addItem(opptyId, item.item, 1, item.stockingUnit);
        })
      ).then((response) => {
        return response;
      });

      Promise.all(
        contacts.map((contact: models.CustomerDetailsContactsGroupItem) => {
          const params: models.AddCustomerContactParams = {
            contactParentId: opptyId,
            contactPerson: contact.contactPerson,
            phone: contact.phone,
            mobile: '',
            linkedin: '',
            fax: contact.fax,
            email: contact.email,
            contactDC: contact.contactDC,
          };
          return AddOpportunityApi.addContact(params);
        })
      ).then((response) => {
        return response;
      });

      dispatch(setOpportunityWindowActive(false));
      dispatch(setOpportunityLoader(false));

      dispatch(resetOpportunityData());
      if (opptyId) {
        history.push({ pathname: '/opp-details', state: { oppid: opptyId } });
      }
      return dispatch(setAddOpportunitySuccess(true));
    } else {
      dispatch(setOpportunityLoader(false));
      if (data.messages && isArray(data.messages) && data.messages[0] && data.messages[0].text) {
        return dispatch(setAddOpportunityError(data.messages[0].text));
      } else {
        return dispatch(setAddOpportunityError('Error occured while creating new opportunity.'));
      }
    }
  };

  const closeAction = () => {
    dispatch(resetOpportunityData());
    dispatch(setOpportunityWindowActive(false));
    dispatch(setOpportunityLoader(false));
  };

  const changeStep = (num: number) => {
    setStep(num);
  };

  const hideErrorMessage = () => {
    dispatch(setAddOpportunityError(''));
  };

  return (
    <>
      <div className="sliding-panel-container fixed-header-footer">
        <div className="sliding-panel">
          <div className="title-row opp-header-text">
            <button type="button" className="mob-steps-back" onClick={closeAction}>
              <img src={ImageConfig.CHEVRON_LEFT} alt="Back" />
            </button>
            {i18n.t('addNewOppt')}
            <button type="button" className="panel-close-icon link-anchor-button" onClick={closeAction}>
              <img src={ImageConfig.CLOSE_BTN} alt="Close" />
            </button>
          </div>
          {state.addOpportunity.error ? (
            <Alert variant="danger" onClose={hideErrorMessage} dismissible>
              <Alert.Heading>Error</Alert.Heading>
              <p>{state.addOpportunity.error}</p>
            </Alert>
          ) : null}
          <div className="all-opportunity-steps-container">
            {step === 1 ? <AddOpportunityDefaultFields changeStep={changeStep} /> : null}
            {step === 2 ? <AddOpportunityUserDefinedFields changeStep={changeStep} /> : null}
            {step === 3 ? <AddOpportunitySelectItems changeStep={changeStep} createOpportunity={createOpportunity} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOpportunity;
