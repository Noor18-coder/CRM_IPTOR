import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import i18n from '../../i18n';
import { AppState } from '../../store/store';
import ImageConfig from '../../config/ImageConfig';

import { UserDefinedField, UserDefinedFieldsValueDropDown, AttributeFormField, AttributeField } from '../../helpers/Api/models';
import {
  setBusinessPartnerWindowActive,
  setBusinessPartnerLoader,
  resetBusinessPartnerData,
  updateCustomerContact,
  updateCustomerDefaultFields,
  saveBusinessPartnerAttributes,
  saveCustomerDefaultFields,
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
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import DropDownWithCustomValue from '../Shared/Form/DropDownWithCustomValue';
import DropDown from '../Shared/Form/DropDown';

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
  const [attributeTypes, setAttributeTypes] = React.useState<any[]>([]);
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [numberError, setNumberError] = React.useState<boolean>(false);
  const [deleteAttributes, setDeleteAttributes] = React.useState<AttributeFormField[]>([]);
  const [contactAttributeValues, setContactAttributeValues] = React.useState<UserDefinedFieldsValueDropDown>();

  const contextValue = React.useContext(Context);
  const key = groupType;
  const contactsId = contactId;
  const contactData = state.addBusinessPartner.contacts;
  const defaultData = state.addBusinessPartner.businessPartnerDefaultFields;
  const storedAttributes = state.enviornmentConfigs.customerAttributes;

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
      const customerContactAttributes = await Attributes.getCustomerContactAttributes();
      const contactField: any = [...ContactFields, ...customerContactAttributes];
      if (customerData) {
        if (contactField) {
          contactField.forEach((item: any) => {
            const selectedContactData = contactFields.filter((items: any) => items.contactDC === contactId);
            if (_.has(selectedContactData[0], item.attributeType)) {
              _.set(item, 'attributeValue', selectedContactData[0][item.attributeType]);
            }
            _.set(item, 'id', item.attributeType);
          });
          setContactFields(contactField);
          const contactAttributesWithValues = contactField.filter((obj: any) => {
            return obj.valuesExist === true;
          });
          const contactAttributesValues = await AddOpportunityFields.getAllFieldsValues(contactAttributesWithValues);
          setContactAttributeValues(contactAttributesValues);
        }
      }
    } else if (key === 'add contact fields') {
      const customerContactAttributes = await Attributes.getCustomerContactAttributes();
      const contactField = ContactFields;
      contactField.forEach((item: any) => {
        _.set(item, 'attributeValue', '');
        _.set(item, 'error', '');
      });
      const updatedFields: any = [...contactField, ...customerContactAttributes];
      updatedFields.forEach((obj: any) => {
        if (obj.attributeType === 'ACTIVE') {
          _.set(obj, 'attributeValue', true);
        }
        _.set(obj, 'id', obj.attributeType);
      });
      setContactFields(updatedFields);
      const contactAttributesWithValues = updatedFields.filter((obj: any) => {
        return obj.valuesExist === true;
      });
      const contactAttributesValues = await AddOpportunityFields.getAllFieldsValues(contactAttributesWithValues);
      setContactAttributeValues(contactAttributesValues);
    } else {
      storedAttributes.sort((a, b) => {
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
        const tempAttributesArray: AttributeFormField[] = [];
        let currentIndex = 0;
        attributes.forEach((obj: AttributeField) => {
          if (obj.uniqueRecord) {
            const tempObj: AttributeFormField = { ...obj };
            tempObj.id = `${obj?.attributeType}_${currentIndex}`;
            currentIndex += 1;

            if (dataDetails) {
              const attribute = dataDetails.find((objs: any) => {
                return objs.attributeType === obj.attributeType;
              });

              tempObj.valueId = (attribute && attribute.valueId) || '';

              tempObj.attributeValue = (attribute && attribute.attributeValue) || '';
            }
            tempAttributesArray.push(tempObj);
          } else {
            // eslint-disable-next-line no-lonely-if
            const attributeValueArray =
              dataDetails &&
              dataDetails.filter((objs: any) => {
                return objs.attributeType === obj.attributeType;
              });

            if (attributeValueArray && attributeValueArray.length) {
              attributeValueArray.forEach((objs: any) => {
                const tempObj: AttributeFormField = { ...obj };
                tempObj.valueId = objs?.valueId;
                tempObj.id = `${obj?.attributeType}_${currentIndex}`;
                currentIndex += 1;
                tempObj.attributeValue = (objs && objs.attributeValue) || '';
                tempAttributesArray.push(tempObj);
              });
            } else {
              const tempObj: AttributeFormField = { ...obj };
              tempObj.id = `${obj?.attributeType}_${currentIndex}`;
              currentIndex += 1;
              tempAttributesArray.push(tempObj);
            }
          }
        });

        if (tempAttributesArray) {
          const groups = new Set(
            tempAttributesArray.map((obj) => {
              return obj.group;
            })
          );
          const response: any = [];
          groups.forEach((group: string) => {
            const groupName = group.toLowerCase();
            response[groupName] = tempAttributesArray.filter((obj) => obj.group.toLowerCase() === groupName);
          });
          const selectedGroupData = response[key];
          setAttributes(selectedGroupData);
          setShowAttributes(true);

          const tempAttributeTypes = selectedGroupData.map((obj: UserDefinedField) => {
            return obj.attributeType;
          });
          const attributeTypeSet = new Set(tempAttributeTypes);
          setAttributeTypes(Array.from(attributeTypeSet));
          const newArray = [...selectedGroupData];
          setAttributes(newArray);
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
    if (contactFields) {
      const elementIndex = contactFields.findIndex((element: any) => element.attributeId === e.currentTarget.id);
      const newArray = [...contactFields];
      if (e.currentTarget.checked) {
        newArray[elementIndex].attributeValue = true;
      } else {
        newArray[elementIndex].attributeValue = false;
      }
      setContactFields(newArray);
    }
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, dataObject?: any) => {
    const { value, id } = e.currentTarget;
    const obj = dataObject[0];
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (attributes) {
      const elementIndex = attributes.findIndex((element) => element.id === id);
      const newArray = [...attributes];
      newArray[elementIndex].attributeValue = value;
      if (obj) {
        if (value.length && obj.valueFormat === 'N' && !value.match(numberPattern)) {
          obj.error = i18n.t('numericFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setNumberError(true);
        }
        if ((obj.valueFormat === 'N' && value === '') || (value.length && obj.valueFormat === 'N' && value.match(numberPattern))) {
          obj.error = '';
          inputElement.style.border = '1px solid #DAE2E7';
          setNumberError(false);
        }
        if (value.length && obj.attributeType === 'EMAIL' && !value.match(emailPattern)) {
          obj.error = i18n.t('emailFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setEmailError(true);
        }
        if ((obj.attributeType === 'EMAIL' && value === '') || (value.length && obj.attributeType === 'EMAIL' && value.match(emailPattern))) {
          obj.error = '';
          inputElement.style.border = '1px solid #DAE2E7';
          setEmailError(false);
        }
      }
      setAttributes(newArray);
    }
    if (defaultFields) {
      const elementIndex = defaultFields.findIndex((element: any) => element.attributeType === id);
      const newArray = [...defaultFields];
      newArray[elementIndex].attributeValue = value;
      if (dataObject) {
        if (value === '' && dataObject.attributeType !== 'phone') {
          dataObject.error = i18n.t('blankFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setEmailError(true);
        }
        if (value !== '' && dataObject.attributeType !== 'phone') {
          dataObject.error = '';
          inputElement.style.border = '1px solid #DAE2E7';
          setEmailError(false);
        }
        if (value.length && dataObject.attributeType === 'phone' && !value.match(numberPattern)) {
          dataObject.error = i18n.t('numericFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setNumberError(true);
        }
        if (value.length && dataObject.attributeType === 'phone' && value.match(numberPattern)) {
          dataObject.error = '';
          inputElement.style.border = '1px solid #DAE2E7';
          setNumberError(false);
        }
      }
      setDefaultFields(newArray);
    }
    if (contactFields) {
      const elementIndex = contactFields.findIndex((element: any) => element.attributeType === e.currentTarget.id);
      const newArray = [...contactFields];
      newArray[elementIndex].attributeValue = e.currentTarget.value;
      if (obj) {
        if (value.length && obj.attributeType === 'email' && !value.match(emailPattern)) {
          obj.error = i18n.t('emailFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setEmailError(true);
        }
        if ((obj.attributeType === 'email' && value === '') || (value.length && obj.attributeType === 'email' && value.match(emailPattern))) {
          obj.error = '';
          inputElement.style.border = '1px solid #DAE2E7';
          setEmailError(false);
        }
        if (value.length && obj.attributeType === 'phone' && !value.match(numberPattern)) {
          obj.error = i18n.t('numericFieldError');
          inputElement.style.border = '1px solid #ED2024';
          setNumberError(true);
        }
        if ((obj.attributeType === 'phone' && value === '') || (value.length && obj.attributeType === 'phone' && value.match(numberPattern))) {
          obj.error = '';
          inputElement.style.border = '1px solid #DAE2E7';
          setNumberError(false);
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
      const attributeWithValuesDetails = await Promise.all(
        withValueAttributes.map((obj) => {
          return Attributes.updateAttributes(
            customerData.data.businessPartner,
            obj.attributeType,
            obj.valueFormatDesc === 'DATE' && obj.attributeValue
              ? obj.attributeValue === '0'
                ? ''
                : getDashDateFormat(getDate(obj.attributeValue.toString()))
              : obj.attributeValue
              ? obj.attributeValue
              : '',
            obj.valueId ? obj.valueId : '',
            obj.valueFormatDesc === 'DATE' ? 'date' : ''
          );
        })
      ).then((response) => {
        return response;
      });
      const attributeWithoutValuesDetails = await Promise.all(
        withoutValueAttributes.map((obj) => {
          return AddCustomerApi.addAttributes(
            customerData.data.businessPartner,
            obj.attributeType,
            obj.valueFormatDesc === 'DATE' && obj.attributeValue
              ? getDashDateFormat(getDate(obj.attributeValue.toString()))
              : obj.attributeValue
              ? obj.attributeValue
              : '',
            obj.valueFormatDesc === 'DATE' ? 'date' : ''
          );
        })
      ).then((dataItems) => {
        return dataItems;
      });
      getAttributesValues();
      if (attributeWithValuesDetails || attributeWithoutValuesDetails) {
        if (deleteAttributes) {
          const attributeData = await Promise.all(
            deleteAttributes.map((obj: any) => {
              return Attributes.deleteAttribute(obj.valueId);
            })
          ).then((res: any) => {
            return res;
          });
          console.log(attributeData);
        }

        OpportunityDetailsApi.getCustomerGroupInfo(customerData.data.businessPartner).then((dataResult) => {
          storedAttributes.forEach((item) => {
            if (!dataResult.some((ele) => ele.attributeType === item.attributeType)) {
              dataResult.push({ attributeType: item.attributeType, group: item.group, attributeValue: '', description: item.description });
            }
          });
          const groups = new Set(
            dataResult.map((obj) => {
              return obj.group;
            })
          );
          const response: any = {};
          groups.forEach((group: string) => {
            const groupName = group.toLowerCase();
            response[groupName] = dataResult.filter((obj) => obj.group.toLowerCase() === groupName);
          });
          dispatch(saveBusinessPartnerAttributes(response));
          dispatch(setBusinessPartnerLoader(false));
          dispatch(setBusinessPartnerWindowActive(false));
          document.body.classList.remove('body-scroll-hidden');
        });
        CustomerDetailsApi.get(customerData.data.businessPartner).then((responseData) => {
          if (responseData) dispatch(saveCustomerDefaultFields(responseData));
        });
      }
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
        dispatch(updateCustomerContact(customerFields, customerData.data.businessPartner, deleteAttributes, 'update'));
      } else {
        customerFields.businessPartner = customerData.data.businessPartner;
        customerFields.ACTIVE = true;
        dispatch(updateCustomerContact(customerFields, customerData.data.businessPartner, deleteAttributes, 'add'));
      }
    }
  };

  const closeAction = () => {
    document.body.classList.remove('body-scroll-hidden');
    dispatch(resetBusinessPartnerData());
    dispatch(setBusinessPartnerWindowActive(false));
    dispatch(setBusinessPartnerLoader(false));
    document.body.classList.remove('body-scroll-hidden');
    if (key === 'contact fields' || key === 'add contact fields') {
      if (ContactFields) {
        ContactFields.forEach((item: any) => {
          _.set(item, 'attributeValue', '');
          _.set(item, 'error', '');
        });
      }
    }
    if (key !== 'default fields' && key !== 'contact fields' && key !== 'add contact fields') {
      if (storedAttributes) {
        storedAttributes.forEach((item: any) => {
          _.set(item, 'error', '');
        });
      }
    }
    setShowAttributes(false);
  };

  const onDateChange = (value: any, dataObject: any) => {
    if (attributes) {
      const elementIndex = attributes.findIndex((element) => element.id === dataObject);
      const newArray = [...attributes];
      newArray[elementIndex].attributeValue = value;
      setAttributes(newArray);
    }
    if (contactFields) {
      const elementIndex = contactFields.findIndex((element: any) => element.id === dataObject);
      const newArray = [...contactFields];
      newArray[elementIndex].attributeValue = value;
      setContactFields(newArray);
    }
  };

  const addElement = (obj: any) => {
    if (attributes) {
      const tempFields = attributes;
      const currentIndex = attributes.length + 1;
      const tempObj: UserDefinedField = { ...obj };
      tempObj.id = `${obj?.attributeType}_${currentIndex}`;
      tempObj.attributeValue = '';
      tempObj.valueId = undefined;
      tempObj.attributeType = obj?.attributeType;

      tempFields.push(tempObj);
      const tempArray = tempFields.map((fieldObj: any) => {
        return { ...fieldObj };
      });
      setAttributes(tempArray);
    }
    if (contactFields) {
      const tempFields = contactFields;
      const currentIndex = contactFields.length + 1;
      const tempObj: UserDefinedField = { ...obj };
      tempObj.id = `${obj?.attributeType}_${currentIndex}`;
      tempObj.attributeValue = '';
      tempObj.valueId = undefined;
      tempObj.attributeType = obj?.attributeType;

      tempFields.push(tempObj);
      const tempArray = tempFields.map((fieldObj: any) => {
        return { ...fieldObj };
      });
      setContactFields(tempArray);
    }
  };

  const deleteElement = (obj: AttributeFormField) => {
    if (attributes) {
      const tempChangeAttribues = [...attributes];
      const elementIndex = tempChangeAttribues.findIndex((element: AttributeFormField) => element.id === obj.id);
      tempChangeAttribues.splice(elementIndex, 1);
      setAttributes(tempChangeAttribues);

      if (obj.valueId) {
        const tempAttributes = [...deleteAttributes];
        tempAttributes.push(obj);
        setDeleteAttributes(tempAttributes);

        const tempFields = [...attributes];
        const tempIndex = tempFields.findIndex((element: AttributeFormField) => element.id === obj.id);
        tempFields.splice(tempIndex, 1);
        setAttributes(tempFields);
      } else {
        const tempFields = [...attributes];
        const tempIndex = tempFields.findIndex((element: AttributeFormField) => element.id === obj.id);
        tempFields.splice(tempIndex, 1);
        setAttributes(tempFields);
      }
    }
    if (contactFields) {
      const tempChangeAttribues = [...contactFields];
      const elementIndex = tempChangeAttribues.findIndex((element: AttributeFormField) => element.id === obj.id);
      tempChangeAttribues.splice(elementIndex, 1);
      setContactFields(tempChangeAttribues);

      if (obj.valueId) {
        const tempAttributes = [...deleteAttributes];
        tempAttributes.push(obj);
        setDeleteAttributes(tempAttributes);

        const tempFields = [...contactFields];
        const tempIndex = tempFields.findIndex((element: AttributeFormField) => element.id === obj.id);
        tempFields.splice(tempIndex, 1);
        setContactFields(tempFields);
      } else {
        const tempFields = [...contactFields];
        const tempIndex = tempFields.findIndex((element: AttributeFormField) => element.id === obj.id);
        tempFields.splice(tempIndex, 1);
        setContactFields(tempFields);
      }
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

  React.useEffect(() => {
    if (emailError || numberError) {
      setFieldError(true);
    }
    if (!emailError && !numberError) {
      setFieldError(false);
    }
  }, [emailError, numberError]);

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

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
          <div className="all-opportunity-steps-container">
            <div className="customer-forms">
              <p className="add-subtitle edit-subtitle">{key === 'default fields' ? 'Customer Information' : key}</p>
              <div className="edit-customer-info">
                <div className="steps-one-forms">
                  <form onSubmit={(e) => onSubmit(e)}>
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
                          const contactArrayField = [];
                          contactArrayField.push(obj);
                          if (obj.valuesExist && !obj.validate) {
                            return (
                              <DropDownWithCustomValue
                                obj={contactArrayField}
                                options={contactAttributeValues}
                                onSelect={onInputValueChange}
                                addElement={addElement}
                                deleteElement={deleteElement}
                              />
                            );
                          }
                          if (obj.valuesExist) {
                            return (
                              <DropDown
                                obj={contactArrayField}
                                options={contactAttributeValues}
                                onSelect={onInputValueChange}
                                addElement={addElement}
                                deleteElement={deleteElement}
                              />
                            );
                          }
                          if (obj.valueFormatDesc === 'DATE') {
                            return (
                              <DateInputComponent
                                obj={contactArrayField}
                                onDateChange={onDateChange}
                                addElement={addElement}
                                deleteElement={deleteElement}
                              />
                            );
                          }
                          if (obj.valueFormatDesc === 'BOOLEAN') {
                            return (
                              <div className="form-group oppty-form-elements">
                                <span className="checkbox-label">
                                  {obj.description}
                                  <label className="switch" htmlFor={obj.attributeId}>
                                    <input type="checkbox" id={obj.attributeId} checked={!!obj.attributeValue} onChange={onCheckboxValueChange} />
                                    <span className="slider round">&nbsp;</span>
                                  </label>
                                </span>
                              </div>
                            );
                          } else {
                            return (
                              <TextInputField
                                obj={contactArrayField}
                                onInputValueChange={onInputValueChange}
                                addElement={addElement}
                                deleteElement={deleteElement}
                              />
                            );
                          }
                        })
                      : showAttributes &&
                        attributes?.length &&
                        attributeTypes?.length &&
                        attributeTypes.map((str: string) => {
                          const attributeFields: UserDefinedField[] = attributes.filter((obj: UserDefinedField) => {
                            return obj.attributeType === str;
                          });
                          const object = attributeFields[0];
                          if (object.valuesExist && !object.validate) {
                            return (
                              <DropDownWithCustomValue
                                obj={attributeFields}
                                options={attributeValues}
                                onSelect={onInputValueChange}
                                addElement={addElement}
                                deleteElement={deleteElement}
                              />
                            );
                          }
                          if (object.valuesExist) {
                            return (
                              <DropDown
                                obj={attributeFields}
                                options={attributeValues}
                                onSelect={onInputValueChange}
                                addElement={addElement}
                                deleteElement={deleteElement}
                              />
                            );
                          }
                          if (object.valueFormatDesc === 'DATE') {
                            return (
                              <DateInputComponent
                                obj={attributeFields}
                                onDateChange={onDateChange}
                                addElement={addElement}
                                deleteElement={deleteElement}
                              />
                            );
                          }
                          if (object.valueFormatDesc === 'BOOLEAN') {
                            return (
                              <div className="form-group oppty-form-elements">
                                <span className="checkbox-label">
                                  {object.description}
                                  <label className="switch" htmlFor={object.attributeType}>
                                    <input
                                      type="checkbox"
                                      id={object.attributeType}
                                      checked={object.attributeValue !== 'N'}
                                      onChange={onCheckboxValueChange}
                                    />
                                    <span className="slider round">&nbsp;</span>
                                  </label>
                                </span>
                              </div>
                            );
                          } else {
                            return (
                              <TextInputField
                                obj={attributeFields}
                                onInputValueChange={onInputValueChange}
                                addElement={addElement}
                                deleteElement={deleteElement}
                              />
                            );
                          }
                        })}
                    <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
                      <button
                        className={fieldError ? 'customer-btn disable-link' : 'customer-btn'}
                        onClick={!fieldError ? updateCustomer : undefined}
                        type="submit">
                        {key === 'add contact fields' ? i18n.t('addContact') : i18n.t('save')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface TextInputFieldProps {
  obj: any;
  onInputValueChange: (e: React.ChangeEvent<HTMLInputElement>, dataObject?: any) => void;
  addElement: (data: AttributeFormField) => void;
  deleteElement: (data: AttributeFormField) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ obj, onInputValueChange, addElement, deleteElement, onBlur }) => {
  return (
    <>
      <div className="adding-txt-field-container">
        {obj[0].uniqueRecord === false ? (
          <button type="button" className="btn btn-link add-txt-field" onClick={() => addElement(obj[0])}>
            + ADD
          </button>
        ) : null}

        {obj.map((fieldObj: AttributeFormField, index: number) => {
          if (index === 0) {
            return (
              <div className="form-group oppty-form-elements add-new-ipfield">
                <label className="opp-label" htmlFor={fieldObj.attributeType}>
                  {fieldObj.description}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`${fieldObj.description}`}
                  id={fieldObj.id}
                  value={fieldObj.attributeValue}
                  onChange={(e) => onInputValueChange(e, obj)}
                  onBlur={onBlur}
                />
                <span className="form-hints">{fieldObj?.error}</span>
              </div>
            );
          } else {
            return (
              <div className="form-element-with-delete-button">
                <div className="form-group oppty-form-elements add-new-ipfield">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`${fieldObj.description}`}
                    id={fieldObj.id}
                    value={fieldObj.attributeValue}
                    onChange={(e) => onInputValueChange(e, obj)}
                    onBlur={onBlur}
                  />
                </div>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button type="button" className="btn btn-link ip-delete-field" onClick={() => deleteElement(fieldObj)} />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

interface DateInputProps {
  obj: any[];
  onDateChange: (str: any, object: AttributeFormField) => void;
  addElement: (data: AttributeFormField) => void;
  deleteElement: (data: AttributeFormField) => void;
}

const DateInputComponent: React.FC<DateInputProps> = ({ obj, onDateChange, addElement, deleteElement }) => {
  return (
    <>
      <div className="adding-txt-field-container">
        {obj[0].uniqueRecord === false ? (
          <button type="button" className="btn btn-link add-txt-field" onClick={() => addElement(obj[0])}>
            + ADD
          </button>
        ) : null}

        {obj.map((fieldObj: any, index: number) => {
          if (index === 0) {
            return (
              <div className="form-group oppty-form-elements">
                <label className="opp-label" htmlFor={fieldObj.attributeType}>
                  {fieldObj.description}
                </label>
                <DateInput
                  onDateSelect={(value: Date) => onDateChange(value, fieldObj.id)}
                  currentDate={
                    fieldObj.attributeValue && fieldObj.attributeValue !== '0' ? getDashDateFormat(getDate(fieldObj.attributeValue.toString())) : ''
                  }
                />
                <span className="form-hints">{fieldObj?.error}</span>
              </div>
            );
          } else {
            return (
              <div className="form-element-with-delete-button">
                <div className="form-group oppty-form-elements add-new-ipfield">
                  <DateInput
                    onDateSelect={(value: Date) => onDateChange(value, fieldObj.id)}
                    currentDate={
                      fieldObj.attributeValue && fieldObj.attributeValue !== '0' ? getDashDateFormat(getDate(fieldObj.attributeValue.toString())) : ''
                    }
                  />
                </div>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button type="button" className="btn btn-link ip-delete-field" onClick={() => deleteElement(fieldObj)} />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default EditCustomer;
