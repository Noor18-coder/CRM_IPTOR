import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import ImageConfig from '../../config/ImageConfig';
import * as models from '../../helpers/Api/models';
import { AppState } from "../../store/store";
import { get, map, partialRight, pick } from 'lodash'

import EditAttributes from './EditAttributes';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import { OpportunityDefaultFields } from '../../config/OpportunityDefaultFields';
import AsyncSearchInput from '../Shared/Search/AsyncSearchInput';
import CustomerList from '../../helpers/Api/CustomerList';
import DateInput from '../Shared/Picker/DateInput';

import { saveOpportunityDetails, saveOpportunityAttributes, openOpportunityForm } from '../../store/OpportunityDetails/Actions';


interface Props {
    reloadOpportunityDetailsPage: () => void
}
const EditBasicInfo: React.FC<Props> = ({ reloadOpportunityDetailsPage }) => {

    const state: AppState = useSelector((state: AppState) => state);
    const opportunityDetails: models.AddOpportunityDefaultParams = pick(state.opportuntyDetails.opportunityDefaultParams, ['opportunityId', 'area', 'handler', 'reason', 'endDate', 'probability', 'oppRecordType', 'estimatedValue', 'stage', 'currency', 'desc', 'customer']);
    const dispatch: Dispatch<any> = useDispatch();
    const [opportunity, setOpportunity] = React.useState<models.AddOpportunityDefaultParams>(opportunityDetails);
    const [fields, setOpportunityFields] = React.useState<models.AddOpportunityField[]>();

    const closeAction = () => {
        dispatch(openOpportunityForm({ open: false }))
    }

    React.useEffect(() => {

        setOpportunityFields(OpportunityDefaultFields);

    }, []);

    const onInputChange = () => { }

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
                    fieldDescription: obj.oppRecordType
                }
            });
        } else if (key == 'currency') {
            mapped = results.map((obj: models.CurrencyItem) => {
                return {
                    valueField: obj.currency,
                    fieldDescription: obj.description
                }
            });
        } else {
            mapped = results.map((obj: models.StageInfo) => {
                return {
                    valueField: obj.salesStage,
                    fieldDescription: obj.description
                }
            });
        }
        return mapped;
    }

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setOpportunity({
            ...opportunity,
            [e.currentTarget.id]: e.currentTarget.value,
        });

    };

    const onDateChange = (id: any, key: string) => {
        setOpportunity({
            ...opportunity,
            [id]: key
        });

    };

    const onNextButtonClick = async () => {
        const data = await AddOpportunityApi.update(opportunity);
        reloadOpportunityDetailsPage();
    }

    const searchCustomers = async (key: string) => {

        const data = await CustomerList.get(key, 20, 0);
        return data.data.items;
    }

    const onSearchItemSelect = async (data: any) => {
        const selectItem: models.BusinessPartnerListItem = data[0];
        setOpportunity({
            ...opportunity,
            customer: selectItem.businessPartner
        });
    }


    return (
        <>
           
                <div className="steps-one-forms">
                    <form>
                        {
                            fields?.length ?
                                fields.map((obj: models.AddOpportunityField) => {

                                    if (obj.asyncSearch) {
                                        return (
                                            <div className="form-group oppty-form-elements">
                                                <label className="opp-label">{obj.description}</label>
                                                <AsyncSearchInput onChange={onInputChange} onSearch={searchCustomers} onSearchItemSelect={onSearchItemSelect} />
                                            </div>
                                        )
                                    } else if (obj.dateInput) {
                                        return (
                                            <div className="form-group oppty-form-elements">
                                                <label className="opp-label">{obj.description}</label>
                                                <DateInput id={'endDate'} onDateSelect={(value: string) => onDateChange(obj.attributeType, value)} />
                                            </div>
                                        )

                                    } else if (obj.valuesExist) {
                                        return <SelectItem description={obj.description} selected={getValue(obj.attributeType)} attributeType={obj.attributeType} options={getValues(obj.reduxKey)} onSelect={onInputValueChange} />

                                    } else {
                                        return (
                                            <div className="form-group oppty-form-elements">
                                                <label className="opp-label">{obj.description}</label>
                                                <input type="text" value={getValue(obj.attributeType)} className="form-control" placeholder={obj.description + " : " + obj.valueFormat} id={obj.attributeType} onChange={onInputValueChange} />
                                            </div>
                                        )
                                    }
                                }) : null}
                    </form>
                </div>
                <div className="step-nextbtn-with-arrow stepsone-nxtbtn" onClick={onNextButtonClick}>
                    <a className="stepone-next-btn done">SAVE</a>
                </div>
            
        </>
    )
}



interface SelectProps {
    description: string;
    attributeType: string;
    options: models.DropDownValue[],
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    selected: string | undefined
}

const SelectItem: React.FC<SelectProps> = ({ description, attributeType, options, selected, onSelect }) => {
    return (
        <div className="form-group oppty-form-elements">
            <label>{description}</label>
            <select className="form-control iptor-dd" id={attributeType} value={selected} onChange={onSelect}>
                <option disabled selected>Select {description}</option>
                {
                    (options.map((obj: models.DropDownValue) => {
                        return <option value={obj.valueField}>{obj.valueField}</option>
                    })
                    )
                }
            </select>
        </div>
    );
}


export default EditBasicInfo;

