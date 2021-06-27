import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";

import ImageConfig from '../../config/ImageConfig';
import { OpportunityType, UserDefinedField, UserDefinedFieldsValueDropDown, DropDownValues, DropDownValue, AddOpportunityDefaultParams, UserDefinedFieldReduxParams} from '../../helpers/Api/models';
import AddOpportunityFields from '../../helpers/Api/OpportunityUserDefinedFields';
import {saveOpportunityParams, saveOpportunityAttributes, setOpportunityLoader} from '../../store/AddOpportunity/Actions';
import DatePicker from '../Shared/Picker/DatePicker';

interface Props {
    changeStep: (num: number) => void
}

const AddOpportunityUserDefinedFields: React.FC<Props> = ({ changeStep }) => {
    const state: AppState = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();
     const [attributes, setAttributes] = React.useState<UserDefinedField[]>();
    const [attributeValues, setAttributeValues] = React.useState<UserDefinedFieldsValueDropDown>();
     const [opportunity, setOpportunityField] = React.useState<AddOpportunityDefaultParams>();
    const [attributesSet, setAttributesSet] = React.useState<UserDefinedFieldReduxParams[]>([]);
    const [mandatoryFields, setMandatoryFields] = React.useState<string[]>([]);

    React.useEffect(() => {
        const oppRecordType = state.addOpportunity.opportunityDefaultParams.oppRecordType || '';
       const part:UserDefinedFieldReduxParams = {  attributeType:"OPP_RECORD_TYPE",attributeValue:oppRecordType};
        setAttributesSet([part]);
        
        const selectedOpportunityRecordType = state.enviornmentConfigs.crmOpportunityTypes.find((obj: OpportunityType) => { return obj.description.toLowerCase() === oppRecordType?.toLowerCase() })
        const fields = selectedOpportunityRecordType?.MANDATORY_FIELDS || [];
        setMandatoryFields(fields);
        getAttributes(fields);
    }, []);

    const getAttributes = async (fields: string[]) => {
        dispatch(setOpportunityLoader(true));
        const attributes = await AddOpportunityFields.getAllFields(fields);
        attributes.sort(function (a, b) {
            return a.sequence - b.sequence;
        });
         const attributesWithValues = attributes.filter((obj: UserDefinedField) => { return obj.valuesExist === true })
        setAttributes(attributes);
        const attributeValues = await AddOpportunityFields.getAllFieldsValues(attributesWithValues);
        setAttributeValues(attributeValues);
        dispatch(setOpportunityLoader(false));
    }

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
         const elementIndex = attributesSet.findIndex((element:UserDefinedFieldReduxParams) => element.attributeType == e.currentTarget.id );
        
        if(elementIndex == -1) {
            const attribute:UserDefinedFieldReduxParams = { attributeType: e.currentTarget.id , attributeValue:e.currentTarget.value };
            setAttributesSet([...attributesSet, attribute]);
        }else{
            let newArray = [...attributesSet];
            newArray[elementIndex].attributeValue = e.currentTarget.value; 
            setAttributesSet(newArray);
        }
    };

    const setOpportunityDefaultParam = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        setOpportunityField({
            ...opportunity,
            [e.currentTarget.id]: e.currentTarget.value,
          });
     };

     const onDateChange = (key:string) => {
        setOpportunityField({
            ...opportunity,
            endDate:key
          });
     }
 
    const onNextButtonClick = () => {
        if(validate() && validateAttrubutes()){
            changeStep(3);
            dispatch(saveOpportunityParams(opportunity));
            dispatch(saveOpportunityAttributes(attributesSet));
        }else{
            alert("Please enter all mandatory fields.");
        }
        
    }

    const setValue = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const elementIndex = attributesSet.findIndex((element:UserDefinedFieldReduxParams) => element.attributeType == e.currentTarget.id );
        
        if(elementIndex == -1) {
            const attribute:UserDefinedFieldReduxParams = { attributeType: e.currentTarget.id , attributeValue:e.currentTarget.value };
            setAttributesSet([...attributesSet, attribute]);
        }else{
            let newArray = [...attributesSet];
            newArray[elementIndex].attributeValue = e.currentTarget.value; 
            setAttributesSet(newArray);
        }
    }

    const validate = () => {
        if(opportunity?.endDate && opportunity?.estimatedValue && opportunity?.currency){
            return true;
        }
        return false;
    }

    const validateAttrubutes = () => {
        let check = true;
        if(mandatoryFields.length !== attributesSet.length){
           return false;
        }
        mandatoryFields.forEach((field:string) => {
            
            const index = attributesSet.findIndex((obj:UserDefinedFieldReduxParams) => {return obj.attributeType === field});
            if(!attributesSet[index].attributeValue){
                check = false;
            }
        });
        return check;
    }



    return (
        <>
            <div className="opportunity-step-circles">
                <ul className="list-inline step-circles">
                    <li className="list-inline-item circle-stepone steps active"><span><img src={ImageConfig.STEP_CHECK_ICON}></img></span></li>
                    <li className="list-inline-item circle-steptwo steps active"><span className="num">2</span></li>
                    <li className="list-inline-item circle-stepthree steps"><span className="num">3</span></li>
                </ul>
            </div>
            <div className="opportunity-forms">
                <p className="stepone-title">Opportunity Details</p>
                
                <div className="">
                    <div className="steps-two-forms">
                    { state.addOpportunity.loader ? <div>Form is Loading</div> :
                        <>
                            <form>
                                <div className="form-group oppty-form-elements">
                                    <label className="opp-label">Opportunity Currency</label>
                                    <select className="form-control iptor-dd" id="currency" onChange={setOpportunityDefaultParam}>
                                        <option disabled selected>Select currency</option>
                                        <option value={'EUR'}>EUR</option>
                                        <option value={'SEK'}>SEK</option>
                                        <option value={'INR'}>INR</option>
                                        <option value={'USD'}>USD</option>
                                    </select>
                                </div>

                                <div className="form-group oppty-form-elements">
                                    <label className="opp-label">Total Deal Price</label>
                                    <input type="text" className="form-control" placeholder="Enter Total Deal Price" id="estimatedValue" onChange={setOpportunityDefaultParam} />
                                </div>

                                <div className="form-group oppty-form-elements">
                                    <label className="opp-label">Close Date</label>
                                     <DatePicker id={'endDate'} onDateSelect={onDateChange} />
                                </div>

                                {(attributes?.length) ?
                                    attributes.map((obj: UserDefinedField) => {
                                        if (obj.valuesExist === false) {
                                            return (<div className="form-group oppty-form-elements">
                                                <label className="opp-label">{obj.description}</label>
                                                <input type="text" className="form-control" placeholder={obj.description + " : " + obj.valueFormat} id={obj.attributeType}   onBlur={setValue}/>
                                            </div>)
                                        }
                                        if (obj.valuesExist) {
                                            return (
                                                <SelectItem description={obj.description} attributeId={obj.attributeId} attributeType={obj.attributeType} options={attributeValues} onSelect={onInputValueChange} />
                                            )
                                        }
                                    }) : null}
                            </form>
                            <div className="step-nextbtn-with-arrow stepsone-nxtbtn" onClick={ onNextButtonClick}>
                                <a className="stepone-next-btn">
                                    Next <span className="right-whit-arrow"><img src={ImageConfig.CHEVRON_RIGHT_WHITE} /></span>
                                </a>
                            </div> 
                        </> }
                    </div>
                </div>
               
               
            </div>
        </>
    )
}

interface SelectProps {
    description: string;
    attributeId: string;
    attributeType: string;
    options: UserDefinedFieldsValueDropDown | undefined, 
    onSelect: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => void
}

const SelectItem: React.FC<SelectProps> = ({ description, attributeId, attributeType, options, onSelect }) => {

    const attributeValues = options ? options.data.find((obj: DropDownValues) => { return obj.attributeId === attributeId }) : null;
    return (
        <div className="form-group oppty-form-elements">
            <label>{description}</label>
                <select className="form-control iptor-dd" id={attributeType} onChange={onSelect}>
                <option disabled selected>Select {description}</option>
                {
                    (attributeValues?.values.map((obj: DropDownValue) => {
                        return <option value={obj.valueField}>{obj.valueField}</option>
                    })
                    )
                }
            </select>
        </div>
    );
}

export default AddOpportunityUserDefinedFields;