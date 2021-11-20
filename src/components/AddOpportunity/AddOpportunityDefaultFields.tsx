import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import AsynSearchInput from '../Shared/Search/AsyncSearchInput';

import { AppState } from '../../store/store';
import ImageConfig from '../../config/ImageConfig';
import * as models from '../../helpers/Api/models';
import { OpportunityTypeList } from './OpportunityTypeList';
import { Context } from './AddOpportunityContext';
import i18n from '../../i18n';

import { saveOpportunityParams, setOpportunityContacts, setAddOpportunityError } from '../../store/AddOpportunity/Actions';
import { getOpportunityTypes, saveOpportunityStages } from '../../store/InitialConfiguration/Actions';
import CustomerList from '../../helpers/Api/CustomerList';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';

const regex = /^-?\d+\.?\d*$/;

interface Props {
  changeStep: (num: number) => void;
}

interface ErrorMessages {
  desc?: string;
  customer?: string;
  stage?: string;
  oppRecordType?: string;
}

const AddOpportunityDefaultFields: React.FC<Props> = ({ changeStep }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  // const opportunity: models.AddOpportunityDefaultParams = state.addOpportunity.opportunityDefaultParams;
  const dispatch: Dispatch<any> = useDispatch();
  const [selectedOpportunityType, selectOpportunityType] = React.useState('');
  const selectedContacts = state.addOpportunity.contacts;
  const [customerContacts, setCustomerContacts] = React.useState<models.CustomerDetailsContactsGroupItem[]>([]);
  const [opportunity, setOpportunityField] = React.useState<models.AddOpportunityDefaultParams>();
  const contextValue = React.useContext(Context);
  const [nextButtonEnabled, setNextButtonEnabled] = React.useState<boolean>(true);
  const [errors, setErrorMessages] = React.useState<ErrorMessages>();

  const searchCustomers = async (key: string): Promise<models.BusinessPartnerListItem[]> => {
    const data = await CustomerList.get(key, 20, 0);
    return data.data.items;
  };

  const loadCustomerContacts = async (customerId: string) => {
    const customerContactsData = await CustomerDetailsApi.getAllContactDetails(customerId);
    setCustomerContacts(customerContactsData);
  };

  const onSearchItemSelect = async (data: any) => {
    if (data && data.length) {
      const selectItem: models.BusinessPartnerListItem = data[0];
      setOpportunityField({
        ...opportunity,
        customer: selectItem.businessPartner,
        customerName: selectItem.description,
      });
      setErrorMessages({
        ...errors,
        customer: '',
      });
      loadCustomerContacts(selectItem.businessPartner);
    } else {
      setErrorMessages({
        ...errors,
        customer: i18n.t('blankFieldError'),
      });
    }
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOpportunityField({
      ...opportunity,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const onOpportunityTypeSelect = (type: string) => {
    setOpportunityField({
      ...opportunity,
      oppRecordType: type,
    });
    selectOpportunityType(type);
  };

  const isNumeric = (value: any) => {
    if (value && !value.match(regex)) {
      return false;
    }
    return true;
  };

  const validateStepSecond = () => {
    const type = opportunity?.oppRecordType;
    const { currency, endDate, estimatedValue, forecastCategory, area } = state.addOpportunity.opportunityDefaultParams;
    if (
      type &&
      currency &&
      endDate &&
      estimatedValue &&
      forecastCategory &&
      area &&
      isNumeric(opportunity?.estimatedValue) &&
      checkIfAllFieldsHasValue(type)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkIfAllFieldsHasValue = (type: string) => {
    let check = true;
    const { attributes } = state.addOpportunity;
    const selectedOpportunityRecordType = state.enviornmentConfigs.crmOpportunityTypes.find((obj: models.OpportunityType) => {
      return obj.oppRecordType === type;
    });
    const fields = selectedOpportunityRecordType?.MANDATORY_FIELDS || [];

    fields.forEach((field: string) => {
      const currField = attributes.find((obj: models.UserDefinedFieldReduxParams) => {
        return obj.attributeType === field;
      });
      if (currField && (currField.attributeValue || currField.attributeValueD)) {
        if (currField.valueFormat === 'N' && !isNumeric(currField.attributeValue)) {
          check = false;
        }
      } else {
        check = false;
      }
    });
    return check;
  };

  const onNextButtonClick = () => {
    changeStep(2);
    dispatch(saveOpportunityParams(opportunity));
  };

  const onClickStep2 = () => {
    if (!nextButtonEnabled) {
      dispatch(saveOpportunityParams(opportunity));
      changeStep(2);
    } else {
      dispatch(setAddOpportunityError(i18n.t('mandatoryFieldsMsg')));
    }
  };

  const onClickStep3 = () => {
    const valid = validateStepSecond();
    if (!nextButtonEnabled && valid) {
      dispatch(saveOpportunityParams(opportunity));
      changeStep(3);
    } else {
      const error = nextButtonEnabled ? i18n.t('mandatoryFieldsMsg') : i18n.t('mandatoryFieldStep2');
      dispatch(setAddOpportunityError(error));
    }
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (value.length === 0) {
      setErrorMessages({
        ...errors,
        [id]: i18n.t('blankFieldError'),
      });
      inputElement.style.border = '1px solid #ED2024';
    } else {
      setErrorMessages({
        ...errors,
        [id]: '',
      });
      inputElement.style.border = '1px solid #DAE2E7';
    }
  };

  const onCustomerContactSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedContactId = e.currentTarget.value;
    const selectedContact = customerContacts.filter((obj: models.CustomerDetailsContactsGroupItem) => {
      return obj.contactDC === selectedContactId;
    });
    dispatch(setOpportunityContacts(selectedContact));
  };

  React.useEffect(() => {
    if (opportunity?.desc && opportunity?.oppRecordType && opportunity?.customer && opportunity?.stage) {
      setNextButtonEnabled(false);
    } else {
      setNextButtonEnabled(true);
    }
  }, [opportunity]);

  React.useEffect(() => {
    if (!state.enviornmentConfigs.crmOpportunityTypes.length) {
      dispatch(getOpportunityTypes());
    }
    const tempOpptyObject = { ...state.addOpportunity.opportunityDefaultParams };
    if (tempOpptyObject?.oppRecordType) {
      selectOpportunityType(tempOpptyObject.oppRecordType);
    }
    if (!tempOpptyObject.stage) {
      tempOpptyObject.stage = state.enviornmentConfigs.defaultOpprtunityInfo.stageCreated;
    }
    if (!state.enviornmentConfigs.crmOpportunityStage.length) {
      dispatch(saveOpportunityStages());
    }

    if (tempOpptyObject.customer) {
      loadCustomerContacts(tempOpptyObject.customer);
    } else if (contextValue?.customerId) {
      tempOpptyObject.customer = contextValue.customerId;
      tempOpptyObject.customerName = contextValue.customerName;
      loadCustomerContacts(contextValue.customerId);
    }
    setOpportunityField(tempOpptyObject);
    dispatch(saveOpportunityParams(tempOpptyObject));
  }, []);

  return (
    <>
      <div className="opportunity-step-circles">
        <ul className="list-inline step-circles">
          <li className="list-inline-item circle-stepone steps active">
            <span className="num">1</span>
          </li>
          <li className="list-inline-item circle-steptwo steps" role="presentation" onClick={() => onClickStep2()}>
            <span className="num">2</span>
          </li>
          <li className="list-inline-item circle-stepthree steps" role="presentation" onClick={() => onClickStep3()}>
            <span className="num">3</span>
          </li>
        </ul>
      </div>
      <div className="opportunity-forms form-top">
        <p className="stepone-title">{i18n.t('addOpportunityTitle')}</p>
        {state.enviornmentConfigs.crmOpportunityTypes.length && state.enviornmentConfigs.crmOpportunityStage.length ? (
          <div className="">
            <div className="steps-one-forms">
              <form>
                <div className="form-group oppty-form-elements">
                  <label htmlFor="desc" className="opp-label">
                    {i18n.t('addOpportunityNameLabel')}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={opportunity?.desc}
                    placeholder="Give opportunity a name"
                    id="desc"
                    onBlur={onBlur}
                    onChange={onInputValueChange}
                  />
                  <span className="form-hints">{errors?.desc}</span>
                </div>
                <div className="form-group oppty-form-elements">
                  <label htmlFor="customer" className="opp-label">
                    {i18n.t('addOpportunitySelectCustomerLabel')}
                  </label>
                  {contextValue?.customerId && contextValue?.customerName ? (
                    <input
                      type="text"
                      id="customer"
                      className="form-control"
                      placeholder=""
                      contentEditable={false}
                      onBlur={onBlur}
                      disabled={!!(contextValue && contextValue.customerId)}
                      value={opportunity?.customerName}
                    />
                  ) : (
                    <AsynSearchInput id="customer" onSearch={searchCustomers} onSearchItemSelect={onSearchItemSelect} />
                  )}
                  <span className="form-hints">{errors?.customer}</span>
                </div>

                <div className="form-group oppty-form-elements">
                  <label htmlFor="customer-contact" className="opp-label">
                    {i18n.t('addOpportunityAddCustomerContact')} <span className="opt-field">({i18n.t('addOpportunityOptionalField')})</span>
                  </label>
                  <select className="form-control iptor-dd" id="customer-contact" onChange={onCustomerContactSelect}>
                    <option selected>{i18n.t('addOpportunitySelectCustomerContact')}</option>
                    {customerContacts.map((obj: models.CustomerDetailsContactsGroupItem) => {
                      if (selectedContacts.length && selectedContacts[0].contactDC === obj.contactDC) {
                        return (
                          <option selected value={obj.contactDC}>
                            {obj.contactPerson}
                          </option>
                        );
                      }
                      return <option value={obj.contactDC}>{obj.contactPerson}</option>;
                    })}
                  </select>
                </div>

                <div className="form-group oppty-form-elements">
                  <label htmlFor="stage" className="opp-label">
                    {i18n.t('addOpportunitySelectStage')}
                  </label>
                  <select className="form-control iptor-dd" id="stage" onChange={onInputValueChange} value={opportunity?.stage}>
                    {state.enviornmentConfigs.crmOpportunityStage.map((obj: models.StageInfo) => {
                      return (
                        <option value={obj.salesStage} selected={state.enviornmentConfigs.defaultOpprtunityInfo.stageCreated === obj.salesStage}>
                          {obj.salesStage} - {obj.description}
                        </option>
                      );
                    })}
                  </select>
                  <span className="form-hints">{errors?.stage}</span>
                </div>

                <div className="form-group oppty-form-elements">
                  <label htmlFor="oppty-type" className="opp-label">
                    {i18n.t('addOpportunitySelectOpportunityType')}
                  </label>
                  <br />
                  <span className="form-hints">{errors?.stage}</span>
                  <div className="opportunity-type-container">
                    <OpportunityTypeList
                      opptyTypes={state.enviornmentConfigs.crmOpportunityTypes}
                      doClick={onOpportunityTypeSelect}
                      selected={selectedOpportunityType}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <p>{i18n.t('formNotLoading')}</p>
        )}
      </div>
      <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
        <button
          type="button"
          disabled={nextButtonEnabled}
          className={nextButtonEnabled ? 'stepone-next-btn inactive' : 'stepone-next-btn '}
          onClick={onNextButtonClick}>
          {i18n.t('nextButton')}
          <span className="right-whit-arrow">
            <img src={ImageConfig.CHEVRON_RIGHT_WHITE} alt="Next Arrow" />
          </span>
        </button>
      </div>
    </>
  );
};

export default AddOpportunityDefaultFields;
