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

interface Props {
  changeStep: (num: number) => void;
}

const AddOpportunityUserDefinedFields: React.FC<Props> = ({ changeStep }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [attributes, setAttributes] = React.useState<AttributeField[]>();
  const [attributeValues, setAttributeValues] = React.useState<UserDefinedFieldsValueDropDown>();
  const [opportunity, setOpportunityField] = React.useState<AddOpportunityDefaultParams>();
  const [attributesSet, setAttributesSet] = React.useState<UserDefinedFieldReduxParams[]>([]);
  const [mandatoryFields, setMandatoryFields] = React.useState<string[]>([]);

  React.useEffect(() => {
    const oppRecordType = state.addOpportunity.opportunityDefaultParams.oppRecordType || '';
    const opptyTypeAttribute: UserDefinedFieldReduxParams = { attributeType: 'OPP_RECORD_TYPE', attributeValue: oppRecordType };
    setAttributesSet([opptyTypeAttribute]);

    const selectedOpportunityRecordType = state.enviornmentConfigs.crmOpportunityTypes.find((obj: OpportunityType) => {
      return obj.oppRecordType.toLowerCase() === oppRecordType?.toLowerCase();
    });
    const fields = selectedOpportunityRecordType?.MANDATORY_FIELDS || [];
    setMandatoryFields(fields);
    getAttributes(fields);
  }, []);

  const getAttributes = async (fields: string[]) => {
    dispatch(setOpportunityLoader(true));

    const attributeFields: AttributeField[] = state.enviornmentConfigs.opportunityAttributes.filter((obj: AttributeField) => {
      return fields.indexOf(obj.attributeType) > -1;
    });
    attributeFields.sort(function callback(a: AttributeField, b: AttributeField) {
      return a.sequence - b.sequence;
    });
    setAttributes(attributeFields);

    console.log(attributeFields);
    const attributesWithValues = attributeFields.filter((obj: AttributeField) => {
      return obj.valuesExist === true;
    });

    const attributeFieldValues: UserDefinedFieldsValueDropDown = await AddOpportunityFields.getAllFieldsValues(attributesWithValues);
    setAttributeValues(attributeFieldValues);
    dispatch(setOpportunityLoader(false));
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const elementIndex = attributesSet.findIndex((element: UserDefinedFieldReduxParams) => element.attributeType === e.currentTarget.id);

    if (elementIndex === -1) {
      const attribute: UserDefinedFieldReduxParams = { attributeType: e.currentTarget.id, attributeValue: e.currentTarget.value };
      setAttributesSet([...attributesSet, attribute]);
    } else {
      const newArray = [...attributesSet];
      newArray[elementIndex].attributeValue = e.currentTarget.value;
      setAttributesSet(newArray);
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
  };

  const onNextButtonClick = () => {
    if (validate() && validateAttrubutes()) {
      changeStep(3);
      dispatch(saveOpportunityParams(opportunity));
      dispatch(saveOpportunityAttributes(attributesSet));
    } else {
      alert('Please enter all mandatory fields.');
    }
  };

  const setValue = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const elementIndex = attributesSet.findIndex((element: UserDefinedFieldReduxParams) => element.attributeType === e.currentTarget.id);

    if (elementIndex === -1) {
      const attribute: UserDefinedFieldReduxParams = { attributeType: e.currentTarget.id, attributeValue: e.currentTarget.value };
      setAttributesSet([...attributesSet, attribute]);
    } else {
      const newArray = [...attributesSet];
      newArray[elementIndex].attributeValue = e.currentTarget.value;
      setAttributesSet(newArray);
    }
  };

  const validate = () => {
    if (opportunity?.endDate && opportunity?.estimatedValue && opportunity?.currency) {
      return true;
    }
    return false;
  };

  const validateAttrubutes = () => {
    let check = true;
    if (mandatoryFields.length !== attributesSet.length - 1) {
      return false;
    }
    mandatoryFields.forEach((field: string) => {
      const index = attributesSet.findIndex((obj: UserDefinedFieldReduxParams) => {
        return obj.attributeType === field;
      });
      if (!attributesSet[index].attributeValue) {
        check = false;
      }
    });
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
                    <select className="form-control iptor-dd" id="currency" onChange={setOpportunityDefaultParam}>
                      <option disabled selected>
                        Select currency
                      </option>
                      {state.enviornmentConfigs.currency.map((obj: CurrencyItem) => {
                        return <option value={obj.currency}>{obj.currency}</option>;
                      })}
                    </select>
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
                      onChange={setOpportunityDefaultParam}
                    />
                  </div>

                  <div className="form-group oppty-form-elements">
                    <span className="opp-label">Close Date</span>
                    <DateInput onDateSelect={onDateChange} />
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
                                placeholder={`${obj.description} : ${obj.valueFormat}`}
                                id={obj.attributeType}
                                onBlur={setValue}
                              />
                            </div>
                          );
                        }
                      })
                    : null}
                </form>
                <button type="button" className="stepone-next-btn" onClick={onNextButtonClick}>
                  Next
                  <span className="right-whit-arrow">
                    <img alt="Next" src={ImageConfig.CHEVRON_RIGHT_WHITE} />
                  </span>
                </button>
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
}

const SelectItem: React.FC<SelectProps> = ({ description, attributeId, attributeType, options, onSelect }) => {
  const attributeValues = options
    ? options.data.find((obj: DropDownValues) => {
        return obj.attributeId === attributeId;
      })
    : null;
  return (
    <div className="form-group oppty-form-elements">
      <label htmlFor={attributeType}>{description}</label>
      <select className="form-control iptor-dd" id={attributeType} onChange={onSelect}>
        <option disabled selected>
          Select {description}
        </option>
        {attributeValues?.values.map((obj: DropDownValue) => {
          return <option value={obj.valueField}>{obj.valueField}</option>;
        })}
      </select>
    </div>
  );
};

export default AddOpportunityUserDefinedFields;
