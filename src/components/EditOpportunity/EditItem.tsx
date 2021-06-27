import React from 'react'
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";
import { Attributes } from '../../helpers/Api/Attributes';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';


import * as models from '../../helpers/Api/models';
interface Props {
    reloadOpportunityDetailsPage: () => void,
}

const EditItem:React.FC<Props> = ({reloadOpportunityDetailsPage}) => {
    const state: AppState = useSelector((state: AppState) => state);
    const [oldAttributeValues, setOldAtrributeValues] = React.useState<models.OpportunityDetailsGroupItem[]>([]);
    const [item, setItem] = React.useState<models.Product>();
    const [attributeFields, setAttributeFields] = React.useState<models.AttributeField[]>([]);

    const [attributesSet, setAttributesSet] = React.useState<models.AttributeValueAndType[]>([]);

    const setValue = (e: React.FocusEvent<HTMLInputElement>) => {
        const elementIndex = attributesSet.findIndex((element: models.AttributeValueAndType) => element.attributeType == e.currentTarget.id);

        if (elementIndex == -1) {
            const attribute: models.AttributeValueAndType = { attributeType: e.currentTarget.id, attributeValue: e.currentTarget.value };
            setAttributesSet([...attributesSet, attribute]);
        } else {
            let newArray = [...attributesSet];
            newArray[elementIndex].attributeValue = e.currentTarget.value;
            setAttributesSet(newArray);
        }
    }

    const onNextButtonClick = () => {
         if (item) {
            Promise.all(attributesSet.map(async (obj: models.AttributeValueAndType) => {
                const find:models.OpportunityDetailsGroupItem | undefined = oldAttributeValues.find((val:models.OpportunityDetailsGroupItem) => {return val.attributeType === obj.attributeType});
                if(find && find.valueId){
                    return Attributes.updateAttribute(find.attributeType, find.valueId, obj.attributeValue);
                }else{
                    const res = await Attributes.addAttributes('SROMOPI', item.itemId, obj.attributeType, obj.attributeValue);
                }
            })).then((data) => {
                reloadOpportunityDetailsPage();
                return data;
            });
         }
    }


    const getFields = async () => {
        const fields = await Attributes.getAttributeTypes('SROMOPI');
        setAttributeFields(fields);
    }

    const getAttributeValues = async (itemId:string) => {
        const attributes:models.OpportunityDetailsGroupItem[] = await OpportunityDetailsApi.getProductDetails(itemId);
        setOldAtrributeValues(attributes);
    }

    React.useEffect(() => {
        getFields();
        const data:models.Product | null = state.opportuntyDetails.editOportunity.data ? state.opportuntyDetails.editOportunity.data : null ;
        
        if(data){
            setItem(data);
            getAttributeValues(data.itemId);
        }

    }, []);

    return (
        <div className="add-contacts">
            <div className="opportunity-forms">
                <p className="stepone-title">Edit Product Information</p>

                <form>
                    <div className="form-group oppty-form-elements">
                        <label className="opp-label">Item ID</label>
                        <input type="text" value={item?.item} className="form-control" disabled={false} />
                    </div>
                    <div className="form-group oppty-form-elements">
                        <label className="opp-label">{item?.itemDescription}</label>
                        <input type="text" value={item?.itemDescription} className="form-control" disabled={false} />
                    </div>
                    {
                        attributeFields.length ?
                            attributeFields.map((obj: models.AttributeField) => {
                                let currentValue: string | '';
                                let currentValueObj: any = attributesSet.find((valueObj) => valueObj.attributeType === obj.attributeType);
                                if (currentValueObj) {
                                    currentValue = currentValueObj.attributeValue
                                } else {
                                    const value: models.OpportunityDetailsGroupItem | undefined = oldAttributeValues.find(valueObj => valueObj.attributeType === obj.attributeType);
                                    currentValue = value && value.attributeValue ? value.attributeValue : '';
                                }
                                return (obj.valuesExist === true ?
                                    null :
                                    <div className="form-group oppty-form-elements">
                                        <label className="opp-label">{obj.description}</label>
                                        <input type="text" value={currentValue} className="form-control" placeholder={obj.description} id={obj.attributeType} onChange={setValue} />
                                    </div>);
                            }) : null}
                </form>
                <div className="step-nextbtn-with-arrow stepsone-nxtbtn" onClick={onNextButtonClick}>
                    <a className="stepone-next-btn done">SAVE</a>
                </div>
            </div>
        </div>
    );

}


interface SelectProps {
    description: string;
    attributeId: string;
    attributeType: string;
    options: models.UserDefinedFieldsValueDropDown | undefined,
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    selected?: string | undefined
}

const SelectItem: React.FC<SelectProps> = ({ description, attributeId, attributeType, options, selected, onSelect }) => {
    console.log(selected);
    const attributeValues = options ? options.data.find((obj: models.DropDownValues) => { return obj.attributeId === attributeId }) : null;
    return (
        <div className="form-group oppty-form-elements">
            <label>{description}</label>
            <select className="form-control iptor-dd" id={attributeType} value={selected} onChange={onSelect}>
                <option disabled selected>Select {description}</option>
                {
                    (attributeValues?.values.map((obj: models.DropDownValue) => {
                        return <option value={obj.valueField}>{obj.valueField}</option>
                    })
                    )
                }
            </select>
        </div>
    );
}

export default EditItem;