import React from 'react';

import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as models from '../../helpers/Api/models';
import { AppState } from '../../store/store';
import AddOpportunityFields from '../../helpers/Api/OpportunityUserDefinedFields';
import i18n from '../../i18n';
import { updateAllAtrributeValues } from '../../store/OpportunityDetails/Actions';
import DateInput from '../Shared/Picker/DateInput';

const regex = /^-?\d+\.?\d*$/;

const EditAttributes: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const [attributes, setFields] = React.useState<models.AttributeFormField[]>([]);
  const [fieldNumber, setFieldNumber] = React.useState<number>(0);

  React.useEffect(() => {
    const fields = state.enviornmentConfigs.opportunityAttributes.filter((obj: models.AttributeField) => {
      return obj.group.toLowerCase() === state.opportuntyDetails.editOportunity.groupName;
    });

    const tempArray: models.AttributeFormField[] = [];

    let currentIndex = 0;

    fields.forEach((fieldObj: models.AttributeField) => {
      if (fieldObj.uniqueRecord) {
        const tempField: models.AttributeFormField = { ...fieldObj };
        const value: models.AttributeValueObject | undefined = state.opportuntyDetails.attributes.find(
          (valueObj) => valueObj.attributeType === fieldObj.attributeType
        );
        tempField.id = `${fieldObj.attributeType}_${currentIndex}`;
        currentIndex += 1;
        if (value) {
          tempField.attributeValue = value.attributeValue;
          tempField.valueId = value.valueId;
        } else {
          tempField.attributeValue = '';
        }
        tempArray.push(tempField);
      } else {
        const values: models.AttributeValueObject[] | undefined = state.opportuntyDetails.attributes.filter(
          (valueObj) => valueObj.attributeType === fieldObj.attributeType
        );

        if (values.length) {
          values.forEach((value: models.AttributeValueObject, curIndex: number) => {
            const uniqueRecord = curIndex + 1 !== values.length;
            const id = `${fieldObj.attributeType}_${currentIndex}`;
            currentIndex += 1;
            const tempObject: models.AttributeFormField = {
              ...fieldObj,
              valueId: value.valueId,
              attributeValue: value.attributeValue,
              id,
              uniqueRecord,
            };
            tempArray.push(tempObject);
          });
        } else {
          const tempField: models.AttributeFormField = { ...fieldObj };
          tempField.id = `${fieldObj.attributeType}_${currentIndex}`;
          currentIndex += 1;
          tempField.attributeValue = '';
          tempArray.push(tempField);
        }
      }
    });
    setFieldNumber(currentIndex);
    setFields(tempArray);
  }, []);

  const addElement = (index: number, obj: models.AttributeField) => {
    const tempFields = [...attributes];
    const tempObj = { ...obj, valueId: '', attributeValue: '', id: `${obj.attributeType}_${fieldNumber}` };
    setFieldNumber(fieldNumber + 1);
    tempFields.splice(index + 1, 0, tempObj);
    const tempArray = tempFields.map((fieldObj: models.AttributeField) => {
      return { ...fieldObj };
    });
    setFields(tempArray);
  };

  return (
    <>
      <div className="opportunity-edit-form">
        <p className="stepone-title">{state.opportuntyDetails.editOportunity.groupName}</p>
        {attributes?.length ? <Form attributes={attributes} addElement={addElement} /> : null}
      </div>
    </>
  );
};

interface SelectProps {
  ids: string | undefined;
  description: string;
  attributeId: string;
  attributeType: string;
  options: models.UserDefinedFieldsValueDropDown | undefined;
  onSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selected?: string | undefined;
  error?: string;
}

const SelectItem: React.FC<SelectProps> = (props) => {
  const { ids, description, attributeId, attributeType, options, selected, onSelect, error } = props;
  const attributeValues = options
    ? options.data.find((obj: models.DropDownValues) => {
        return obj.attributeId === attributeId;
      })
    : null;
  return (
    <>
      <label htmlFor={attributeType} className="opp-label">
        {description}
      </label>
      <select className="form-control iptor-dd" id={ids} value={selected} onChange={onSelect}>
        <option disabled selected>
          Select {description}
        </option>
        {attributeValues?.values.map((obj: models.DropDownValue) => {
          return <option value={obj.valueField}>{obj.valueField}</option>;
        })}
      </select>
      <span className="form-hints">{error}</span>
    </>
  );
};

export default EditAttributes;

interface FormFields {
  attributes: models.AttributeFormField[];
  addElement: (index: number, obj: models.AttributeField) => void;
}

