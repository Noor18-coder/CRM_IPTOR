import React from 'react';
import { useSelector } from 'react-redux';
import { get, pick } from 'lodash';
import * as models from '../../helpers/Api/models';
import { AppState } from '../../store/store';

import UserSearchField from '../Shared/Search/UserSearchField';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import { OpportunityDefaultFields } from '../../config/OpportunityDefaultFields';
import AsyncSearchInput from '../Shared/Search/AsyncSearchInput';
import CustomerList from '../../helpers/Api/CustomerList';
import DateInput from '../Shared/Picker/DateInput';

interface Props {
  reloadOpportunityDetailsPage: () => void;
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
  const [fields, setOpportunityFields] = React.useState<models.AddOpportunityField[]>();

  React.useEffect(() => {
    setOpportunityFields(OpportunityDefaultFields);
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

  const onDateChange = (id: any, key: string) => {
    setOpportunity({
      ...opportunity,
      [id]: key,
    });
  };

  const onNextButtonClick = async () => {
    AddOpportunityApi.update(opportunity).then(() => {
      reloadOpportunityDetailsPage();
    });
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
                    />
                  </div>
                );
              })
            : null}
        </form>
      </div>
      <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
        <button type="button" className="stepone-next-btn done" onClick={onNextButtonClick}>
          Done
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
}

const SelectItem: React.FC<SelectProps> = ({ description, attributeType, options, selected, onSelect }) => {
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
    </div>
  );
};

export default EditBasicInfo;
