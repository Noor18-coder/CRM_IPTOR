import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Image} from 'react-bootstrap';
import ImageConfig from '../../../config/ImageConfig';
import _ from 'lodash';


import { useHistory } from 'react-router';
import { AppState } from "../../../store/store";
import { setOpportunityWindowActive } from '../../../store/AddOpportunity/Actions';

export interface Option {
    value: string;
    selectParam: string;
}

const initialFilter = {
    value: '',
    selectParam: ''
}

export interface SelectOptionMethod {
    value: string;
    selectParam: string;
    handler:string;
}

interface Props {
    filters: Option[],
    selectOption: (key: SelectOptionMethod) => void,
    selected?: Option,
    component?: string
}

interface MenuItemPRops {
    obj: Option,
    selected?: Option,
    onSelect: (key: Option) => void,
}

const MenuItem: React.FC<MenuItemPRops> = ({ obj, selected, onSelect }) => {
    const classes = 'btn ' + (obj.value === selected?.value ? 'btn-active' : '');
    return (
        <button className={classes} onClick={() => onSelect(obj)}>{obj.value}</button>
    )
};

export const Menu = (list: Option[], selectOption: any, selected?: Option) => {
    const updatedList = [...new Map(list.map(item => [JSON.stringify(item), item])).values()];
    return updatedList.map(el => {
        return <MenuItem obj={el} key={el.value} selected={selected} onSelect={selectOption} />;
    });
}

interface ArrowProps {
    text: string,
    className: string
}

const Arrow: React.FC<ArrowProps> = ({ text, className }) => {
    return (
        <div className={className}>{text}</div>
    );
};

const ArrowLeft = Arrow({ text: '', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '', className: 'arrow-next' });


export const GridFilter:React.FC<Props> = ({filters, selectOption, selected = initialFilter, component}) => {
    const state:AppState = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();
    const [handler, setHandler] = React.useState<string>('all');
    const [selectedFilter, setFilter] = React.useState<Option>(selected);

    const selectFilter = (obj:Option) => {
        setFilter(obj);
        const params = {...obj, handler:handler};
        selectOption(params);
    }

    const handlerChange = (handler:string) => {
        setHandler(handler);
        const params = {...selected, handler:handler};
        selectOption(params);
    }

    const openCreateOpportunityForm = () => {
        if(component == 'opportunity')
            dispatch(setOpportunityWindowActive(true));
    }

    const menuItems = Menu(filters, selectFilter, selected);
    const classButton = 'app-btn switch-txt-btn';  
    const classButtonAll = classButton  + ('all' == handler? ' active' : '');
    const classButtonMy =  classButton + ('my' == handler? ' active' : '');

    return (
        <div className={"row s-header "}>
            <div className={"col filter-class"}>
                <div className={"d-lg-block d-none"} >
                    <div className={'row'}>
                        {component === 'opportunity' && 
                            <div className={'col-2'}>
                                <div className="toggle-btn-group">
                                    <button className={classButtonAll} onClick={() => handlerChange('all')}>ALL</button>
                                    <button className={classButtonMy} onClick={() => handlerChange('my')}>MY</button>
                                </div>
                            </div>
                        }
                        
                        <div className={component === 'opportunity' ? 'col-10' : 'col-9'}>
                            <ScrollMenu
                                data={menuItems}
                                arrowLeft={ArrowLeft}
                                itemClass={'btn filter-items'}
                                itemClassActive={'btn-active'}
                                selected={selected.value}
                                arrowRight={ArrowRight}
                                menuClass="custom-menu"
                                translate={58.8688}
                            >
                            </ScrollMenu>
                        </div>
                    </div>
                </div>
                <div className={"d-lg-none d-block"} >
                    <div className={"row"}>
                        {component === 'opportunity' && 
                            <div className="col-12">
                                <div className=" toggle-btn-group">
                                    <button className={classButtonAll} onClick={() => handlerChange('all')}>ALL</button>
                                    <button className={'my-btn ' + classButtonMy} onClick={() => handlerChange('my')}>MY</button>
                                </div>
                            </div>
                        }
                        <div className={'col-12 add-btn'}>
                        <Image src={ImageConfig.ADD_ICON} onClick={openCreateOpportunityForm}/>
                            <ScrollMenu
                                data={menuItems}
                                arrowLeft={ArrowLeft}
                                itemClass={'btn filter-items'}
                                itemClassActive={'btn-active'}
                                selected={selected.value}
                                arrowRight={ArrowRight}
                                menuClass="custom-menu">
                            </ScrollMenu> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

