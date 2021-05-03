import React from 'react';
import { Card } from 'react-bootstrap';
import { CompanyInfoItem } from '../../../helpers/Api/models';
import VectorImg from '../../../assets/images/check_circle.svg';

interface Props {
    companyCode:string,
    name:string,
    companyShortName:string,
    doClick: (key:string) => void
}



const Company:React.FC<Props> = ({
    companyCode,
    name,
    companyShortName,
    doClick
}) => {
    const [imgSelect, setVisibility] = React.useState(false);

    const clickHandler = () => {
        setVisibility(!imgSelect);
        doClick(companyCode);
    }

    return(
       <div className={'company-container'} onClick={clickHandler} key={companyCode}>
            <div className={'center'}>
                <div>{ name }</div>
                <img className={'imags'} style={{display : imgSelect ? 'block' : 'none'}} src={VectorImg}></img>
            </div>
        </div>
    )
}; 

export default Company;