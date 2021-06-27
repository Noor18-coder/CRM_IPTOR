import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

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
    selected?: Option
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
    return list.map(el => {
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


export const GridFilter:React.FC<Props> = ({filters, selectOption, selected = initialFilter}) => {
   
    const [handler, setHandler] = React.useState<string>('all');
    const [selectedFilter, setFilter] = React.useState<Option>(selected);

    const selectFilter = (obj:Option) => {
        setFilter(obj);
        const params = {...obj, handler:handler};
        selectOption(params);
    }

    const handlerChange = (handler:string) => {
        setHandler(handler);
        const params = {...selectedFilter, handler:handler};
        selectOption(params);
    }

    const menuItems = Menu(filters, selectFilter, selected);
    const classButton = 'app-btn switch-txt-btn';  
    const classButtonAll = classButton  + ('all' == handler? ' active' : '');
    const classButtonMy =  classButton + ('my' == handler? ' active' : '');

    return (
        <div className={"row s-header"}>
            <div className={"col filter-class"}>
                <div className={"navbar-filter"}>
                    <div className=" toggle-btn-group">
                    <button className={classButtonAll} onClick={() => handlerChange('all')}>ALL</button>
                    <button className={classButtonMy} onClick={() => handlerChange('my')}>MY</button>
                    </div>
                    <ScrollMenu
                            data={menuItems}
                            arrowLeft={ArrowLeft}
                            itemClass={'btn filter-items'}
                            itemClassActive={'btn-active'}
                            arrowRight={ArrowRight}
                            menuClass="custom-menu">
                    </ScrollMenu> 
                </div>
            </div>
        </div>
      );
}
