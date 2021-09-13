import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import _ from 'lodash';

import i18n from '../../i18n';
import { AppState } from '../../store/store';
import ImageConfig from '../../config/ImageConfig';

import { UserDefinedField, UserDefinedFieldsValueDropDown, DropDownValues, DropDownValue } from '../../helpers/Api/models';
import {
  setBusinessPartnerWindowActive,
  setBusinessPartnerLoader,
  resetBusinessPartnerData,
  updateCustomerContact,
  updateCustomerDefaultFields,
} from '../../store/AddCustomer/Actions';
import { Attributes } from '../../helpers/Api/Attributes';
import AddOpportunityFields from '../../helpers/Api/OpportunityUserDefinedFields';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import AddCustomerApi from '../../helpers/Api/AddCustomer';

import { Context } from './CustomerContext';
import DefaultFields from '../../helpers/utilities/customerDefaultFields';
import ContactFields from '../../helpers/utilities/contactDefaultFields';
import DateInput from '../Shared/Picker/DateInput';
import { getDate, getDashDateFormat, numberPattern, emailPattern } from '../../helpers/utilities/lib';

interface Props {
  groupType: any;
  contactId?: string;
}

const EditCustomer: React.FC<Props> = (data) => {
  const { groupType, contactId } = data;
  const state: AppState = useSelector((EditState: AppState) => EditState);
  const dispatch: Dispatch<any> = useDispatch();
  const [customerData, setCustomerData] = React.useState<any>();
  const [attributes, setAttributes] = React.useState<UserDefinedField[]>();
  const [showAttributes, setShowAttributes] = React.useState<boolean>(false);
  const [attributeValues, setAttributeValues] = React.useState<UserDefinedFieldsValueDropDown>();
  const [defaultFields, setDefaultFields] = React.useState<any>();
  const [contactFields, setContactFields] = React.useState<any>();
  const [customerFields, setCustomerFields] = React.useState<any>({});
  const [selectedCountry, setSelectedCountry] = React.useState<any>();
  const [selectedArea, setSelectedArea] = React.useState<any>();
  const [fieldError, setFieldError] = React.useState<boolean>(false);

  const history = useHistory();
  const contextValue = React.useContext(Context);
  const key = groupType;
  const contactsId = contactId;
  const contactData = state.addBusinessPartner.contacts;
  const defaultData = state.addBusinessPartner.businessPartnerDefaultFields;

  const getAttributes = async () => {
    dispatch(setBusinessPartnerLoader(true));
    if (key === 'default fields') {
      const defaultField = DefaultFields;
      if (customerData) {
        if (defaultField) {
          defaultField.forEach((item: any) => {
            if (_.has(defaultFields, item.attributeType)) {
              _.set(item, 'attributeValue', defaultFields[item.attributeType]);
            }
            if (item.attributeType === 'country') {
              const selectedCountries = state.enviornmentConfigs.crmCountryInfo.filter((el) => el.country === item.attributeValue);
              setSelectedCountry(selectedCountries);
            }
            if (item.attributeType === 'area') {
              const selectedAreas = state.enviornmentConfigs.crmAreaInfo.filter((el) => el.area === item.attributeValue);
              setSelectedArea(selectedAreas);
            }
          });
          setDefaultFields(defaultField);
        }
      }
    } else if (key === 'contact fields') {
      const contactField = ContactFields;
      if (customerData) {
        if (contactField) {
          contactField.forEach((item: any) => {
            const selectedContactData = contactFields.filter((items: any) => items.contactDC === contactId);
            if (_.has(selectedContactData[0], item.attributeType)) {
              _.set(item, 'attributeValue', selectedContactData[0][item.attributeType]);
            }
          });
          setContactFields(contactField);
        }
      }
    } else if (key === 'add contact fields') {
      const contactField = ContactFields;
      const filteredArr = contactField.filter((item) => item.attributeType !== 'role');
      setContactFields(filteredArr);
    } else {
      const storedAttributes = state.enviornmentConfigs.customerAttributes;
      storedAttributes.sort(function (a, b) {
        return a.sequence - b.sequence;
      });
      const attributesWithValues = storedAttributes.filter((obj: UserDefinedField) => {
        return obj.valuesExist === true;
      });
      setAttributes(storedAttributes);
      const attributesValues = await AddOpportunityFields.getAllFieldsValues(attributesWithValues);
      setAttributeValues(attributesValues);
    }
    dispatch(setBusinessPartnerLoader(false));
  };

  const getAttributesValues = async () => {
    if (customerData && attributes) {
      OpportunityDetailsApi.getCustomerGroupInfo(customerData.data.businessPartner).then((dataDetails) => {
        attributes.forEach((item) => {
          if (dataDetails.some((ele) => ele.attributeType === item.attributeType)) {
            const object = dataDetails.find((obj) => obj.attributeType === item.attributeType);
            _.set(item, 'attributeValue', object?.attributeValue);
            _.set(item, 'valueId', object?.valueId);
          } else {
            const object = dataDetails.find((obj) => obj.attributeType === item.attributeType);
            _.set(item, 'attributeValue', '');
            _.set(item, 'valueId', object?.valueId);
          }
        });
        if (attributes) {
          const groups = new Set(
            attributes.map((obj) => {
              return obj.group;
            })
          );
          const response: any = [];
          groups.forEach((group: string) => {
            const groupName = group.toLowerCase();
            response[groupName] = attributes.filter((obj) => obj.group.toLowerCase() === groupName);
          });
          const selectedGroupData = response[key];
          setAttributes(selectedGroupData);
          setShowAttributes(true);
        }
      });
    }
  };

  const onCheckboxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (attributes) {
      const elementIndex = attributes.findIndex((element) => element.attributeType === e.currentTarget.id);
      const newArray = [...attributes];
      if (e.currentTarget.checked) {
        newArray[elementIndex].attributeValue = 'Y';
      } else {
        newArray[elementIndex].attributeValue = 'N';
      }
      setAttributes(newArray);
    }
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, dataObject?: any) => {
    const { value, id } = e.currentTarget;
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (attributes) {
      const elementIndex = attributes.findIndex((element) => element.attributeType === id);
      const newArray = [...attributes];
      newArray[elementIndex].attributeValue = value;
      if (dataObject) {
        if (value.length && dataObject.valueFormat === 'N' && !value.match(numberPattern)) {
          dataObject.error = i18n.t('numericFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setFieldError(true);
        } else if (value.length && dataObject.attributeType === 'EMAIL' && !value.match(emailPattern)) {
          dataObject.error = i18n.t('emailFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setFieldError(true);
        } else {
          dataObject.error = '';
          inputElement.style.border = '1px solid #DAE2E7';
          setFieldError(false);
        }
      }
      setAttributes(newArray);
    }
    if (defaultFields) {
      const elementIndex = defaultFields.findIndex((element: any) => element.attributeType === id);
      const newArray = [...defaultFields];
      newArray[elementIndex].attributeValue = value;
      if (dataObject) {
        if (value === '') {
          dataObject.error = i18n.t('blankFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setFieldError(true);
        } else if (value.length && dataObject.attributeType === 'phone' && !value.match(numberPattern)) {
          dataObject.error = i18n.t('numericFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setFieldError(true);
        } else {
          dataObject.error = '';
          inputElement.style.border = '1px solid #DAE2E7';
          setFieldError(false);
        }
      }
      setDefaultFields(newArray);
    }
    if (contactFields) {
      const elementIndex = contactFields.findIndex((element: any) => element.attributeType === e.currentTarget.id);
      const newArray = [...contactFields];
      newArray[elementIndex].attributeValue = e.currentTarget.value;
      if (dataObject) {
        if (value.length && dataObject.attributeType === 'email' && !value.match(emailPattern)) {
          dataObject.error = i18n.t('emailFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setFieldError(true);
        } else if (value.length && dataObject.attributeType === 'phone' && !value.match(numberPattern)) {
          dataObject.error = i18n.t('numericFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setFieldError(true);
        } else {
          dataObject.error = '';
          inputElement.style.border = '1px solid #DAE2E7';
          setFieldError(false);
        }
      }
      setContactFields(newArray);
    }
  };

  const updateCustomer = async () => {
    dispatch(setBusinessPartnerLoader(true));
    if (attributes) {
      const withoutValueAttributes = attributes.filter((item) => item.valueId === undefined);
      const withValueAttributes = attributes.filter((item) => item.valueId !== undefined);
      Promise.all(
        withValueAttributes.map((obj) => {
          return Attributes.updateAttributes(
            customerData.data.businessPartner,
            obj.attributeType,
            obj.attributeValue ? obj.attributeValue : '',
            obj.valueId ? obj.valueId : '',
            obj.valueFormatDesc === 'DATE' ? 'date' : ''
          );
        })
      ).then((response) => {
        return response;
      });
      Promise.all(
        withoutValueAttributes.map((obj) => {
          return AddCustomerApi.addAttributes(
            customerData.data.businessPartner,
            obj.attributeType,
            obj.attributeValue ? obj.attributeValue : '',
            obj.valueFormatDesc === 'DATE' ? 'date' : ''
          );
        })
      ).then((dataItems) => {
        return dataItems;
      });
      getAttributesValues();
      history.push({ pathname: '/cust-details', state: { custId: customerData.data.businessPartner } });
      setTimeout(function () {
        window.location.reload(false);
        dispatch(setBusinessPartnerLoader(false));
        dispatch(setBusinessPartnerWindowActive(false));
        document.body.classList.remove('body-scroll-hidden');
      }, 3000);
    }
    if (defaultFields) {
      defaultFields.forEach((item: any) => {
        customerFields[item.attributeType] = item.attributeValue;
      });
      customerFields.businessPartner = customerData.data.businessPartner;
      setCustomerFields(customerFields);
      dispatch(updateCustomerDefaultFields(customerFields));
    }
    if (contactFields) {
      contactFields.forEach((item: any) => {
        customerFields[item.attributeType] = item.attributeValue;
      });
      if (contactsId !== '') {
        customerFields.contactDC = contactsId;
        dispatch(updateCustomerContact(customerFields, customerData.data.businessPartner, 'update'));
      } else {
        customerFields.businessPartner = customerData.data.businessPartner;
        customerFields.ACTIVE = true;
        dispatch(updateCustomerContact(customerFields, customerData.data.businessPartner, 'add'));
      }
    }
  };

  const closeAction = () => {
    document.body.classList.remove('body-scroll-hidden');
    dispatch(resetBusinessPartnerData());
    dispatch(setBusinessPartnerWindowActive(false));
    dispatch(setBusinessPartnerLoader(false));
    document.body.classList.remove('body-scroll-hidden');
    if (key === 'contact fields') {
      if (ContactFields) {
        ContactFields.forEach((item: any) => {
          _.set(item, 'attributeValue', '');
        });
      }
    }
    setShowAttributes(false);
  };

  const onDateChange = (value: string, dataObject: any) => {
    if (attributes) {
      const elementIndex = attributes.findIndex((element) => element.attributeType === dataObject);
      const newArray = [...attributes];
      newArray[elementIndex].attributeValue = value;
      setAttributes(newArray);
    }
  };

  React.useEffect(() => {
    if (contextValue) {
      setCustomerData(contextValue);
    }
  }, []);

  React.useEffect(() => {
    getAttributes();
    getAttributesValues();
  }, [customerData]);

  React.useEffect(() => {
    if (contactData && key === 'contact fields') {
      setContactFields(contactData);
    }
  }, [contactData]);

  React.useEffect(() => {
    if (defaultData && key === 'default fields') {
      setDefaultFields(defaultData);
    }
  }, [defaultData]);

  return (
    <>
      <div className="sliding-panel-container">
        <div className="sliding-panel">
          <div className="title-row opp-header-text">
            <button type="button" className="mob-steps-back" onClick={closeAction}>
              <img src={ImageConfig.CHEVRON_LEFT} alt="Back" />
            </button>
            {i18n.t('editCustomer')}
            <button className="panel-close-icon link-anchor-button" onClick={closeAction} type="button">
              <img src={ImageConfig.CLOSE_BTN} alt="Close" />
            </button>
          </div>
          <div className="all-opportunity-steps-container pt-24">
            <div className="opportunity-forms">
              <p className="add-subtitle edit-subtitle">{key === 'default fields' ? 'Customer Information' : key}</p>
              <div className="edit-customer-info">
                <div className="steps-one-forms">
                  {key === 'default fields'
                    ? defaultFields?.length &&
                      defaultFields.map((obj: UserDefinedField) => {
                        if (obj.valuesExist) {
                          return (
                            <div className="form-group oppty-form-elements">
                              <label className="opp-label" htmlFor={obj.attributeType}>
                                {obj.description}
                              </label>
                              <select className="form-control iptor-dd" id={obj.attributeType} onChange={onInputValueChange}>
                                {obj.description === 'Country' && (
                                  <>
                                    <option selected>{selectedCountry && selectedCountry[0] ? selectedCountry[0].description : ''}</option>
                                    {state.enviornmentConfigs.crmCountryInfo.map((item) => {
                                      return <option value={item.country}>{item.description}</option>;
                                    })}
                                  </>
                                )}
                                {obj.description === 'Area' && (
                                  <>
                                    <option selected>{selectedArea && selectedArea[0] ? selectedArea[0].description : ''}</option>
                                    {state.enviornmentConfigs.crmAreaInfo.map((item) => {
                                      return (
                                        <option value={item.area}>
                                          {item.area} - {item.description}
                                        </option>
                                      );
                                    })}
                                  </>
                                )}
                              </select>
                            </div>
                          );
                        }
                        return (
                          <div className="form-group oppty-form-elements">
                            <label className="opp-label" htmlFor="obj.attributeType">
                              {obj.description}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={obj.description}
                              id={obj.attributeType}
                              value={obj.attributeValue}
                              onChange={(e) => onInputValueChange(e, obj)}
                            />
                            <span className="form-hints">{obj?.error}</span>
                          </div>
                        );
                      })
                    : key === 'contact fields' || key === 'add contact fields'
                    ? contactFields?.length &&
                      contactFields.map((obj: UserDefinedField) => {
                        if (obj.valuesExist) {
                          return (
                            <SelectItem
                              description={obj.description}
                              attributeId={obj.attributeId}
                              attributeType={obj.attributeType}
                              options={attributeValues}
                              value={obj.attributeValue}
                              onSelect={onInputValueChange}
                            />
                          );
                        }
                        if (obj.readOnly) {
                          return (
                            <div className="form-group oppty-form-elements">
                              <label className="opp-label" htmlFor={obj.attributeType}>
                                {obj.description}
                              </label>
                              <p id={obj.attributeType}>{obj.attributeValue}</p>
                            </div>
                          );
                        } else {
                          return (
                            <div className="form-group oppty-form-elements">
                              <label className="opp-label" htmlFor={obj.attributeType}>
                                {obj.description}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={obj.description}
                                id={obj.attributeType}
                                value={obj.attributeValue}
                                onChange={(e) => onInputValueChange(e, obj)}
                              />
                              <span className="form-hints">{obj?.error}</span>
                            </div>
                          );
                        }
                      })
                    : showAttributes &&
                      attributes?.length &&
                      attributes.map((obj: UserDefinedField) => {
                        if (obj.valuesExist) {
                          return (
                            <SelectItem
                              description={obj.description}
                              attributeId={obj.attributeId}
                              attributeType={obj.attributeType}
                              options={attributeValues}
                              value={obj.attributeValue}
                              onSelect={onInputValueChange}
                            />
                          );
                        }
                        if (obj.valueFormatDesc === 'DATE') {
                          return (
                            <div className="form-group oppty-form-elements">
                              <label htmlFor="endDate" className="opp-label">
                                {obj.description}
                              </label>
                              <DateInput
                                onDateSelect={(value: string) => onDateChange(value, obj.attributeType)}
                                currentDate={obj.attributeValue ? getDashDateFormat(getDate(obj.attributeValue.toString())) : ''}
                              />
                            </div>
                          );
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
                                    checked={obj.attributeValue !== 'N'}
                                    onChange={onCheckboxValueChange}
                                  />
                                  <span className="slider round">&nbsp;</span>
                                </label>
                              </span>
                            </div>
                          );
                        } else {
                          return (
                            <div className="form-group oppty-form-elements">
                              <label className="opp-label" htmlFor={obj.attributeType}>
                                {obj.description}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={obj.description}
                                id={obj.attributeType}
                                value={obj.attributeValue}
                                onChange={(e) => onInputValueChange(e, obj)}
                              />
                              <span className="form-hints">{obj?.error}</span>
                            </div>
                          );
                        }
                      })}
                </div>
                <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
                  <button
                    className={fieldError ? 'customer-btn disable-link' : 'customer-btn'}
                    onClick={!fieldError ? updateCustomer : undefined}
                    type="button">
                    {key === 'add contact fields' ? i18n.t('addContact') : i18n.t('save')}
                  </button>
                </div>
              </div>
            </div>
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
  value?: string;
}

const SelectItem: React.FC<SelectProps> = ({ description, attributeId, attributeType, options, onSelect, value }) => {
  const attributeValues = options
    ? options.data.find((obj: DropDownValues) => {
        return obj.attributeId === attributeId;
      })
    : null;
  return (
    <div className="form-group oppty-form-elements">
      <label className="opp-label" htmlFor={attributeType}>
        {description}
      </label>
      <select className="form-control iptor-dd" id={attributeType} onChange={onSelect}>
        {value === '' ? (
          <option disabled selected>
            Select {description}
          </option>
        ) : (
          <option selected>{value}</option>
        )}
        {attributeValues?.values.map((obj: DropDownValue) => {
          return obj.fieldDescription ? (
            <option value={obj.valueField}>
              {obj.valueField} - {obj.fieldDescription}
            </option>
          ) : (
            <option value={obj.valueField}>{obj.valueField}</option>
          );
        })}
      </select>
    </div>
  );
};

export default EditCustomer;
