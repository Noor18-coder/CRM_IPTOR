import React from 'react';
import { Image } from 'react-bootstrap';
import { CompanyInfoItem } from '../../../helpers/Api/models';
import VectorImg from '../../../assets/images/check_circle.svg';

export interface Props {
  companies: CompanyInfoItem[];
  doClick: (key: string) => void;
}

export const Company: React.FC<Props> = ({ companies, doClick }) => {
  return (
    <ul className="companys-list-item">
      {companies.map((obj) => {
        return (
          <li
            className="action-icon"
            key={obj.companyCode}
            onClick={() => doClick(obj.companyCode)}
            role="presentation"
            onKeyDown={() => doClick(obj.companyCode)}>
            <div className="company-container" key={obj.companyCode}>
              <div className="center">
                <div className="test">{obj.name}</div>
                <Image
                  className="company-selection-img"
                  style={{ display: obj.selected ? 'block' : 'none' }}
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
