import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { pick } from 'lodash';
import { Image } from 'react-bootstrap';
import VectorImg from '../../assets/images/check_circle.svg';
import { AppState } from '../../store/store';
import * as models from '../../helpers/Api/models';

import { editOpportunity } from '../../store/OpportunityDetails/Actions';
import { getReasonCodes } from '../../store/InitialConfiguration/Actions';
import { Reason } from '../../helpers/Api/models';

const DeactivateOpportunity: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [reasonsToDeactivateOppty, setReasons] = React.useState<models.Reason[]>();
  const [selectedReason, setSelecteReason] = React.useState<string>('');

  const onNextButtonClick = () => {
    const opportunityDetails: models.AddOpportunityDefaultParams = pick(state.opportuntyDetails.opportunityDefaultParams, ['opportunityId']);
    opportunityDetails.activ = false;
    opportunityDetails.reason = selectedReason;
    dispatch(editOpportunity(opportunityDetails));
  };

  const onSelect = (item: string) => {
    setSelecteReason(item);
  };

  React.useEffect(() => {
    if (state.enviornmentConfigs.reasons.length) {
      setReasons(state.enviornmentConfigs.reasons);
    } else {
      dispatch(getReasonCodes());
    }
  }, []);

  return (
    <>
      <div className="opportunity-edit-form">
        <div className="steps-three-forms">
          <div className="radiobtn-collection oppty-form-elements">
            <p className="title">Please select any one reason</p>

            <div className="opportunity-type-container">
              {reasonsToDeactivateOppty?.length ? (
                <ReasonsList list={reasonsToDeactivateOppty} onSelect={onSelect} selected={selectedReason} />
              ) : (
                <div>No Items Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
        <button type="button" className={selectedReason ? 'stepone-next-btn done' : 'stepone-next-btn inactive'} onClick={onNextButtonClick}>
          Done
        </button>
      </div>
    </>
  );
};

interface ReasonListProps {
  list: models.Reason[];
  onSelect: (key: string) => void;
  selected?: string;
}

export const ReasonsList: React.FC<ReasonListProps> = (props) => {
  const { list, selected, onSelect } = props;

  return (
    <ul className="opptytype-list-item">
      {list.map((obj: Reason) => {
        return (
          <li
            className="action-icon"
            key={obj.reasonCode}
            onClick={() => onSelect(obj.reasonCode)}
            role="presentation"
            onKeyDown={() => onSelect(obj.reasonCode)}>
            <div className="company-container" key={obj.reasonCode}>
              <div className="center">
                <div className="test">{obj.description}</div>
                <Image
                  className="company-selection-img"
                  style={{ display: obj.reasonCode === selected ? 'block' : 'none' }}
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

export default DeactivateOpportunity;
