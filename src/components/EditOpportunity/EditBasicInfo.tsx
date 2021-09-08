import React from 'react';
import { useSelector } from 'react-redux';
import { get, pick, isArray } from 'lodash';
import { Image } from 'react-bootstrap';
import * as models from '../../helpers/Api/models';
import { AppState } from '../../store/store';
import i18n from '../../i18n';
import errorIcon from '../../assets/images/error.png';
import UserSearchField from '../Shared/Search/UserSearchField';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import { OpportunityDefaultFields } from '../../config/OpportunityDefaultFields';
import AsyncSearchInput from '../Shared/Search/AsyncSearchInput';
import CustomerList from '../../helpers/Api/CustomerList';
import DateInput from '../Shared/Picker/DateInput';

const regex = /^-?\d+\.?\d*$/;
interface Props {
  reloadOpportunityDetailsPage: () => void;
}

interface ErrorMessages {
  [index: string]: string;
}

const EditBasicInfo: React.FC<Props> = ({ reloadOpportunityDetailsPage }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const opportunityDetails: models.AddOpportunityDefaultParams = pick(state.opportuntyDetails.opportunityDefaultParams, [
    'opportunityId',
    'area',
    'handler',
    'reason',
    'endDate',
    'probability',
    'oppRecordType',
    'estimatedValue',
    'stage',
    'currency',
    'desc',
    'customer',
  ]);

  const [opportunity, setOpportunity] = React.useState<models.AddOpportunityDefaultParams>(opportunityDetails);
  const [fields, setOpportunityFields] = React.useState<models.AddOpportunityField[]>([]);
  const [errors, setErrorMessages] = React.useState<ErrorMessages>({});
  const [updateError, setUpdateError] = React.useState<string>('');

  React.useEffect(() => {
    setOpportunityFields(OpportunityDefaultFields);
    const tempObject = { ...errors };
    fields.forEach((obj: models.AddOpportunityField) => {
      tempObject[obj.attributeType] = '';
    });
    setErrorMessages(tempObject);
  }, []);

  const getValue = (key: any) => {
    return get(opportunity, key);
  };

  const getValues = (key: any) => {
    const results = get(state.enviornmentConfigs, key);
    let mapped: models.DropDownValue[];
    if (key === 'crmOpportunityTypes') {
      mapped = results.map((obj: models.OpportunityType) => {
        return {
          valueField: obj.oppRecordType,
          fieldDescription: obj.oppRecordType,
        };
      });
    } else if (key === 'currency') {
      mapped = results.map((obj: models.CurrencyItem) => {
        return {
          valueField: obj.currency,
          fieldDescription: obj.description,
        };
      });
    } else {
      mapped = results.map((obj: models.StageInfo) => {
        return {
          valueField: obj.salesStage,
          fieldDescription: obj.description,
        };
      });
    }
    return mapped;
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOpportunity({
      ...opportunity,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    const field = fields.find((obj: models.AddOpportunityField) => obj.attributeType === id);
    if (field && field.valueFormat === 'N' && !value.match(regex)) {
      setErrorMessages({
        ...errors,
        [id]: 'Please enter numeric value',
      });
    } else if (field && field.valueFormat === 'N') {
      setErrorMessages({
        ...errors,
        [id]: '',
      });
    }
  };

  const onDateChange = (id: any, key: string) => {
    setOpportunity({
      ...opportunity,
      [id]: key,
    });
  };

  const onNextButtonClick = async () => {
    const data: models.UpdateOpportunityResponse = await AddOpportunityApi.update(opportunity);
    if (data && data.error) {
      if (data.messages && isArray(data.messages) && data.messages[0] && data.messages[0].text) {
        setUpdateError(data.messages[0].text);
      } else {
        setUpdateError(i18n.t('commonErrorMessage'));
      }
    } else {
      reloadOpportunityDetailsPage();
    }
  };

  const searchCustomers = async (key: string) => {
    const data = await CustomerList.get(key, 20, 0);
    return data.data.items;
  };

  const onSearchItemSelect = async (data: any) => {
    const selectItem: models.BusinessPartnerListItem = data[0];
    setOpportunity({
      ...opportunity,
      customer: selectItem.businessPartner,
    });
  };

  const onHandlerChange = (user: models.UserItem[]) => {
    if (user && user.length) {
      setOpportunity({
        ...opportunity,
        handler: user[0].handler,
      });
    }
  };

  return (
    <>
      <div className="opportunity-edit-form">
        {updateError ? (
          <p className="error">
            <Image className="alert-icon" src={errorIcon} width={15} height={12} />
            &nbsp; {updateError}
          </p>
        ) : null}
        <form>
          {fields?.length
            ? fields.map((obj: models.AddOpportunityField) => {
                if (obj.attributeType === 'handler') {
                  return (
                    <div className="form-group oppty-form-elements">
                      <label htmlFor="owner" className="opp-label">
                        {obj.description}
                      </label>
                      <UserSearchField onChange={onHandlerChange} description="Owner" />
                    </div>
                  );
                }
                if (obj.asyncSearch) {
                  return (
                    <div className="form-group oppty-form-elements">
                      <label htmlFor="customer" className="opp-label">
                        {obj.description}
                      </label>
                      <AsyncSearchInput id="customer" onSearch={searchCustomers} onSearchItemSelect={onSearchItemSelect} />
                    </div>
                  );
                }
                if (obj.dateInput) {
                  return (
                    <div className="form-group oppty-form-elements">
                      <label htmlFor="endDate" className="opp-label">
                        {obj.description}
                      </label>
                      <DateInput onDateSelect={(value: string) => onDateChange(obj.attributeType, value)} />
                    </div>
                  );
                }
                if (obj.valuesExist) {
                  return (
                    <SelectItem
                      description={obj.description}
                      selected={getValue(obj.attributeType)}
                      attributeType={obj.attributeType}
                      options={getValues(obj.reduxKey)}
                      onSelect={onInputValueChange}
                      error={errors[obj.attributeType]}
                    />
                  );
                }
                return (
                  <div className="form-group oppty-form-elements">
                    <label htmlFor={obj.attributeType} className="opp-label">
                      {obj.description}
                    </label>
                    <input
                      type="text"
                      value={getValue(obj.attributeType)}
                      className="form-control"
                      placeholder={`${obj.description} : ${obj.valueFormat}`}
                      id={obj.attributeType}
                      onChange={onInputValueChange}
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
  attributeType: string;
  options: models.DropDownValue[];
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: string | undefined;
  error?: string;
}

const SelectItem: React.FC<SelectProps> = ({ description, attributeType, options, selected, onSelect, error }) => {
  return (
    <div className="form-group oppty-form-elements">
      <label htmlFor={attributeType} className="opp-label">
        {description}
      </label>
      <select className="form-control iptor-dd" id={attributeType} value={selected} onChange={onSelect}>
        <option disabled selected>
          Select {description}
        </option>
        {options.map((obj: models.DropDownValue) => {
          return <option value={obj.valueField}>{obj.valueField}</option>;
        })}
      </select>
      <span className="form-hints">{error}</span>
    </div>
  );
};

export default EditBasicInfo;
