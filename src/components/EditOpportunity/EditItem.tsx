/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Constants } from '../../config/Constants';
import { AppState } from '../../store/store';
import { Attributes } from '../../helpers/Api/Attributes';
import { getProductInformation } from '../../store/OpportunityDetails/Actions';
import i18n from '../../i18n';
import * as models from '../../helpers/Api/models';
import DateInput from '../Shared/Picker/DateInput';
import { AttributeFormField } from '../../helpers/Api/models';

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
            tempObj.attributeValue = (attribute && attribute.attributeValue) || '';
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
              tempObj.attributeValue = objs?.attributeValue;
              tempObj.valueId = objs?.valueId;
              tempObj.id = `${obj?.attributeType}_${currentIndex}`;
              currentIndex += 1;
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

  return (
    <>
      {/* {fields?.length ? <EditItemForm formFields={fields} addElement={addElement} /> : null} */}
      {fields?.length ? <EditItemForm formFields={fields} /> : null}
    </>
  );
};

interface FormFields {
  formFields: models.AttributeFormField[];
  // addElement: (obj: models.AttributeFormField) => void;
}

const EditItemForm: React.FC<FormFields> = ({ formFields }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [fields, setFields] = React.useState<models.AttributeFormField[]>([]);
  const [attributeTypes, setAttributeTypes] = React.useState<string[]>([]);
  const [changeValues, setChangedFields] = React.useState<models.AttributeFormField[]>([]);
  const [item, setItem] = React.useState<models.Product>();

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    const obj = fields.find((element: models.AttributeFormField) => element.id === id);
    if (obj) {
      const inputElement = document.getElementById(id) as HTMLInputElement;

      if (obj && value.length && obj.valueFormat === 'N' && !value.match(regex)) {
        obj.error = i18n.t('numericFieldError');
        inputElement.style.border = '1px solid #ED2024';
      } else {
        obj.error = '';
        inputElement.style.border = '1px solid #DAE2E7';
      }

      obj.attributeValue = value;
      const newArray = [...fields];
      const elementIndex = fields.findIndex((element: models.SaveAttributeFieldParam) => element.id === id);
      newArray[elementIndex].attributeValue = value;
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

  const onUpdateValues = (obj: models.AttributeFormField) => {
    const changedItemIndex = changeValues.findIndex((element: models.AttributeFormField) => element.id === obj.id);
    if (changedItemIndex > -1) {
      const newArray = [...changeValues];
      newArray[changedItemIndex] = obj;
      setChangedFields(newArray);
    } else {
      setChangedFields([...changeValues, obj]);
    }
  };

  const onNextButtonClick = async () => {
    if (item) {
      const data = await Promise.all(
        changeValues.map(async (obj: models.AttributeFormField) => {
          if (obj.valueId) {
            const params: models.SaveAttributeFieldParam = {
              parentFile: Constants.OPPORTUNITY_PRODUCTS_FILE,
              attributeType: obj.attributeType,
              valueId: obj.valueId,
            };
            if (obj.attributeValueB) {
              params.attributeValueB = true;
            } else if (obj.attributeValueD) {
              params.attributeValueD = obj.attributeValueD;
            } else {
              params.attributeValue = obj.attributeValue;
            }
            return Attributes.updateAttribute(params);
          } else {
            const params: models.SaveAttributeFieldParam = {
              parentFile: Constants.OPPORTUNITY_PRODUCTS_FILE,
              parentId: item.itemId,
              attributeType: obj.attributeType,
            };
            if (obj.valueFormatDesc === 'BOOLEAN') {
              params.attributeValueB = obj.attributeValueB;
            } else if (obj.attributeValueD) {
              params.attributeValueD = obj.attributeValueD;
            } else {
              params.attributeValue = obj.attributeValue;
            }
            return Attributes.addAttribute(params);
          }
        })
      ).then((res) => {
        return res;
      });
      if (data) {
        dispatch(getProductInformation(item.itemId));
      }
    }
  };

  React.useEffect(() => {
    const data: models.Product | null = state.opportuntyDetails.editOportunity.data ? state.opportuntyDetails.editOportunity.data : null;
    if (data) {
      setItem(data);
    }

    const tempAttributeTypes = formFields.map((obj: models.AttributeFormField) => {
      return obj.attributeType;
    });
    const attributeTypeSet = new Set(tempAttributeTypes);
    setAttributeTypes(Array.from(attributeTypeSet));
    const newArray = [...formFields];

    setFields(newArray);
  }, []);

  const addElement = (obj: models.AttributeFormField) => {
    const tempFields = [...fields];
    const currentIndex = formFields.length + 1;
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

  return (
    <div className="add-contacts">
      <div className="opportunity-forms">
        <p className="stepone-title">Edit Product Information</p>

        <form>
          <div className="form-group oppty-form-elements">
            <label htmlFor="item" className="opp-label">
              {i18n.t('itemId')}
            </label>
            <input type="text" value={item?.item} className="form-control" disabled={false} />
          </div>
          <div className="form-group oppty-form-elements">
            <label htmlFor="description" className="opp-label">
              {i18n.t('itemName')}
            </label>
            <input type="text" value={item?.itemDescription} className="form-control" disabled={false} />
          </div>
          {attributeTypes.length
            ? attributeTypes.map((str: string) => {
                const attributeFields: models.AttributeFormField[] = fields.filter((obj: AttributeFormField) => {
                  return obj.attributeType === str;
                });

                if (attributeFields[0].valueFormatDesc === 'DATE') {
                  return <DateInputComponent obj={attributeFields} onDateChange={onDateChange} />;
                } else {
                  return <TextInputField obj={attributeFields} onInputValueChange={onInputValueChange} addElement={addElement} />;
                }
              })
            : null}
        </form>
        <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
          <button type="button" className="stepone-next-btn done" onClick={onNextButtonClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

interface TextInputFieldProps {
  obj: models.AttributeFormField[];
  onInputValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addElement: (data: models.AttributeFormField) => void;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ obj, onInputValueChange, addElement }) => {
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
              <div className="form-group oppty-form-elements add-new-ipfield">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`${fieldObj.description}`}
                  id={fieldObj.id}
                  value={fieldObj.attributeValue}
                  onChange={onInputValueChange}
                />
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button type="button" className="btn btn-link ip-delete-field" />
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
  onDateChange: (str: string, object: models.AttributeFormField) => void;
}

const DateInputComponent: React.FC<DateInputProps> = ({ obj, onDateChange }) => {
  return (
    <div className="form-group oppty-form-elements">
      <label htmlFor="endDate" className="opp-label">
        {obj[0].description}
      </label>
      <DateInput onDateSelect={(value: string) => onDateChange(value, obj[0])} />
    </div>
  );
};

export default EditItem;
