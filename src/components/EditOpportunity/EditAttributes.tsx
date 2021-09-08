import React from 'react';
import { useSelector } from 'react-redux';

import * as models from '../../helpers/Api/models';
import { AppState } from '../../store/store';
import { AttributeField, AttributeValueAndType, AttributeValueObject, UpdateAttributeParams } from '../../helpers/Api/models';
import AddOpportunityFields from '../../helpers/Api/OpportunityUserDefinedFields';
import { Attributes } from '../../helpers/Api/Attributes';

const regex = /^-?\d+\.?\d*$/;

interface Props {
  reloadOpportunityDetailsPage: () => void;
}

interface ErrorMessages {
  [index: string]: string;
}

const EditAttributes: React.FC<Props> = ({ reloadOpportunityDetailsPage }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const [attributes, setFields] = React.useState<models.AttributeField[]>([]);
  const [attributeValues, setAttributeValues] = React.useState<models.UserDefinedFieldsValueDropDown>();
  const [attributesSet, setAttributesSet] = React.useState<AttributeValueAndType[]>([]);
  const [errors, setErrorMessages] = React.useState<ErrorMessages>({});

  const onInputValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const elementIndex = attributesSet.findIndex((element: AttributeValueAndType) => element.attributeType === e.currentTarget.id);

    if (elementIndex === -1) {
      const attribute: AttributeValueAndType = { attributeType: e.currentTarget.id, attributeValue: e.currentTarget.value };
      setAttributesSet([...attributesSet, attribute]);
    } else {
      const newArray = [...attributesSet];
      newArray[elementIndex].attributeValue = e.currentTarget.value;
      setAttributesSet(newArray);
    }
  };

  React.useEffect(() => {
    const fields = state.enviornmentConfigs.opportunityAttributes.filter((obj: models.AttributeField) => {
      return obj.group.toLowerCase() === state.opportuntyDetails.editOportunity.groupName;
    });
    const tempObject = { ...errors };
    fields.forEach((obj: models.AttributeField) => {
      tempObject[obj.attributeType] = '';
    });
    setErrorMessages(tempObject);
    const attributesWithValues = fields.filter((obj: models.AttributeField) => {
      return obj.valuesExist === true;
    });
    getAllValuesForField(attributesWithValues);
    setFields(fields);
  }, []);

  const getAllValuesForField = async (attributeTypes: AttributeField[]) => {
    const fieldValues = await AddOpportunityFields.getAllFieldsValues(attributeTypes);
    setAttributeValues(fieldValues);
  };

  const setValue = (e: React.FocusEvent<HTMLInputElement>) => {
    const elementIndex = attributesSet.findIndex((element: AttributeValueAndType) => element.attributeType === e.currentTarget.id);

    if (elementIndex === -1) {
      const attribute: AttributeValueAndType = { attributeType: e.currentTarget.id, attributeValue: e.currentTarget.value };
      setAttributesSet([...attributesSet, attribute]);
    } else {
      const newArray = [...attributesSet];
      newArray[elementIndex].attributeValue = e.currentTarget.value;
      setAttributesSet(newArray);
    }
  };

  const onNextButtonClick = () => {
    const attributesForUpdate: UpdateAttributeParams[] = [];
    const attributesForAdd: AttributeValueAndType[] = [];

    attributesSet.forEach((obj: AttributeValueAndType) => {
      const attributeExist = state.opportuntyDetails.attributes.find(
        (valueObj: AttributeValueObject) => valueObj.attributeType === obj.attributeType
      );

      if (attributeExist) {
        attributesForUpdate.push({ attributeType: obj.attributeType, attributeValue: obj.attributeValue, valueId: attributeExist.valueId });
      } else {
        attributesForAdd.push(obj);
      }
    });

    const opptyId = state.opportuntyDetails.opportunityDefaultParams.opportunityId;

    Promise.all(
      attributesForUpdate.map((obj: UpdateAttributeParams) => {
        return Attributes.updateAttribute(obj.attributeType, obj.valueId, obj.attributeValue);
      })
    ).then((data) => {
      reloadOpportunityDetailsPage();
      return data;
    });

    Promise.all(
      attributesForAdd.map((obj: AttributeValueAndType) => {
        return Attributes.addAttribute('opportunity', opptyId, obj.attributeType, obj.attributeValue);
      })
    ).then((data) => {
      reloadOpportunityDetailsPage();
      return data;
    });
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    const element = document.getElementById(id) as HTMLInputElement;
    const field = attributes.find((obj: models.AttributeField) => obj.attributeType === id);
    if (field && field.valueFormat === 'N' && !value.match(regex)) {
      setErrorMessages({
        ...errors,
        [id]: 'Please enter numeric value',
      });
      element.style.border = '1px solid #ED2024';
    } else if (field && field.valueFormat === 'N') {
      setErrorMessages({
        ...errors,
        [id]: '',
      });
      element.style.border = '1px solid #DAE2E7';
    }
  };

  return (
    <>
      <div className="opportunity-edit-form">
        <p className="stepone-title">{state.opportuntyDetails.editOportunity.groupName}</p>

        <form>
          {attributes?.length
            ? attributes.map((obj: models.AttributeField) => {
                let currentValue: string | '';
                const currentValueObj: any = attributesSet.find((valueObj) => valueObj.attributeType === obj.attributeType);
                if (currentValueObj) {
                  currentValue = currentValueObj.attributeValue;
                } else {
                  const value: AttributeValueObject | undefined = state.opportuntyDetails.attributes.find(
                    (valueObj) => valueObj.attributeType === obj.attributeType
                  );
                  currentValue = value && value.attributeValue ? value.attributeValue : '';
                }
                return obj.valuesExist === true ? (
                  <SelectItem
                    description={obj.description}
                    selected={currentValue}
                    attributeId={obj.attributeId}
                    attributeType={obj.attributeType}
                    options={attributeValues}
                    onSelect={onInputValueChange}
                    error={errors[obj.attributeType]}
                  />
                ) : (
                  <div className="form-group oppty-form-elements">
                    <label htmlFor={obj.attributeType} className="opp-label">
                      {obj.description}
                    </label>
                    <input
                      type="text"
                      value={currentValue}
                      className="form-control"
                      placeholder={`${obj.description}`}
                      id={obj.attributeType}
                      onChange={setValue}
                      onBlur={onBlur}
                    />
                    <span className="form-hints">{errors[obj.attributeType]}</span>
                  </div>
                );
              })
            : null}
        </form>
      </div>
      <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
        <button type="button" className="stepone-next-btn done" onClick={onNextButtonClick}>
          Save
        </button>
      </div>
    </>
  );
};

interface SelectProps {
  description: string;
  attributeId: string;
  attributeType: string;
  options: models.UserDefinedFieldsValueDropDown | undefined;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: string | undefined;
  error?: string;
}

const SelectItem: React.FC<SelectProps> = ({ description, attributeId, attributeType, options, selected, onSelect, error }) => {
  const attributeValues = options
    ? options.data.find((obj: models.DropDownValues) => {
        return obj.attributeId === attributeId;
      })
    : null;
  return (
    <div className="form-group oppty-form-elements">
      <label htmlFor={attributeType} className="opp-label">
        {description}
      </label>
      <select className="form-control iptor-dd" id={attributeType} value={selected} onChange={onSelect}>
        <option disabled selected>
          Select {description}
        </option>
        {attributeValues?.values.map((obj: models.DropDownValue) => {
          return <option value={obj.valueField}>{obj.valueField}</option>;
        })}
      </select>
      <span className="form-hints">{error}</span>
    </div>
  );
};

export default EditAttributes;
