import React from 'react';
import { Image } from 'react-bootstrap';
import { OpportunityType } from '../../helpers/Api/models';
import VectorImg from '../../assets/images/check_circle.svg';

export interface Props {
  opptyTypes: OpportunityType[];
  doClick: (key: string) => void;
  selected?: string;
}

export const OpportunityTypeList: React.FC<Props> = ({ opptyTypes, doClick, selected }) => {
  return (
    <ul className="opptytype-list-item">
      {opptyTypes.map((obj: OpportunityType) => {
        return (
          <li role="presentation" key={obj.description} onClick={() => doClick(obj.oppRecordType)}>
            <div className="company-container" key={obj.description}>
              <div className="center">
                <div className="test">{obj.oppRecordType}</div>
                <Image
                  className="company-selection-img"
                  style={{ display: obj.oppRecordType === selected ? 'block' : 'none' }}
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
