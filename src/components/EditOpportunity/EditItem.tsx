import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { AppState } from '../../store/store';
import i18n from '../../i18n';
import BooleanInput from './BooleanInput';
import * as models from '../../helpers/Api/models';
import DateInput from '../Shared/Picker/DateInput';
import DropDown from '../Shared/Form/DropDown';
import DropDownWithCustomValue from '../Shared/Form/DropDownWithCustomValue';
import { AttributeFormField } from '../../helpers/Api/models';
import { convertDateFormat } from '../../helpers/utilities/lib';
import { updateItemAttributes, deleteAttribute } from '../../store/OpportunityDetails/Actions';
import AddOpportunityFields from '../../helpers/Api/OpportunityUserDefinedFields';

const regex = /^-?\d+\.?\d*$/;

const EditItem: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const [fields, setFields] = React.useState<models.AttributeFormField[]>([]);

  React.useEffect(() => {
    const tempAttributes: models.AttributeField[] = state.enviornmentConfigs.productAttributes;
    const tempAttributesArray: models.AttributeFormField[] = [];
    const data: models.Product | null = state.opportuntyDetails.editOportunity.data ? state.opportuntyDetails.editOportunity.data : null;
    if (data) {
      let currentIndex = 0;

      tempAttributes.forEach((obj: models.AttributeField) => {
        if (obj.uniqueRecord) {
          const tempObj: models.AttributeFormField = { ...obj };
          tempObj.id = `${obj?.attributeType}_${currentIndex}`;
          currentIndex += 1;

          if (data && data.attributes) {
            const attribute: models.AttributeValueObject | undefined = data.attributes.find((objs: models.AttributeValueObject) => {
              return objs.attributeType === obj.attributeType;
            });

            tempObj.valueId = (attribute && attribute.valueId) || '';
            if (obj.valueFormatDesc === 'DATE') {
              tempObj.attributeValueD =
                attribute && attribute.attributeValue && attribute.attributeValue !== '0' ? convertDateFormat(attribute.attributeValue) : '';
            } else {
              tempObj.attributeValue = (attribute && attribute.attributeValue) || '';
            }
          }
          tempAttributesArray.push(tempObj);
        } else {
          // eslint-disable-next-line no-lonely-if
          const attributeValueArray: models.AttributeValueObject[] | undefined =
            data &&
            data.attributes &&
            data.attributes.filter((objs: models.AttributeValueObject) => {
              return objs.attributeType === obj.attributeType;
            });

          if (attributeValueArray && attributeValueArray.length) {
            attributeValueArray.forEach((objs: models.AttributeValueObject) => {
              const tempObj: models.AttributeFormField = { ...obj };
              // tempObj.attributeValue = objs?.attributeValue;
              tempObj.valueId = objs?.valueId;
              tempObj.id = `${obj?.attributeType}_${currentIndex}`;
              currentIndex += 1;
              if (obj.valueFormatDesc === 'DATE') {
                tempObj.attributeValueD = objs.attributeValue && objs.attributeValue !== '0' ? convertDateFormat(objs.attributeValue) : '';
              } else {
                tempObj.attributeValue = (objs && objs.attributeValue) || '';
              }
              tempAttributesArray.push(tempObj);
            });
          } else {
            const tempObj: models.AttributeFormField = { ...obj };
            tempObj.id = `${obj?.attributeType}_${currentIndex}`;
            currentIndex += 1;
            tempAttributesArray.push(tempObj);
          }
        }
      });
      setFields(tempAttributesArray);
    }
  }, []);

  return <>{fields?.length ? <EditItemForm formFields={fields} /> : null}</>;
};

interface FormFields {
  formFields: models.AttributeFormField[];
}

