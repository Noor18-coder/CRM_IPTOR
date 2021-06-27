import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";
import { setOpportunityItems, setOpportunityLoader } from '../../store/AddOpportunity/Actions';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import ImageConfig from '../../config/ImageConfig';
import ItemsList from '../AddOpportunity/ItemsList';
import Item from '../../helpers/Api/Items';
import * as models from '../../helpers/Api/models';

interface Props {
    reloadOpportunityDetailsPage : () => void
}

const AddItem: React.FC<Props> = ({ reloadOpportunityDetailsPage }) => {
    const state: AppState = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();

    const [searchText, setSearchText] = React.useState<string>('');
    const [items, setItems] = React.useState<models.Item[]>();
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

    const onNextButtonClick = () => {
        const filterItems: models.Item[] = items?.filter((obj: models.Item) => selectedItems.indexOf(obj.item) > -1) || [];
        const opptyId = state.opportuntyDetails.opportunityDefaultParams.opportunityId;

        Promise.all(filterItems.map((item: models.Item) => {
            return AddOpportunityApi.addItem(opptyId, item.item, 1, item.stockingUnit);
        })).then((data) => {
            reloadOpportunityDetailsPage();
            return data;
        });

    }

    const fetchItems = async (searchstr: string) => {
        dispatch(setOpportunityLoader(true));
        const response = await Item.get(searchstr, 0, 50);
        if (response && response.control && response.control.total) {
            const data = await Item.get(searchstr, 0, response.control.total);
            setItems(data.data.items);
            dispatch(setOpportunityLoader(false));
        } else {
            setItems(response.data.items);
            dispatch(setOpportunityLoader(false));
        }

    }

    const onSelect = (item: string) => {
        if (selectedItems.indexOf(item) === -1) {
            setSelectedItems([...selectedItems, item])
        } else {
            const newArray = selectedItems.filter((itemObj) => { return itemObj !== item });
            setSelectedItems(newArray);
        }
    }

    const searchStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        const str = event.target.value;
        setSearchText(str);
        if (str.length == 0) {
            fetchItems('');
        }
    }

    const searchOpportunity = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key == 'Enter') {
            fetchItems(searchText);
        }

    }


    React.useEffect(() => {
        fetchItems('');
    }, []);


    return (
        <>

            <div className="opportunity-forms">
                <div className="">
                    <div className="steps-three-forms">
                        <div className="form-group oppty-form-elements">
                            <input type="text" className="form-control search-ipbox" placeholder="Search Item" onChange={searchStart} onKeyPress={searchOpportunity} />
                        </div>
                        {state.addOpportunity.loader ? <div>Loading Items</div> :
                            <div className="radiobtn-collection oppty-form-elements">
                                <p className="title">Select Product and Modules</p>

                                <div className="product-items-container">
                                    {
                                        items?.length ? <ItemsList items={items} doClick={onSelect} selected={selectedItems}></ItemsList> : <div>No Items Found</div>
                                    }
                                </div>
                            </div>}
                    </div>


                </div>
            </div>
            <div className="step-nextbtn-with-arrow stepsone-nxtbtn" onClick={onNextButtonClick}>
                <a className={selectedItems.length ? "stepone-next-btn done" : "stepone-next-btn inactive"}>Done</a>
            </div>


        </>
    )
}

export default AddItem;