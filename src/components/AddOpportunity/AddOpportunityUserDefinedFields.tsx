import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { AppState } from '../../store/store';
import i18n from '../../i18n';

import ImageConfig from '../../config/ImageConfig';
import {
  OpportunityType,
  AttributeField,
  UserDefinedFieldsValueDropDown,
  DropDownValues,
  DropDownValue,
  AddOpportunityDefaultParams,
  CurrencyItem,
  SaveAttributeFieldParam,
  AreaInfo,
  ForeCastInfo,
  AttributeFormField,
  UserDefinedFieldReduxParams,
} from '../../helpers/Api/models';
import AddOpportunityFields from '../../helpers/Api/OpportunityUserDefinedFields';
import { saveOpportunityParams, saveOpportunityAttributes, setOpportunityLoader, setAddOpportunityError } from '../../store/AddOpportunity/Actions';
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
  const [nextButtonEnabled, setNextButtonEnabled] = React.useState<boolean>(false);
  const [errors, setErrorMessages] = React.useState<ErrorMessages>();

  React.useEffect(() => {
    const tempOpptyObject = { ...state.addOpportunity.opportunityDefaultParams };
    const prevAttributes = [...state.addOpportunity.attributes];

    const defaultErrorMessages: ErrorMessages = {
      currency: '',
      estimatedValue: '',
      endDate: '',
    };

    if (!tempOpptyObject.endDate) {
      tempOpptyObject.endDate = moment(new Date()).format('YYYY-MM-DD');
    }

    if (!tempOpptyObject.currency) {
      tempOpptyObject.currency = state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA;
    }
    setOpportunityField(tempOpptyObject);

    const selectedOpportunityRecordType = state.enviornmentConfigs.crmOpportunityTypes.find((obj: OpportunityType) => {
      return obj.oppRecordType.toLowerCase() === tempOpptyObject.oppRecordType?.toLowerCase();
    });
    const fields = selectedOpportunityRecordType?.MANDATORY_FIELDS || [];

    const tempPrevAttributes = prevAttributes.filter((obj: UserDefinedFieldReduxParams) => {
      return fields.indexOf(obj.attributeType) > -1;
    });
    setAttributesSet(tempPrevAttributes);
    fields.forEach((obj: string) => {
      defaultErrorMessages[obj] = '';
    });
    setErrorMessages(defaultErrorMessages);
    setMandatoryFields(fields);
    getAttributes(fields);
  }, []);

  const setInitialValuesAttributes = (fields: AttributeField[]) => {
    const dataAttributes = [...state.addOpportunity.attributes];
    const tempAttributes: UserDefinedFieldReduxParams[] = [];

    if (fields.length) {
      fields.forEach((obj: AttributeFormField) => {
        const value = dataAttributes.find((valueObj: UserDefinedFieldReduxParams) => valueObj.attributeType === obj.attributeType);

        if (obj.valueFormat === 'D') {
          const attribute: UserDefinedFieldReduxParams = {
            attributeType: obj.attributeType,
            attributeValue: '',
            attributeValueD: value ? moment(value.attributeValueD).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'),
            valueFormat: obj.valueFormat,
          };
          tempAttributes.push(attribute);
        } else if (obj.valueFormat === 'B') {
          const attribute: UserDefinedFieldReduxParams = {
            attributeType: obj.attributeType,
            attributeValue: value && value.attributeValue ? value.attributeValue : 'N',
            valueFormat: obj?.valueFormat,
          };
          tempAttributes.push(attribute);
        } else {
          const attribute: UserDefinedFieldReduxParams = {
            attributeType: obj.attributeType,
            attributeValue: value && value.attributeValue ? value.attributeValue : '',
            valueFormat: obj?.valueFormat,
          };
          tempAttributes.push(attribute);
        }
      });
      setAttributesSet(tempAttributes);
    }
  };

  React.useEffect(() => {
    if (
      opportunity?.currency &&
      opportunity?.endDate &&
      opportunity?.estimatedValue &&
      opportunity?.forecastCategory &&
      opportunity?.area &&
      isNumeric(opportunity?.estimatedValue) &&
      checkIfAllFieldsHasValue()
    ) {
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
    setInitialValuesAttributes(attributeFields);

    const attributesWithValues = attributeFields.filter((obj: AttributeField) => {
      return obj.valuesExist === true;
    });

    const attributeFieldValues: UserDefinedFieldsValueDropDown = await AddOpportunityFields.getAllFieldsValues(attributesWithValues);
    setAttributeValues(attributeFieldValues);
    dispatch(setOpportunityLoader(false));
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (isValidAttributeValue(id, value)) {
      const elementIndex = attributesSet.findIndex((element: UserDefinedFieldReduxParams) => element.attributeType === id);
      if (elementIndex === -1) {
        const field = attributes?.find((obj: AttributeField) => {
          return obj.attributeType === id;
        });
        if (field) {
          const attribute: UserDefinedFieldReduxParams = { attributeType: id, attributeValue: value, valueFormat: field?.valueFormat };
          setAttributesSet([...attributesSet, attribute]);
        }
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
    if (e.currentTarget.id === 'estimatedValue') {
      const { value } = e.currentTarget;
      const inputElement = document.getElementById('estimatedValue') as HTMLInputElement;
      if (value.length && !value.match(regex)) {
        setErrorMessages({
          ...errors,
          estimatedValue: i18n.t('numericFieldError'),
        });
        inputElement.style.border = '1px solid #ED2024';
        return;
      } else {
        setErrorMessages({
          ...errors,
          estimatedValue: '',
        });
        inputElement.style.border = '1px solid #DAE2E7';
      }
    }

    setOpportunityField({
      ...opportunity,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const onDateChange = (key: any) => {
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

  const onClickStep3 = (num: number) => {
    if (!nextButtonEnabled) {
      changeStep(num);
      dispatch(saveOpportunityParams(opportunity));
      dispatch(saveOpportunityAttributes(attributesSet));
    } else {
      dispatch(setAddOpportunityError('Please fill all mandatory fields.'));
    }
  };

  const onClickStep1 = (num: number) => {
    changeStep(num);
    dispatch(saveOpportunityParams(opportunity));
    dispatch(saveOpportunityAttributes(attributesSet));
  };

  const isValidAttributeValue = (id: string, value: string): boolean => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (value === '' || value.includes('Select')) {
      setErrorMessages({
        ...errors,
        [id]: 'Field cannot be left blank',
      });
      inputElement.style.border = '1px solid #ED2024';
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
        [id]: i18n.t('numericFieldError'),
      });
      inputElement.style.border = '1px solid #ED2024';
    } else {
      setErrorMessages({
        ...errors,
        [id]: '',
      });
      inputElement.style.border = '1px solid #DAE2E7';
    }
    return true;
  };

  const onChangeAtrributeValue = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    const field: AttributeField | undefined = attributes && attributes.find((elem: AttributeField) => elem.attributeType === id);
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (field && field.valueFormat === 'N' && value.length && !value.match(regex)) {
      inputElement.style.border = '1px solid#ED2024';
      setErrorMessages({
        ...errors,
        [id]: i18n.t('numericFieldError'),
      });
      return;
    } else {
      inputElement.style.border = '1px solid#DAE2E7';
      setErrorMessages({
        ...errors,
        [id]: '',
      });
    }

    const elementIndex = attributesSet.findIndex((element: SaveAttributeFieldParam) => element.attributeType === id);
    if (elementIndex === -1) {
      const attribute: UserDefinedFieldReduxParams = { attributeType: id, attributeValue: value, valueFormat: field?.valueFormat };
      setAttributesSet([...attributesSet, attribute]);
    } else {
      const newArray = [...attributesSet];
      newArray[elementIndex].attributeValue = value;
      setAttributesSet(newArray);
    }
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    if (id === 'estimatedValue') {
      const element = document.getElementById('estimatedValue') as HTMLInputElement;
      if (value.length && !value.match(regex)) {
        setErrorMessages({
          ...errors,
          estimatedValue: i18n.t('numericFieldError'),
        });
        element.style.border = '1px solid #ED2024';
        return;
      } else if (value.length === 0) {
        setErrorMessages({
          ...errors,
          estimatedValue: i18n.t('blankFieldError'),
        });
        element.style.border = '1px solid #ED2024';
      } else {
        setErrorMessages({
          ...errors,
          estimatedValue: '',
        });
        element.style.border = '1px solid #DAE2E7';
      }
    }
    const field: AttributeField | undefined = attributes && attributes.find((elem: AttributeField) => elem.attributeType === id);
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (field && field.valueFormat === 'N' && !value.match(regex)) {
      inputElement.style.border = '1px solid#ED2024';
      setErrorMessages({
        ...errors,
        [id]: i18n.t('numericFieldError'),
      });
    } else if (value.length === 0) {
      inputElement.style.border = '1px solid#ED2024';
      inputElement.style.border = '1px solid#DAE2E7';
      setErrorMessages({
        ...errors,
        [id]: i18n.t('blankFieldError'),
      });
    } else {
      inputElement.style.border = '1px solid#DAE2E7';
      setErrorMessages({
        ...errors,
        [id]: '',
      });
    }
  };

  const onAttributeDateChanges = (value: any, dataObject: AttributeField) => {
    const { valueFormat, attributeType } = dataObject;
    const elementIndex = attributesSet.findIndex((element: UserDefinedFieldReduxParams) => element.attributeType === attributeType);
    if (elementIndex === -1) {
      const attribute: UserDefinedFieldReduxParams = { attributeType, attributeValue: '', attributeValueD: value, valueFormat };
      setAttributesSet([...attributesSet, attribute]);
    } else {
      const newArray = [...attributesSet];
      newArray[elementIndex].attributeValueD = value;
      newArray[elementIndex].attributeValue = value;
      setAttributesSet(newArray);
    }
  };

  const checkIfAllFieldsHasValue = () => {
    let check = true;
    mandatoryFields.forEach((field: string) => {
      const currField = attributesSet.find((obj: UserDefinedFieldReduxParams) => {
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

  const onCheckboxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.currentTarget;
    let char = 'N';
    if (checked) {
      char = 'Y';
    }

    const elementIndex = attributesSet.findIndex((element: UserDefinedFieldReduxParams) => element.attributeType === id);
    if (elementIndex === -1) {
      const field = attributes?.find((obj: AttributeField) => {
        return obj.attributeType === id;
      });
      if (field) {
        const attribute: UserDefinedFieldReduxParams = { attributeType: id, attributeValue: char, valueFormat: field?.valueFormat };
        setAttributesSet([...attributesSet, attribute]);
      }
    } else {
      const newArray = [...attributesSet];
      newArray[elementIndex].attributeValue = char;
      setAttributesSet(newArray);
    }
  };

  const isNumeric = (value: any) => {
    if (value && !value.match(regex)) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="opportunity-step-circles">
        <ul className="list-inline step-circles">
          <li className="list-inline-item circle-stepone steps" role="presentation" onClick={() => onClickStep1(1)}>
            <span className="num">1</span>
          </li>
          <li className="list-inline-item circle-steptwo steps active" role="presentation">
            <span className="num">2</span>
          </li>
          <li className="list-inline-item circle-stepthree steps" role="presentation" onClick={() => onClickStep3(3)}>
            <span className="num">3</span>
          </li>
        </ul>
      </div>
      <div className="opportunity-forms form-top">
        <p className="stepone-title">{i18n.t('addOpporunityDetailsHeader')}</p>

        <div className="">
          <div className="steps-two-forms">
            {state.addOpportunity.loader ? (
              <div>Form is Loading</div>
            ) : (
              <>
                <form>
                  <div className="form-group oppty-form-elements">
                    <label className="opp-label" htmlFor="currency">
                      {i18n.t('opportunityCurrencyFormLabel')}
                    </label>
                    <select className="form-control iptor-dd" id="currency" onChange={setOpportunityDefaultParam}>
                      {state.enviornmentConfigs.currency.map((obj: CurrencyItem) => {
                        return (
                          <option value={obj.currency} selected={opportunity?.currency === obj.currency}>
                            {obj.currency}
                          </option>
                        );
                      })}
                    </select>
                    <span className="form-hints">{errors?.currency}</span>
                  </div>

                  <div className="form-group oppty-form-elements">
                    <label htmlFor="estimatedValue" className="opp-label">
                      {i18n.t('opportunityTotalDealPriceLabel')}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={i18n.t('opportunityTotalDealPricePlaceHolder')}
                      id="estimatedValue"
                      onChange={setOpportunityDefaultParam}
                      value={opportunity?.estimatedValue}
                      onBlur={onBlur}
                    />
                    <span className="form-hints">{errors?.estimatedValue}</span>
                  </div>

                  <div className="form-group oppty-form-elements">
                    <label className="opp-label" htmlFor="endDate">
                      {i18n.t('opportunityFormCloseDate')}
                    </label>
                    <DateInput onDateSelect={onDateChange} currentDate={opportunity?.endDate} />
                    <span className="form-hints">{errors?.endDate}</span>
                  </div>

                  <div className="form-group oppty-form-elements">
                    <label className="opp-label" htmlFor="area">
                      {i18n.t('area')}
                    </label>
                    <select className="form-control iptor-dd" id="area" onChange={setOpportunityDefaultParam}>
                      <option disabled selected>
                        {i18n.t('opportunityFormSelectArea')}
                      </option>
                      {state.enviornmentConfigs.crmAreaInfo.map((obj: AreaInfo) => {
                        return (
                          <option selected={obj.area === opportunity?.area} value={obj.area}>
                            {obj.area} - {obj.description}
                          </option>
                        );
                      })}
                    </select>
                    <span className="form-hints">{errors?.endDate}</span>
                  </div>
                  <div className="form-group oppty-form-elements">
                    <label className="opp-label" htmlFor="forecastCategory">
                      {i18n.t('opportunityFormForecastCategory')}
                    </label>
                    <select className="form-control iptor-dd" id="forecastCategory" onChange={setOpportunityDefaultParam}>
                      <option disabled selected>
                        {i18n.t('opportunityFormSelectForecastCategory')}
                      </option>
                      {state.enviornmentConfigs.forecastInfo.map((obj: ForeCastInfo) => {
                        return (
                          <option selected={obj.forecastCategory === opportunity?.forecastCategory} value={obj.forecastCategory}>
                            {obj.forecastCategory}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {attributes?.length
                    ? attributes.map((obj: AttributeField) => {
                        let currentValue;
                        let currentDate: any = '';
                        let currentValueStr: string | number = '';
                        const field: UserDefinedFieldReduxParams | undefined = attributesSet.find(
                          (valueObj) => valueObj.attributeType === obj.attributeType
                        );

                        if (obj.valueFormat === 'D') {
                          currentDate = field && field.attributeValueD ? field.attributeValueD : '';
                        } else if (obj.valueFormat === 'B') {
                          currentValue = field && field.attributeValue ? field.attributeValue : 'N';
                        } else {
                          currentValueStr = field && field.attributeValue ? field.attributeValue : '';
                        }

                        if (obj.valueFormatDesc === 'BOOLEAN') {
                          return (
                            <div className="form-group oppty-form-elements">
                              <span className="checkbox-label">
                                {obj.description}
                                <label className="switch" htmlFor={obj.attributeType}>
                                  <input
                                    type="checkbox"
                                    id={obj.attributeType}
                                    tabIndex={0}
                                    checked={currentValue !== 'N'}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheckboxValueChange(e)}
                                  />
                                  <span className="slider round">&nbsp;</span>
                                </label>
                              </span>
                            </div>
                          );
                        } else if (obj.valueFormatDesc === 'DATE') {
                          return (
                            <div className="form-group oppty-form-elements">
                              <label htmlFor="endDate" className="opp-label">
                                {obj.description}
                              </label>
                              <DateInput onDateSelect={(value: Date) => onAttributeDateChanges(value, obj)} currentDate={currentDate} />
                            </div>
                          );
                        } else if (obj.valuesExist === true) {
                          return (
                            <SelectItem
                              description={obj.description}
                              attributeId={obj.attributeId}
                              attributeType={obj.attributeType}
                              options={attributeValues}
                              onSelect={onInputValueChange}
                              currentValue={currentValueStr}
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
                                value={currentValueStr}
                                onChange={onChangeAtrributeValue}
                                onBlur={onBlur}
                              />
                              <span className="form-hints">{`${errors && errors[obj.attributeType]}`}</span>
                            </div>
                          );
                        }
                      })
                    : null}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
        <button
          type="button"
          disabled={nextButtonEnabled}
          className={nextButtonEnabled ? 'stepone-next-btn inactive' : 'stepone-next-btn '}
          onClick={onNextButtonClick}>
          {i18n.t('nextButton')}
          <span className="right-whit-arrow">
            <img alt="Next" src={ImageConfig.CHEVRON_RIGHT_WHITE} />
          </span>
        </button>
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
  currentValue: string | number | undefined;
  error?: string;
}

const SelectItem: React.FC<SelectProps> = ({ description, attributeId, attributeType, options, onSelect, error, currentValue }) => {
  const attributeValues = options
    ? options.data.find((obj: DropDownValues) => {
        return obj.attributeId === attributeId;
      })
    : null;
  return (
    <div className="form-group oppty-form-elements">
      <label htmlFor={attributeType} className="opp-label">
        {description}
      </label>
      <select className="form-control iptor-dd" id={attributeType} onChange={onSelect}>
        <option disabled selected={!currentValue}>
          Select {description}
        </option>
        {attributeValues?.values.map((obj: DropDownValue) => {
          return (
            <option selected={currentValue === obj.valueField} value={obj.valueField}>
              {obj.valueField}
            </option>
          );
        })}
      </select>
      <span className="form-hints">{error}</span>
    </div>
  );
};

export default AddOpportunityUserDefinedFields;
