import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";

import ImageConfig from '../../config/ImageConfig';
import ItemsList from './ItemsList';
import { AddOpportunityDefaultParams } from '../../helpers/Api/models';
import Item from '../../helpers/Api/Items';
import * as models from '../../helpers/Api/models';
import { findIndex } from 'lodash';

interface Props {
    changeStep: (num: number) => void,
    createOpportunity: (items:string[]) => void
}

const AddOpportunitySelectItems: React.FC<Props> = ({ changeStep, createOpportunity}) => {
    const state: AppState = useSelector((state: AppState) => state);
    const [searchText, setSearchText] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [items, setItems] = React.useState<models.Item[]>();
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

    const onNextButtonClick = () => {
        createOpportunity(selectedItems);
    }

    const fetchItems = async (searchstr:string) => {
        setLoading(true);
        const data = await Item.get(searchstr, 0, 50);
        setItems(data.data.items);
        setLoading(false);
    }

    const onSelect = (item:string) => {
        if(selectedItems.indexOf(item) === -1 ) {
            setSelectedItems([...selectedItems, item])
        }else {
            const newArray = selectedItems.filter((itemObj) => {return itemObj !== item});
            setSelectedItems(newArray);
        }
    }

    const searchStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        const str = event.target.value;
        setSearchText(str);
        if(str.length == 0){
            fetchItems('');
        }
      }

    const searchOpportunity = (event:React.KeyboardEvent<HTMLInputElement>) => {
    
        if(event.key == 'Enter'){
            fetchItems(searchText);
        }
    
      }


    React.useEffect(() => {
        fetchItems('');
    }, []);


    return (
        <>
            <div className="opportunity-step-circles">
                <ul className="list-inline step-circles">
                    <li className="list-inline-item circle-stepone steps"><span className="num">1</span>
                        <span className="checked"><img src="../assets/images/steps-completed-check.svg" /></span></li>
                    <li className="list-inline-item circle-steptwo steps"><span className="num">2</span>
                        <span className="checked"><img src="../assets/images/steps-completed-check.svg" /></span></li>
                    <li className="list-inline-item circle-stepthree steps active"><span className="num">3</span>
                        <span className="checked"><img src="../assets/images/steps-completed-check.svg" /></span></li>
                </ul>
               
               
                <div className="steps-three-forms">
                   
                        <div className="form-group oppty-form-elements">
                            <input type="text" className="form-control search-ipbox" placeholder="Search Item" onChange={searchStart} onKeyPress={searchOpportunity} />
                        </div>

                        { loading ?  <div>Loading Items</div> : 
                        <div className="radiobtn-collection">
                            <p className="title">Select opportunity type</p>

                            <div className="opportunity-type-container">
                                { 
                                    items?.length ? <ItemsList items={items} doClick={onSelect} selected={selectedItems}></ItemsList> : <div>No Items Found</div>
                                } 
                            </div>
                        </div> }
                  
                </div>

                <div className="step-nextbtn-with-arrow stepsone-nxtbtn" onClick={ onNextButtonClick}>
                    <a className="stepone-next-btn">
                        Next <span className="right-whit-arrow"><img src={ImageConfig.CHEVRON_RIGHT_WHITE} /></span>
                    </a>
                </div>
            </div>
            
        </>
    )
}

export default AddOpportunitySelectItems;  