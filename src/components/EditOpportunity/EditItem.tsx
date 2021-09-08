import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { Attributes } from '../../helpers/Api/Attributes';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';

import * as models from '../../helpers/Api/models';

const regex = /^-?\d+\.?\d*$/;

interface Props {
  reloadOpportunityDetailsPage: () => void;
}

interface ErrorMessages {
  [index: string]: string;
}

const EditItem: React.FC<Props> = ({ reloadOpportunityDetailsPage }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const [oldAttributeValues, setOldAtrributeValues] = React.useState<models.OpportunityDetailsGroupItem[]>([]);
  const [item, setItem] = React.useState<models.Product>();
  const [attributeFields, setAttributeFields] = React.useState<models.AttributeField[]>([]);
  const [errors, setErrorMessages] = React.useState<ErrorMessages>({});

  const [attributesSet, setAttributesSet] = React.useState<models.AttributeValueAndType[]>([]);

  const setValue = (e: React.FocusEvent<HTMLInputElement>) => {
    const elementIndex = attributesSet.findIndex((element: models.AttributeValueAndType) => element.attributeType === e.currentTarget.id);

    if (elementIndex === -1) {
      const attribute: models.AttributeValueAndType = { attributeType: e.currentTarget.id, attributeValue: e.currentTarget.value };
      setAttributesSet([...attributesSet, attribute]);
    } else {
      const newArray = [...attributesSet];
      newArray[elementIndex].attributeValue = e.currentTarget.value;
      setAttributesSet(newArray);
    }
  };

  const onNextButtonClick = () => {
    if (item) {
      Promise.all(
        attributesSet.map(async (obj: models.AttributeValueAndType) => {
          const find: models.OpportunityDetailsGroupItem | undefined = oldAttributeValues.find((val: models.OpportunityDetailsGroupItem) => {
            return val.attributeType === obj.attributeType;
          });
          if (find && find.valueId) {
            return Attributes.updateAttribute(find.attributeType, find.valueId, obj.attributeValue);
          }
          return await Attributes.addAttributes('SROMOPI', item.itemId, obj.attributeType, obj.attributeValue);
        })
      ).then((data) => {
        reloadOpportunityDetailsPage();
        return data;
      });
    }
  };

  const getFields = async () => {
    const fields = await Attributes.getAttributeTypes('SROMOPI');
    const tempObject = { ...errors };
    fields.forEach((obj: models.AttributeField) => {
      tempObject[obj.attributeType] = '';
    });
    setErrorMessages(tempObject);
    setAttributeFields(fields);
  };

  const getAttributeValues = async (itemId: string) => {
    const attributes: models.OpportunityDetailsGroupItem[] = await OpportunityDetailsApi.getProductDetails(itemId);
    setOldAtrributeValues(attributes);
  };

  React.useEffect(() => {
    getFields();
    const data: models.Product | null = state.opportuntyDetails.editOportunity.data ? state.opportuntyDetails.editOportunity.data : null;

    if (data) {
      setItem(data);
      getAttributeValues(data.itemId);
    }
  }, []);

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    const element = document.getElementById(id) as HTMLInputElement;
    const field = attributeFields.find((obj: models.AttributeField) => obj.attributeType === id);
    if (field && field.valueFormat === 'N' && value.length && !value.match(regex)) {
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
    <div className="add-contacts">
      <div className="opportunity-forms">
        <p className="stepone-title">Edit Product Information</p>

        <form>
          <div className="form-group oppty-form-elements">
            <label htmlFor="item" className="opp-label">
              Item ID
            </label>
            <input type="text" value={item?.item} className="form-control" disabled={false} />
          </div>
          <div className="form-group oppty-form-elements">
            <label htmlFor="description" className="opp-label">
              {item?.itemDescription}
            </label>
            <input type="text" value={item?.itemDescription} className="form-control" disabled={false} />
          </div>
          {attributeFields.length
            ? attributeFields.map((obj: models.AttributeField) => {
                let currentValue: string | '';
                const currentValueObj: any = attributesSet.find((valueObj) => valueObj.attributeType === obj.attributeType);
                if (currentValueObj) {
                  currentValue = currentValueObj.attributeValue;
                } else {
                  const value: models.OpportunityDetailsGroupItem | undefined = oldAttributeValues.find(
                    (valueObj) => valueObj.attributeType === obj.attributeType
                  );
                  currentValue = value && value.attributeValue ? value.attributeValue : '';
                }
                return obj.valuesExist === true ? null : (
                  <div className="form-group oppty-form-elements">
                    <label htmlFor={obj.attributeType} className="opp-label">
                      {obj.description}
                    </label>
                    <input
                      type="text"
                      value={currentValue}
                      className="form-control"
                      placeholder={obj.description}
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
        <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
          <button type="button" className="stepone-next-btn done" onClick={onNextButtonClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
