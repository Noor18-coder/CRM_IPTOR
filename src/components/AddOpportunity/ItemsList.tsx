import React from 'react';
import { Image } from 'react-bootstrap';
import { Item } from '../../helpers/Api/models';
import VectorImg from '../../assets/images/check_circle.svg';

export interface Props {
  items: Item[];
  doClick: (key: string) => void;
  selected?: string[];
}

const ItemsList: React.FC<Props> = ({ items, doClick, selected }) => {
  const isSelected = (item: string) => {
    let check = false;
    const find = selected?.find((selectedItem: string) => {
      return selectedItem === item;
    });
    if (find?.length) {
      check = true;
    }
    return check;
  };

  return (
    <ul className="opptytype-list-item">
      {items.map((obj: Item) => {
        return (
          <li role="presentation" key={obj.item} onClick={() => doClick(obj.item)}>
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
      })}
    </ul>
  );
};

export default ItemsList;
