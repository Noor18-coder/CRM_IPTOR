import React from 'react';
import * as models from '../../helpers/Api/models';

interface BooleanInputs {
  obj: models.AttributeFormField;
  onValueChange: (object: models.AttributeFormField) => void;
}

const BooleanInput: React.FC<BooleanInputs> = ({ obj, onValueChange }) => {
  const onCheckboxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    obj.attributeValueB = checked;
    onValueChange(obj);
  };

  return (
    <>
      <div className="adding-txt-field-container">
        <div className="form-group oppty-form-elements">
          <span className="checkbox-label">
            {obj.description}
            <label className="switch" htmlFor={obj.id}>
              <input type="checkbox" tabIndex={0} checked={obj.attributeValue === 'Y'} id={obj.id} onChange={onCheckboxValueChange} />
              <span className="slider round">&nbsp;</span>
            </label>
          </span>
        </div>
      </div>
    </>
  );
};

export default BooleanInput;
