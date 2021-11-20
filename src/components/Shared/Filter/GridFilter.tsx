import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { useMediaQuery } from 'react-responsive';

import { Image } from 'react-bootstrap';
import { setOpportunityWindowActive } from '../../../store/AddOpportunity/Actions';
import { setBusinessPartnerWindowActive } from '../../../store/AddCustomer/Actions';
import { saveOpptyHandlerChange } from '../../../store/Opportunity/Actions';
import ImageConfig from '../../../config/ImageConfig';

export interface Option {
  value: string;
  selectParam: string;
}

const initialFilter = {
  value: '',
  selectParam: '',
};

export interface SelectOptionMethod {
  value: string;
  selectParam: string;
  handler: string;
}

interface Props {
  filters: Option[];
  selectOption: (key: SelectOptionMethod) => void;
  selectHandler?: (handler: string) => void;
  selected?: Option;
  selectedHandler?: string;
  component?: string;
}

interface MenuItemPRops {
  obj: Option;
  selected?: Option;
  onSelect: (key: Option) => void;
}

const MenuItem: React.FC<MenuItemPRops> = ({ obj, selected, onSelect }) => {
  const classes = `btn ${obj.value === selected?.value ? 'btn-active' : ''}`;
  return (
    <button type="button" className={classes} onClick={() => onSelect(obj)}>
      {obj.value}
    </button>
  );
};

function Menu(list: Option[], selectOption: any, selected?: Option): JSX.Element[] {
  const updatedList = [...new Map(list.map((item) => [JSON.stringify(item), item])).values()];
  return updatedList.map((el) => <MenuItem obj={el} key={el.value} selected={selected} onSelect={selectOption} />);
}

interface ArrowProps {
  text: string;
  className: string;
}

const Arrow: React.FC<ArrowProps> = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: '', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '', className: 'arrow-next' });

export const GridFilter: React.FC<Props> = ({
  filters,
  selectOption,
  selectHandler,
  selected = initialFilter,
  selectedHandler = 'my',
  component,
}) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const dispatch: Dispatch<any> = useDispatch();
  const [handler, setHandler] = React.useState<string>(selectedHandler);

  const selectFilter = (obj: Option) => {
    const params = { ...obj, handler };
    selectOption(params);
  };

  const handlerChange = (user: string) => {
    setHandler(user);
    if (selectHandler) selectHandler(user);
    const params = { ...selected, handler: user };
    selectOption(params);
    dispatch(saveOpptyHandlerChange(true));
  };

  const openForm = () => {
    if (component === 'opportunity') dispatch(setOpportunityWindowActive(true));
    if (component === 'customer') dispatch(setBusinessPartnerWindowActive(true));
  };
  const menuItems = Menu(filters, selectFilter, selected);
  const classButton = 'app-btn switch-txt-btn';
  const classButtonAll = classButton + (handler === 'all' ? ' active' : '');
  const classButtonMy = classButton + (handler === 'my' ? ' active' : '');
  const classScrollMenu = component === 'opportunity' ? 'col-10' : 'col-11 customer-filter-container';

  return (
    <>
      {isDesktop ? (
        <div className="row s-header filterrow">
          {component === 'opportunity' && (
            <div className="col-2">
              <div className="toggle-btn-group">
                <button className={classButtonMy} type="button" onClick={() => handlerChange('my')}>
                  MY
                </button>
                <button className={classButtonAll} type="button" onClick={() => handlerChange('all')}>
                  ALL
                </button>
              </div>
            </div>
          )}

          <div className={classScrollMenu}>
            <ScrollMenu
              data={menuItems}
              arrowLeft={ArrowLeft}
              itemClass="btn filter-items"
              itemClassActive="btn-active"
              selected={selected.value}
              arrowRight={ArrowRight}
              menuClass="custom-menu"
              translate={5}
            />
          </div>
        </div>
      ) : (
        <div className="row s-header filterrow">
          <div className="mobFilterRow">
            <div>
              <div className="tabs-btn-row">
                {component === 'opportunity' && (
                  <div className=" toggle-btn-group">
                    <button className={`my-btn ${classButtonMy}`} type="button" onClick={() => handlerChange('my')}>
                      MY
                    </button>
                    <button className={classButtonAll} type="button" onClick={() => handlerChange('all')}>
                      ALL
                    </button>
                  </div>
                )}
                <Image src={ImageConfig.ADD_ICON} onClick={openForm} />
              </div>

              <div className="col-12 add-btn">
                <ScrollMenu
                  data={menuItems}
                  alignCenter
                  alignOnResize
                  itemClass="btn filter-items"
                  itemClassActive="btn-active"
                  selected={selected.value}
                  hideArrows
                  translate={5}
                  menuClass="custom-menu"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
