import React from 'react';
import * as models from '../../../helpers/Api/models';

interface SelectProps {
  obj: models.AttributeFormField[];
  options: any;
  onSelect: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  addElement: (obj: models.AttributeFormField) => void;
  deleteElement: (data: models.AttributeFormField) => void;
  error?: string;
}

const DropDown: React.FC<SelectProps> = ({ obj, options, onSelect, addElement, deleteElement, error }) => {
  const attributeValues = options
    ? options.data.find((dropdownObj: models.DropDownValues) => {
        return dropdownObj.attributeId === obj[0].attributeId;
      })
    : null;

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
                <label htmlFor={obj[0].attributeType} className="opp-label">
                  {fieldObj.description}
                </label>
                <select className="form-control iptor-dd" id={fieldObj.id} onChange={onSelect}>
                  {fieldObj.attributeValue === '' ? (
                    <option value="" selected>
                      Select {obj[0].description}
                    </option>
                  ) : (
                    <option value="">Select {obj[0].description}</option>
                  )}
                  {attributeValues?.values.map((valueObj: models.DropDownValue) => {
                    const optionSelected = valueObj.valueField === fieldObj.attributeValue;
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
                </select>
                <span className="form-hints">{error}</span>
              </div>
            );
          } else {
            return (
              <div className="form-element-with-delete-button">
                <div className="form-group oppty-form-elements add-new-ipfield">
                  <select className="form-control iptor-dd" id={fieldObj.id} onChange={onSelect}>
                    {fieldObj.attributeValue === '' ? (
                      <option value="" selected>
                        Select {obj[0].description}
                      </option>
                    ) : (
                      <option value="">Select {obj[0].description}</option>
                    )}
                    {attributeValues?.values.map((valueObj: models.DropDownValue) => {
                      const optionSelected = valueObj.valueField === fieldObj.attributeValue;
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
                  </select>
                </div>
                {/* onClick={() => deleteElement(fieldObj)} */}
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

export default DropDown;