const Form: React.FC<FormFields> = ({ attributes, addElement }) => {
  const [fields, setFields] = React.useState<models.SaveAttributeFieldParam[]>([]);
  const [attributeValues, setAttributeValues] = React.useState<models.UserDefinedFieldsValueDropDown>();
  const dispatch: Dispatch<any> = useDispatch();

  React.useEffect(() => {
    const attributesWithValues = attributes.filter((obj: models.AttributeField) => {
      return obj.valuesExist === true;
    });
    getAllValuesForField(attributesWithValues);
  }, []);

  const getAllValuesForField = async (attributeTypes: models.AttributeField[]) => {
    const fieldValues = await AddOpportunityFields.getAllFieldsValues(attributeTypes);
    setAttributeValues(fieldValues);
  };
  const onDateChange = (value: string, dataObject: models.AttributeFormField) => {
    const { id } = dataObject;
    const obj = fields.find((element: models.SaveAttributeFieldParam) => element.id === id);

    if (obj) {
      const newArray = [...fields];
      const elementIndex = fields.findIndex((element: models.SaveAttributeFieldParam) => element.id === id);
      newArray[elementIndex].attributeValueD = value;
      setFields(newArray);
    } else if (dataObject.valueId) {
      const attribute: models.SaveAttributeFieldParam = {
        parentFile: 'SROMOPH',
        attributeType: dataObject.attributeType,
        attributeValueD: value,
        valueId: dataObject.valueId,
        id,
      };
      setFields([...fields, attribute]);
    } else {
      const attribute: models.SaveAttributeFieldParam = {
        parentFile: 'SROMOPH',
        attributeType: dataObject.attributeType,
        attributeValueD: value,
        id,
      };
      setFields([...fields, attribute]);
    }
  };

  const onCheckboxValueChange = (e: React.ChangeEvent<HTMLInputElement>, dataObject: models.AttributeFormField) => {
    const { id, checked } = e.currentTarget;
    let char = 'N';
    const obj = fields.find((element: models.SaveAttributeFieldParam) => element.id === id);

    if (checked) {
      char = 'Y';
    }

    if (obj) {
      const newArray = [...fields];
      const elementIndex = fields.findIndex((element: models.SaveAttributeFieldParam) => element.id === id);
      newArray[elementIndex].attributeValueB = char;
      setFields(newArray);
    } else if (dataObject.valueId) {
      const attribute: models.SaveAttributeFieldParam = {
        parentFile: 'SROMOPH',
        attributeType: dataObject.attributeType,
        attributeValueB: char,
        valueId: dataObject.valueId,
        id,
      };
      setFields([...fields, attribute]);
    } else {
      const attribute: models.SaveAttributeFieldParam = {
        parentFile: 'SROMOPH',
        attributeType: dataObject.attributeType,
        attributeValueB: char,
        valueId: dataObject.valueId,
        id,
      };
      setFields([...fields, attribute]);
    }
  };
  const onNextButtonClick = () => {
    dispatch(updateAllAtrributeValues(fields));
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, dataObject: models.AttributeFormField) => {
    const { id, value } = e.currentTarget;
    const obj = fields.find((element: models.SaveAttributeFieldParam) => element.id === id);

    const inputElement = document.getElementById(id) as HTMLInputElement;

    if (value.length && dataObject.valueFormat === 'N' && !value.match(regex)) {
      dataObject.error = i18n.t('numericFieldError');
      inputElement.style.border = '1px solid #ED2024';
    } else {
      dataObject.error = '';
      inputElement.style.border = '1px solid #DAE2E7';
    }

    if (obj) {
      const newArray = [...fields];
      const elementIndex = fields.findIndex((element: models.SaveAttributeFieldParam) => element.id === id);
      newArray[elementIndex].attributeValue = value;
      setFields(newArray);
    } else if (dataObject.valueId) {
      const attribute: models.SaveAttributeFieldParam = {
        parentFile: 'SROMOPH',
        attributeType: dataObject.attributeType,
        attributeValue: value,
        valueId: dataObject.valueId,
        id,
      };
      setFields([...fields, attribute]);
    } else {
      const attribute: models.SaveAttributeFieldParam = {
        parentFile: 'SROMOPH',
        attributeType: dataObject.attributeType,
        attributeValue: value,
        id,
      };
      setFields([...fields, attribute]);
    }
  };

  return (
    <>
      <form>
        {attributes?.length
          ? attributes.map((obj: models.AttributeFormField, index: number) => {
              let currentValue: any;
              const field = fields.find((valueObj) => valueObj.id === obj.id);
              if (field) {
                currentValue =
                  obj.valueFormat === 'D' ? field.attributeValueD : obj.valueFormat === 'B' ? field.attributeValueB : field.attributeValue;
              } else {
                currentValue = obj.attributeValue;
              }

              if (obj.valueFormatDesc === 'BOOLEAN') {
                return (
                  <div className="form-group oppty-form-elements">
                    <span className="checkbox-label">
                      {obj.description}
                      <label className="switch" htmlFor={obj.id}>
                        <input
                          type="checkbox"
                          id={obj.id}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheckboxValueChange(e, obj)}
                          checked={currentValue === 'Y'}
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
                    <DateInput onDateSelect={(value: string) => onDateChange(value, obj)} currentDate={currentValue} />
                    {obj.uniqueRecord === false ? (
                      <button type="button" onClick={() => addElement(index, obj)}>
                        Add
                      </button>
                    ) : null}
                  </div>
                );
              } else if (obj.valuesExist === true) {
                return (
                  <div className="form-group oppty-form-elements">
                    <SelectItem
                      description={obj.description}
                      attributeId={obj.attributeId}
                      ids={obj.id}
                      attributeType={obj.attributeType}
                      options={attributeValues}
                      selected={currentValue}
                      onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => onInputValueChange(e, obj)}
                    />
                    {obj.uniqueRecord === false ? (
                      <button type="button" onClick={() => addElement(index, obj)}>
                        Add
                      </button>
                    ) : null}
                  </div>
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
                      id={obj.id}
                      value={currentValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputValueChange(e, obj)}
                    />
                    <span className="form-hints">{obj?.error}</span>
                    {obj.uniqueRecord === false ? (
                      <button type="button" onClick={() => addElement(index, obj)}>
                        Add
                      </button>
                    ) : null}
                  </div>
                );
              }
            })
          : null}
      </form>
      <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
        <button type="button" className="stepone-next-btn done" onClick={onNextButtonClick}>
          Save
        </button>
      </div>
    </>
  );
};
