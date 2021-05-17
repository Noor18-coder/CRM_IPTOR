import React from 'react';
import { CompanyInfoItem } from '../../../helpers/Api/models';
import VectorImg from '../../../assets/images/check_circle.svg';

interface Props {
    companies: CompanyInfoItem[],
    doClick: (key: string) => void
}

const Company: React.FC<Props> = ({
    companies,
    doClick
}) => {
    return (
        <ul style={{ margin: 0, padding: 0 }}>
            {
                companies.map((obj) => {
                    return (
                        <div className={'company-container'} onClick={() => doClick(obj.companyCode)} key={obj.companyCode}>
                            <div className={'center'}>
                                <div>{obj.name}</div>
                                <img className={'company-selection-img'} style={{ display: obj.selected ? 'block' : 'none' }} src={VectorImg}></img>
                            </div>
                        </div>
                    )
                })
            }
        </ul>
    )
};

export default Company;