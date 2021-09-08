import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import AddOpportunityUserDefinedFields from './AddOpportunityUserDefinedFields';
import AddOpportunityDefaultFields from './AddOpportunityDefaultFields';
import AddOpportunitySelectItems from './AddOpportunitySelectItems';
import ImageConfig from '../../config/ImageConfig';

import { AppState } from '../../store/store';
import { setOpportunityWindowActive, setOpportunityLoader, resetOpportunityData } from '../../store/AddOpportunity/Actions';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import * as models from '../../helpers/Api/models';

const AddOpportunity: React.FC = () => {
  const [step, setStep] = React.useState<number>(1);
  const state: AppState = useSelector((appState: AppState) => appState);
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();

  const createOpportunity = async (items: models.Item[]) => {
    dispatch(setOpportunityLoader(true));
    const opportunity: models.AddOpportunityDefaultParams = state.addOpportunity.opportunityDefaultParams;
    opportunity.handler = state.auth.user.handler;
    const data = await AddOpportunityApi.add(opportunity);
    const opptyId = data.data.opportunityId;
    const { attributes } = state.addOpportunity;

    Promise.all(
      attributes.map((obj: models.UserDefinedFieldReduxParams) => {
        return AddOpportunityApi.addAttributes(opptyId, obj.attributeType, obj.attributeValue);
      })
    ).then((response) => {
      return response;
    });

    Promise.all(
      items.map((item: models.Item) => {
        return AddOpportunityApi.addItem(opptyId, item.item, 1, item.stockingUnit);
      })
    ).then((response) => {
      return response;
    });

    Promise.all(
      state.addOpportunity.contacts.map((contact: models.CustomerDetailsContactsGroupItem) => {
        const params: models.AddCustomerContactParams = {
          contactParentId: opptyId,
          contactPerson: contact.contactPerson,
          phone: contact.phone,
          mobile: '',
          linkedin: '',
          fax: contact.fax,
          email: contact.email,
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
  };

  const closeAction = () => {
    dispatch(resetOpportunityData());
    dispatch(setOpportunityWindowActive(false));
    dispatch(setOpportunityLoader(false));
  };

  const changeStep = (num: number) => {
    setStep(num);
  };

  return (
    <>
      <div className="sliding-panel-container">
        <div className="sliding-panel">
          <div className="title-row opp-header-text">
            <button type="button" className="mob-steps-back" onClick={closeAction}>
              <img src={ImageConfig.CHEVRON_LEFT} alt="Back" />
            </button>
            Add New Opportunity
            <button type="button" className="panel-close-icon link-anchor-button" onClick={closeAction}>
              <img src={ImageConfig.CLOSE_BTN} alt="Close" />
            </button>
          </div>

          <div className="all-opportunity-steps-container">
            {step === 1 ? <AddOpportunityDefaultFields changeStep={changeStep} /> : null}
            {step === 2 ? <AddOpportunityUserDefinedFields changeStep={changeStep} /> : null}
            {step === 3 ? <AddOpportunitySelectItems createOpportunity={createOpportunity} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOpportunity;