const EditItemForm: React.FC<FormFields> = ({ formFields }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [fields, setFields] = React.useState<models.AttributeFormField[]>([]);
  const [attributeTypes, setAttributeTypes] = React.useState<string[]>([]);
  const [changedAttributes, setChangeAttributes] = React.useState<models.AttributeFormField[]>([]);
  const [deleteAttributes, setDeleteAttributes] = React.useState<models.AttributeFormField[]>([]);
  const [item, setItem] = React.useState<models.Product>();
  const [attributeValues, setAttributeValues] = React.useState<any>();

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    const obj = fields.find((element: models.AttributeFormField) => element.id === id);
    if (obj) {
      const inputElement = document.getElementById(id) as HTMLInputElement;
      let error = false;
      if (obj && value.length && obj.valueFormat === 'N' && !value.match(regex)) {
        obj.error = i18n.t('numericFieldError');
        inputElement.style.border = '1px solid #ED2024';
        error = true;
      } else {
        obj.error = '';
        inputElement.style.border = '1px solid #DAE2E7';
      }

      const newArray = [...fields];
      const elementIndex = fields.findIndex((element: models.SaveAttributeFieldParam) => element.id === id);
      if (error === false) {
        newArray[elementIndex].attributeValue = value;
        obj.attributeValue = value;
      }
      setFields(newArray);
      onUpdateValues(obj);
    }
  };

  const onDateChange = (value: string, dataObject: models.AttributeFormField) => {
    const { id } = dataObject;
    if (dataObject) {
      dataObject.attributeValueD = value;
      const newArray = [...fields];
      const elementIndex = fields.findIndex((element: models.SaveAttributeFieldParam) => element.id === id);
      newArray[elementIndex].attributeValueD = value;
      setFields(newArray);
      onUpdateValues(dataObject);
    }
  };

  const onBooleanValueChange = (obj: models.AttributeFormField) => {
    if (obj) {
      const newArray = [...fields];
      const elementIndex = fields.findIndex((element: models.AttributeFormField) => element.id === obj.id);
      newArray[elementIndex].attributeValueB = obj.attributeValueB;
      if (obj.attributeValueB) {
        newArray[elementIndex].attributeValue = 'Y';
      } else {
        newArray[elementIndex].attributeValue = 'N';
      }
      setFields(newArray);
      onUpdateValues(obj);
    }
  };

  const onUpdateValues = (obj: models.AttributeFormField) => {
    const changedItemIndex = changedAttributes.findIndex((element: models.AttributeFormField) => element.id === obj.id);
    if (changedItemIndex > -1) {
      const newArray = [...changedAttributes];
      newArray[changedItemIndex] = obj;
      setChangeAttributes(newArray);
    } else {
      setChangeAttributes([...changedAttributes, obj]);
    }
  };

  const onNextButtonClick = async () => {
    if (item) {
      dispatch(updateItemAttributes(item, changedAttributes));
      dispatch(deleteAttribute(deleteAttributes));
    }
  };

  const getAttributesValues = async (attributes: any) => {
    const attributesValues = await AddOpportunityFields.getAllFieldsValues(attributes);
    setAttributeValues(attributesValues);
  };

  React.useEffect(() => {
    const data: models.Product | null = state.opportuntyDetails.editOportunity.data ? state.opportuntyDetails.editOportunity.data : null;
    if (data) {
      setItem(data);
    }

    const tempAttributeTypes = formFields.map((obj: models.AttributeFormField) => {
      return obj.attributeType;
    });

    const attributesWithValues = formFields.filter((obj: AttributeFormField) => {
      return obj.valuesExist === true;
    });
    getAttributesValues(attributesWithValues);

    const attributeTypeSet = new Set(tempAttributeTypes);
    setAttributeTypes(Array.from(attributeTypeSet));
    const newArray = [...formFields];
    setFields(newArray);
  }, []);

  const addElement = (obj: models.AttributeFormField) => {
    const tempFields = [...fields];
    const currentIndex = tempFields.length + 1;
    const tempObj: models.AttributeFormField = { ...obj };
    tempObj.id = `${obj?.attributeType}_${currentIndex}`;
    tempObj.attributeValue = '';
    tempObj.valueId = '';
    if (obj.valueFormatDesc === 'DATE') {
      tempObj.attributeValueD = moment(new Date()).format('YYYY-MM-DD');
    } else if (obj.valueFormatDesc === 'BOOLEAN') {
      tempObj.attributeValueB = false;
    } else {
      tempObj.attributeValue = '';
    }

    tempFields.push(tempObj);
    const tempArray = tempFields.map((fieldObj: models.AttributeFormField) => {
      return { ...fieldObj };
    });
    setFields(tempArray);
  };

  const deleteElement = (obj: models.AttributeFormField) => {
    const tempChangeAttribues = [...changedAttributes];
    const elementIndex = tempChangeAttribues.findIndex((element: models.AttributeFormField) => element.id === obj.id);
    tempChangeAttribues.splice(elementIndex, 1);
    setChangeAttributes(tempChangeAttribues);

    if (obj.valueId) {
      const tempAttributes = [...deleteAttributes];
      tempAttributes.push(obj);
      setDeleteAttributes(tempAttributes);

      const tempFields = [...fields];
      const tempIndex = tempFields.findIndex((element: models.AttributeFormField) => element.id === obj.id);
      tempFields.splice(tempIndex, 1);
      setFields(tempFields);
    } else {
      const tempFields = [...fields];
      const tempIndex = tempFields.findIndex((element: models.AttributeFormField) => element.id === obj.id);
      tempFields.splice(tempIndex, 1);
      setFields(tempFields);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="opportunity-edit-form">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="opportunity-forms edit-form">
            <p className="stepone-title">Edit Product Information</p>
            <div className="form-group oppty-form-elements">
              <label htmlFor="item" className="opp-label">
                {i18n.t('itemId')}
              </label>
              <input type="text" value={item?.item} className="form-control" disabled />
            </div>
            <div className="form-group oppty-form-elements">
              <label htmlFor="description" className="opp-label">
                {i18n.t('itemName')}
              </label>
              <input type="text" value={item?.itemDescription} className="form-control" disabled />
            </div>
            {attributeTypes.length
              ? attributeTypes.map((str: string) => {
                  const attributeFields: models.AttributeFormField[] = fields.filter((obj: AttributeFormField) => {
                    return obj.attributeType === str;
                  });

                  if (attributeFields[0].valueFormatDesc === 'DATE') {
                    return (
                      <DateInputComponent obj={attributeFields} onDateChange={onDateChange} addElement={addElement} deleteElement={deleteElement} />
                    );
                  } else if (attributeFields[0].valueFormatDesc === 'BOOLEAN') {
                    return <BooleanInput obj={attributeFields[0]} onValueChange={onBooleanValueChange} />;
                  } else if (attributeFields[0].valuesExist === true && attributeFields[0].validate === false) {
                    return (
                      <DropDownWithCustomValue
                        obj={attributeFields}
                        options={attributeValues}
                        onSelect={onInputValueChange}
                        addElement={addElement}
                        deleteElement={deleteElement}
                      />
                    );
                  } else if (attributeFields[0].valuesExist === true) {
                    return (
                      <DropDown
                        obj={attributeFields}
                        options={attributeValues}
                        onSelect={onInputValueChange}
                        addElement={addElement}
                        deleteElement={deleteElement}
                      />
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
                })
              : null}
          </div>
          <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
            <button type="submit" className="stepone-next-btn done" onClick={onNextButtonClick}>
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

interface TextInputFieldProps {
  obj: models.AttributeFormField[];
  onInputValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addElement: (data: models.AttributeFormField) => void;
  deleteElement: (data: models.AttributeFormField) => void;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ obj, onInputValueChange, addElement, deleteElement }) => {
  return (
    <>
      <div className="adding-txt-field-container">
        {obj[0].uniqueRecord === false ? (
          <button type="button" className="btn btn-link add-txt-field" onClick={() => addElement(obj[0])}>
            + ADD
          </button>
        ) : null}

        {obj.map((fieldObj: models.AttributeFormField, index: number) => {
          if (index === 0) {
            return (
              <div className="form-group oppty-form-elements">
                <label className="opp-label" htmlFor={fieldObj.attributeType}>
                  {fieldObj.description}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`${fieldObj.description}`}
                  id={fieldObj.id}
                  value={fieldObj.attributeValue}
                  onChange={onInputValueChange}
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
                    onChange={onInputValueChange}
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
  obj: models.AttributeFormField[];
  onDateChange: (str: any, object: models.AttributeFormField) => void;
  addElement: (data: models.AttributeFormField) => void;
  deleteElement: (data: models.AttributeFormField) => void;
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

        {obj.map((fieldObj: models.AttributeFormField, index: number) => {
          const currDate = fieldObj.attributeValueD;
          if (index === 0) {
            return (
              <div className="form-group oppty-form-elements">
                <label className="opp-label" htmlFor={fieldObj.attributeType}>
                  {fieldObj.description}
                </label>
                <DateInput onDateSelect={(value: Date) => onDateChange(value, fieldObj)} currentDate={currDate !== '0' ? currDate : ''} />
                <span className="form-hints">{fieldObj?.error}</span>
              </div>
            );
          } else {
            return (
              <div className="form-element-with-delete-button">
                <div className="form-group oppty-form-elements add-new-ipfield">
                  <DateInput onDateSelect={(value: Date) => onDateChange(value, fieldObj)} currentDate={currDate !== '0' ? currDate : ''} />
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

export default EditItem;
