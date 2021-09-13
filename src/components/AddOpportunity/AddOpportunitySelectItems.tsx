import React, { useCallback } from 'react';
import { Dispatch } from 'redux';
import { Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setOpportunityLoader } from '../../store/AddOpportunity/Actions';

import ImageConfig from '../../config/ImageConfig';
// import ItemsList from './ItemsList';
import Item from '../../helpers/Api/Items';
import * as models from '../../helpers/Api/models';
import { Constants } from '../../config/Constants';

import VectorImg from '../../assets/images/check_circle.svg';

interface Props {
  createOpportunity: (items: models.Item[]) => void;
}

const AddOpportunitySelectItems: React.FC<Props> = ({ createOpportunity }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const [searchText, setSearchText] = React.useState<string>('');
  const [items, setItems] = React.useState<models.Item[]>([]);
  const [selectedItems, setSelectedItems] = React.useState<models.Item[]>([]);
  const [hasMoreRows, setHasMoreRows] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(0);

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

  const onNextButtonClick = () => {
    createOpportunity(selectedItems);
  };

  const fetchItems = async (currentPage: number, searchstr: string) => {
    dispatch(setOpportunityLoader(true));
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

  const searchOpportunity = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setPageNumber(0);
      fetchItems(0, searchText);
    }
  };

  const onSelect = (str: string) => {
    const find: models.Item | undefined = selectedItems.find((item: models.Item) => {
      return item.item === str;
    });

    if (find) {
      const newArray = selectedItems.filter((itemObj: models.Item) => {
        return itemObj.item !== str;
      });
      setSelectedItems(newArray);
    } else {
      const newItem: models.Item | undefined = items.find((itemObj: models.Item) => {
        return itemObj.item === str;
      });
      if (newItem) setSelectedItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const isSelected = (item: string) => {
    let check = false;
    const find = selectedItems?.find((selectedItem: models.Item) => {
      return selectedItem.item === item;
    });
    if (find) {
      check = true;
    }
    return check;
  };

  return (
    <>
      <div className="opportunity-step-circles">
        <ul className="list-inline step-circles">
          <li className="list-inline-item circle-stepone steps active">
            <span className="num checked">1</span>
            <span>
              <img alt="steps" src={ImageConfig.STEP_CHECK_ICON} />
            </span>
          </li>
          <li className="list-inline-item circle-steptwo steps active">
            <span className="num checked">2</span>
            <span>
              <img alt="steps" src={ImageConfig.STEP_CHECK_ICON} />
            </span>
          </li>
          <li className="list-inline-item circle-stepthree steps active">
            <span className="num">3</span>
          </li>
        </ul>
      </div>

      <div className="opportunity-forms">
        <div className="selected-products">
          {selectedItems.map((item: models.Item) => {
            return (
              <button className="item-description" type="button" onClick={() => onSelect(item.item)}>
                {item.description}
              </button>
            );
          })}
        </div>
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
    </>
  );
};

export default AddOpportunitySelectItems;
