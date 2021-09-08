import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/store';

import ImageConfig from '../../config/ImageConfig';
import {
  OpportunityType,
  AttributeField,
  UserDefinedFieldsValueDropDown,
  DropDownValues,
  DropDownValue,
  AddOpportunityDefaultParams,
  UserDefinedFieldReduxParams,
  CurrencyItem,
} from '../../helpers/Api/models';
import AddOpportunityFields from '../../helpers/Api/OpportunityUserDefinedFields';
import { saveOpportunityParams, saveOpportunityAttributes, setOpportunityLoader } from '../../store/AddOpportunity/Actions';
import DateInput from '../Shared/Picker/DateInput';

const regex = /^-?\d+\.?\d*$/;

interface Props {
  changeStep: (num: number) => void;
}

export interface IStringList {
  [index: string]: string;
}

interface ErrorMessages {
  [index: string]: string;
}

const AddOpportunityUserDefinedFields: React.FC<Props> = ({ changeStep }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [attributes, setAttributes] = React.useState<AttributeField[]>();
  const [attributeValues, setAttributeValues] = React.useState<UserDefinedFieldsValueDropDown>();
  const [opportunity, setOpportunityField] = React.useState<AddOpportunityDefaultParams>();
  const [attributesSet, setAttributesSet] = React.useState<UserDefinedFieldReduxParams[]>([]);
  const [mandatoryFields, setMandatoryFields] = React.useState<string[]>([]);
  const [nextButtonEnabled, setNextButtonEnabled] = React.useState<boolean>(true);
  const [errors, setErrorMessages] = React.useState<ErrorMessages>();

  React.useEffect(() => {
    const oppRecordType = state.addOpportunity.opportunityDefaultParams.oppRecordType || '';
    const opptyTypeAttribute: UserDefinedFieldReduxParams = { attributeType: 'OPP_RECORD_TYPE', attributeValue: oppRecordType };
    setAttributesSet([opptyTypeAttribute]);

    const selectedOpportunityRecordType = state.enviornmentConfigs.crmOpportunityTypes.find((obj: OpportunityType) => {
      return obj.oppRecordType.toLowerCase() === oppRecordType?.toLowerCase();
    });
    const fields = selectedOpportunityRecordType?.MANDATORY_FIELDS || [];
    const defaultErrorMessages: ErrorMessages = {
      currency: '',
      estimatedValue: '',
      endDate: '',
    };
    fields.forEach((obj: string) => {
      defaultErrorMessages[obj] = '';
    });
    setErrorMessages(defaultErrorMessages);
    setMandatoryFields(fields);
    getAttributes(fields);
  }, []);

  React.useEffect(() => {
    if (opportunity?.currency && opportunity?.endDate && opportunity?.estimatedValue && validateAttributes()) {
      setNextButtonEnabled(false);
    } else {
      setNextButtonEnabled(true);
    }
  }, [opportunity, attributesSet]);

  const getAttributes = async (fields: string[]) => {
    dispatch(setOpportunityLoader(true));

    const attributeFields: AttributeField[] = state.enviornmentConfigs.opportunityAttributes.filter((obj: AttributeField) => {
      return fields.indexOf(obj.attributeType) > -1;
    });
    attributeFields.sort(function callback(a: AttributeField, b: AttributeField) {
      return a.sequence - b.sequence;
    });
    setAttributes(attributeFields);

    const attributesWithValues = attributeFields.filter((obj: AttributeField) => {
      return obj.valuesExist === true;
    });

    const attributeFieldValues: UserDefinedFieldsValueDropDown = await AddOpportunityFields.getAllFieldsValues(attributesWithValues);
    setAttributeValues(attributeFieldValues);
    dispatch(setOpportunityLoader(false));
  };

  const selectOnBlur = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (isValidAttributeValue(id, value)) {
      inputElement.style.border = '1px solid #DAE2E7';
    } else {
      inputElement.style.border = '1px solid #ED2024';
    }
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (isValidAttributeValue(id, value)) {
      const elementIndex = attributesSet.findIndex((element: UserDefinedFieldReduxParams) => element.attributeType === id);
      inputElement.style.border = '1px solid #DAE2E7';
      if (elementIndex === -1) {
        const attribute: UserDefinedFieldReduxParams = { attributeType: id, attributeValue: value };
        setAttributesSet([...attributesSet, attribute]);
      } else {
        const newArray = [...attributesSet];
        newArray[elementIndex].attributeValue = value;
        setAttributesSet(newArray);
      }
    } else {
      inputElement.style.border = '1px solid #ED2024';
    }
  };

  const setOpportunityDefaultParam = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOpportunityField({
      ...opportunity,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const onDateChange = (key: string) => {
    setOpportunityField({
      ...opportunity,
      endDate: key,
    });

    if (key) {
      setErrorMessages({
        ...errors,
        endDate: '',
      });
    } else {
      setErrorMessages({
        ...errors,
        endDate: 'Field cannot be left blank',
      });
    }
  };

  const onNextButtonClick = () => {
    changeStep(3);
    dispatch(saveOpportunityParams(opportunity));
    dispatch(saveOpportunityAttributes(attributesSet));
  };

  const setValue = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (isValidAttributeValue(id, value)) {
      const elementIndex = attributesSet.findIndex((element: UserDefinedFieldReduxParams) => element.attributeType === id);
      inputElement.style.border = '1px solid #DAE2E7';
      if (elementIndex === -1) {
        const attribute: UserDefinedFieldReduxParams = { attributeType: id, attributeValue: value };
        setAttributesSet([...attributesSet, attribute]);
      } else {
        const newArray = [...attributesSet];
        newArray[elementIndex].attributeValue = value;
        setAttributesSet(newArray);
      }
    } else {
      inputElement.style.border = '1px solid #ED2024';
    }
  };

  const isValidAttributeValue = (id: string, value: string): boolean => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (value === '' || value.includes('Select')) {
      setErrorMessages({
        ...errors,
        [id]: 'Field cannot be left blank',
      });
      inputElement.style.border = '1px solid #ED2024';
      return false;
    } else {
      setErrorMessages({
        ...errors,
        [id]: '',
      });
      inputElement.style.border = '1px solid #DAE2E7';
    }

    const field: AttributeField | undefined = attributes && attributes.find((elem: AttributeField) => elem.attributeType === id);

    if (field && field.valueFormat === 'N' && value.length && !value.match(regex)) {
      setErrorMessages({
        ...errors,
        [id]: 'Please enter numeric value',
      });
      return false;
    } else {
      setErrorMessages({
        ...errors,
        [id]: '',
      });
    }
    return true;
  };

  const validateField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    const element = document.getElementById(id) as HTMLInputElement;
    if (value === '' || value.includes('Select')) {
      setErrorMessages({
        ...errors,
        [id]: 'Field cannot be left blank',
      });
      element.style.border = '1px solid #ED2024';
    } else {
      setErrorMessages({
        ...errors,
        [id]: '',
      });
      element.style.border = '1px solid #DAE2E7';
    }
  };

  const validateAttributes = () => {
    let check = true;
    const newErrors = { ...errors };
    mandatoryFields.forEach((field: string) => {
      const index = attributesSet.find((obj: UserDefinedFieldReduxParams) => {
        return obj.attributeType === field;
      });
      if (!index) {
        newErrors[field] = 'Fields cannot be left blank';
        check = false;
      } else if (index && !index.attributeValue) {
        newErrors[field] = 'Fields cannot be left blank';
        check = false;
      }
    });
    setErrorMessages(newErrors);
    return check;
  };

  return (
    <>
      <div className="opportunity-step-circles">
        <ul className="list-inline step-circles">
          <li className="list-inline-item circle-stepone steps active">
            <span>
              <img alt="steps" src={ImageConfig.STEP_CHECK_ICON} />
            </span>
          </li>
          <li className="list-inline-item circle-steptwo steps active">
            <span className="num">2</span>
          </li>
          <li className="list-inline-item circle-stepthree steps">
            <span className="num">3</span>
          </li>
        </ul>
      </div>
      <div className="opportunity-forms">
        <p className="stepone-title">Opportunity Details</p>

        <div className="">
          <div className="steps-two-forms">
            {state.addOpportunity.loader ? (
              <div>Form is Loading</div>
            ) : (
              <>
                <form>
                  <div className="form-group oppty-form-elements">
                    <label className="opp-label" htmlFor="currency">
                      Opportunity Currency
                    </label>
                    <select className="form-control iptor-dd" id="currency" onChange={setOpportunityDefaultParam} onBlur={validateField}>
                      <option disabled selected>
                        Select currency
                      </option>
                      {state.enviornmentConfigs.currency.map((obj: CurrencyItem) => {
                        return <option value={obj.currency}>{obj.currency}</option>;
                      })}
                    </select>
                    <span className="form-hints">{errors?.currency}</span>
                  </div>

                  <div className="form-group oppty-form-elements">
                    <label htmlFor="estimatedValue" className="opp-label">
                      Total Deal Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Total Deal Price"
                      id="estimatedValue"
                      onBlur={validateField}
                      onChange={setOpportunityDefaultParam}
                    />
                    <span className="form-hints">{errors?.estimatedValue}</span>
                  </div>

                  <div className="form-group oppty-form-elements">
                    <span className="opp-label">Close Date</span>
                    <DateInput onDateSelect={onDateChange} />
                    <span className="form-hints">{errors?.endDate}</span>
                  </div>

                  {attributes?.length
                    ? attributes.map((obj: AttributeField) => {
                        if (obj.valuesExist === true) {
                          return (
                            <SelectItem
                              description={obj.description}
                              attributeId={obj.attributeId}
                              attributeType={obj.attributeType}
                              options={attributeValues}
                              onSelect={onInputValueChange}
                              onBlur={selectOnBlur}
                              error={errors && errors[obj.attributeType]}
                            />
                          );
                        } else {
                          return (
                            <div className="form-group oppty-form-elements">
                              <label htmlFor={obj.attributeType} className="opp-label">
                                {obj.description}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`${obj.description}`}
                                id={obj.attributeType}
                                onBlur={setValue}
                              />
                              <span className="form-hints">{`${errors && errors[obj.attributeType]}`}</span>
                            </div>
                          );
                        }
                      })
                    : null}
                </form>
                <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
                  <button
                    type="button"
                    disabled={nextButtonEnabled}
                    className={nextButtonEnabled ? 'stepone-next-btn inactive' : 'stepone-next-btn '}
                    onClick={onNextButtonClick}>
                    Next
                    <span className="right-whit-arrow">
                      <img alt="Next" src={ImageConfig.CHEVRON_RIGHT_WHITE} />
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

interface SelectProps {
  description: string;
  attributeId: string;
  attributeType: string;
  options: UserDefinedFieldsValueDropDown | undefined;
  onSelect: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectItem: React.FC<SelectProps> = ({ description, attributeId, attributeType, options, onSelect, onBlur, error }) => {
  const attributeValues = options
    ? options.data.find((obj: DropDownValues) => {
        return obj.attributeId === attributeId;
      })
    : null;
  return (
    <div className="form-group oppty-form-elements">
      <label htmlFor={attributeType}>{description}</label>
      <select className="form-control iptor-dd" id={attributeType} onBlur={onBlur} onChange={onSelect}>
        <option disabled selected>
          Select {description}
        </option>
        {attributeValues?.values.map((obj: DropDownValue) => {
          return <option value={obj.valueField}>{obj.valueField}</option>;
        })}
      </select>
      <span className="form-hints">{error}</span>
    </div>
  );
};

export default AddOpportunityUserDefinedFields;
