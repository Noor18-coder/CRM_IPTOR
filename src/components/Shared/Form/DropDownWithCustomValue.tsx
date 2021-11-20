/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import * as models from '../../../helpers/Api/models';

interface SelectProps {
  obj: models.AttributeFormField[];
  options: any;
  onSelect: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  addElement?: (data: models.AttributeFormField) => void;
  deleteElement?: (data: models.AttributeFormField) => void;
  error?: string;
}

const DropDownWithCustomValue: React.FC<SelectProps> = ({ obj, options, onSelect, addElement, deleteElement }) => {
  const attributeValues = options
    ? options.data.find((dropdownObj: models.DropDownValues) => {
        return dropdownObj.attributeId === obj[0].attributeId;
      })
    : null;

  return (
    <>
      <div className="adding-txt-field-container">
        {obj[0].uniqueRecord === false && addElement ? (
          <button type="button" className="btn btn-link add-txt-field" onClick={() => addElement(obj[0])}>
            + ADD
          </button>
        ) : null}
        {obj.map((fieldObj: models.AttributeFormField, index: number) => {
          if (index === 0) {
            return (
              <div className="form-group oppty-form-elements">
                <label htmlFor={obj[0].attributeType} className="opp-label">
                  {fieldObj.description}
                </label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`${obj[0].description}`}
                    id={fieldObj.id}
                    value={fieldObj.attributeValue}
                    onChange={onSelect}
                    list={`OPTIONS_${fieldObj.id}`}
                  />
                  <datalist id={`OPTIONS_${fieldObj.id}`}>
                    {attributeValues?.values.map((valueObj: models.DropDownValue) => {
                      const optionSelected = valueObj.valueField === obj[0].attributeValue;
                      return valueObj.fieldDescription ? (
                        <option value={valueObj.valueField} selected={optionSelected}>
                          {valueObj.valueField} - {valueObj.fieldDescription}
                        </option>
                      ) : (
                        <option value={valueObj.valueField} selected={optionSelected}>
                          {valueObj.valueField}
                        </option>
                      );
                    })}
                  </datalist>
                </div>
              </div>
            );
          } else {
            return (
              <div className="form-element-with-delete-button">
                <div className="form-group oppty-form-elements add-new-ipfield">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`${obj[0].description}`}
                    id={fieldObj.id}
                    value={fieldObj.attributeValue}
                    onChange={onSelect}
                    list={`OPTIONS_${fieldObj.id}`}
                  />
                  <datalist id={`OPTIONS_${fieldObj.id}`}>
                    {attributeValues?.values.map((valueObj: models.DropDownValue) => {
                      const optionSelected = valueObj.valueField === obj[0].attributeValue;
                      return valueObj.fieldDescription ? (
                        <option value={valueObj.valueField} selected={optionSelected}>
                          {valueObj.valueField} - {valueObj.fieldDescription}
                        </option>
                      ) : (
                        <option value={valueObj.valueField} selected={optionSelected}>
                          {valueObj.valueField}
                        </option>
                      );
                    })}
                  </datalist>
                </div>
                {/* onClick={() => deleteElement(fieldObj)} */}
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                {deleteElement && <button type="button" className="btn btn-link ip-delete-field" onClick={() => deleteElement(fieldObj)} />}
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default DropDownWithCustomValue;
