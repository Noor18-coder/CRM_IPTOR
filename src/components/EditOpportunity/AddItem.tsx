import React, { useCallback } from 'react';
import { Dispatch } from 'redux';
import { Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/store';
import { setOpportunityLoader } from '../../store/AddOpportunity/Actions';
import { addItemsToOpportunity } from '../../store/OpportunityDetails/Actions';
import Item from '../../helpers/Api/Items';
import * as models from '../../helpers/Api/models';

import { Constants } from '../../config/Constants';

import VectorImg from '../../assets/images/check_circle.svg';

const AddItem: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();

  const [searchText, setSearchText] = React.useState<string>('');
  const [items, setItems] = React.useState<models.Item[]>([]);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [hasMoreRows, setHasMoreRows] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(0);

  const onNextButtonClick = () => {
    const filterItems: models.Item[] = items?.filter((obj: models.Item) => selectedItems.indexOf(obj.item) > -1) || [];
    const opptyId = state.opportuntyDetails.opportunityDefaultParams.opportunityId;
    dispatch(addItemsToOpportunity(opptyId, filterItems));
  };

  const fetchItems = async (currentPage: number, searchstr: string) => {
    dispatch(setOpportunityLoader(true));
    setSelectedItems([]);
    try {
      const offSet = currentPage * Constants.ADD_OPPTY_PRODUCTS_LOAD_LIMIT;
      const response = await Item.get(searchstr, offSet, Constants.ADD_OPPTY_PRODUCTS_LOAD_LIMIT);
      let totalCount;

      if (response && response.data && response.data.items) {
        if (currentPage) {
          setItems((prevItems) => [...prevItems, ...response.data.items]);
        } else {
          setItems(response.data.items);
        }

        if (response.control && response.control.total) {
          totalCount = response.control.total;
        } else {
          totalCount = response.data?.items.length;
        }

        if (offSet + response.data?.items.length < totalCount) {
          setHasMoreRows(true);
        }
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      dispatch(setOpportunityLoader(false));
    }
  };

  const searchStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value;
    setSearchText(str);
    if (str.length === 0) {
      fetchItems(0, '');
    }
  };

  // To handle pagination.
  const observer = React.useRef<IntersectionObserver>();
  const lastOpptyElement = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMoreRows]
  );

  React.useEffect(() => {
    setHasMoreRows(false);
    fetchItems(pageNumber, searchText);
  }, [pageNumber]);

  const searchOpportunity = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setPageNumber(0);
      fetchItems(0, searchText);
    }
  };

  const onSelect = (item: string) => {
    if (selectedItems.indexOf(item) === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      const newArray = selectedItems.filter((itemObj) => {
        return itemObj !== item;
      });
      setSelectedItems(newArray);
    }
  };

  const isSelected = (item: string) => {
    let check = false;
    const find = selectedItems?.find((selectedItem: string) => {
      return selectedItem === item;
    });
    if (find?.length) {
      check = true;
    }
    return check;
  };

  return (
    <>
      <div className="opportunity-edit-form">
        <div className="steps-three-forms">
          <div className="opportunity-forms">
            <div className="">
              <div className="steps-three-forms">
                <div className="form-group oppty-form-elements">
                  <input
                    type="text"
                    className="form-control search-ipbox"
                    placeholder="Search Item"
                    onChange={searchStart}
                    onKeyPress={searchOpportunity}
                  />
                </div>

                <div className="radiobtn-collection oppty-form-elements">
                  <p className="title">Select Product and Modules</p>

                  <div className="product-items-container">
                    <ul className="opptytype-list-item">
                      {items.map((obj: models.Item, index: number) => {
                        if (index + 1 === items.length) {
                          return (
                            <li role="presentation" key={obj.item} ref={lastOpptyElement} onClick={() => onSelect(obj.item)}>
                              <div className="company-container">
                                <div className="center">
                                  <div className="test">{obj.description}</div>
                                  <Image
                                    className="company-selection-img"
                                    style={{ display: isSelected(obj.item) ? 'block' : 'none' }}
                                    src={VectorImg}
                                    alt="company"
                                    title="company"
                                  />
                                </div>
                              </div>
                            </li>
                          );
                        } else {
                          return (
                            <li role="presentation" key={obj.item} onClick={() => onSelect(obj.item)}>
                              <div className="company-container">
                                <div className="center">
                                  <div className="test">{obj.description}</div>
                                  <Image
                                    className="company-selection-img"
                                    style={{ display: isSelected(obj.item) ? 'block' : 'none' }}
                                    src={VectorImg}
                                    alt="company"
                                    title="company"
                                  />
                                </div>
                              </div>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
                <button type="button" className="stepone-next-btn done" onClick={onNextButtonClick}>
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
