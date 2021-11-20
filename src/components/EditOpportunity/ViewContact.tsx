import React from 'react';
import { has, get, isArray } from 'lodash';
import { useSelector } from 'react-redux';
import * as models from '../../helpers/Api/models';
import { AppState } from '../../store/store';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import AddContactFields from '../../config/AddContactFields';
import { AttributeField } from '../../helpers/Api/models';

const ViewContact: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const contactAttributes = state.enviornmentConfigs.customerContactAttributes;
  const [contactAttributesValues, setcontactAttributes] = React.useState<models.CustomerDetailsContactsGroupItem>();

  React.useEffect(() => {
    const conatctData: models.ContactInfo | null = state.opportuntyDetails.editOportunity.data ? state.opportuntyDetails.editOportunity.data : null;
    CustomerDetailsApi.ViewContactDetails(conatctData?.contactDC).then((data) => {
      setcontactAttributes(data);
    });
  }, []);

  const getValues = (_attributeType: string) => {
    const objValue = get(contactAttributesValues, _attributeType, '');
    if (isArray(objValue)) {
      return Array.prototype.map
        .call(objValue, function csvFormat(csvobj) {
          return csvobj;
        })
        .join(',');
    } else {
      return objValue;
    }
  };

  return (
    <>
      <>
        <div className="add-contacts">
          <div className="contact-details">
            <div className="view-contact-contact-info">
              <>
                {contactAttributesValues
                  ? AddContactFields.map((field: models.DropDownValue) => {
                      const { valueField, fieldDescription } = field;
                      if (has(contactAttributesValues, valueField)) {
                        return <p>{`${fieldDescription}: ${get(contactAttributesValues, valueField, '')}`}</p>;
                      }
                      return null;
                    })
                  : null}
              </>
              <>
                {contactAttributesValues
                  ? contactAttributes.map((attributeField: AttributeField) => {
                      const { description, attributeType, valueFormat } = attributeField;
                      return (
                        <>
                          {valueFormat === 'B' ? (
                            <p>
                              <span className="checkbox-description">{description}:</span>
                              <span className="checkbox-label">
                                <label className="switch value-checkbox">
                                  <input type="checkbox" tabIndex={0} checked={getValues(attributeType) === true} />
                                  <span className="slider round disabled-checkbox">&nbsp;</span>
                                </label>
                              </span>
                            </p>
                          ) : (
                            <p>{`${description}: ${getValues(attributeType) ? getValues(attributeType) : '--'}`}</p>
                          )}
                        </>
                      );
                    })
                  : null}
              </>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ViewContact;
