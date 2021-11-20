import { useSelector } from 'react-redux';
import { getCurrencySymbol, getQuarterOfYearFromDate } from '../../helpers/utilities/lib';
import { OpportunityListItem } from '../../helpers/Api/models';
// import ImageConfig from '../../config/ImageConfig';
import { AppState } from '../../store/store';
import { UsersData } from '../../store/Users/Types';

interface OppProps {
  opportunity: OpportunityListItem;
  name: string;
}

const OpportunityCard: React.FC<React.PropsWithChildren<OppProps>> = (props) => {
  const oppState: AppState = useSelector((appState: AppState) => appState);
  const usersData: UsersData = useSelector((state: AppState) => state.users);
  const {
    opportunity: { desc, opportunityId, name, stage, oppRecordType, endDate, forecastCategory, estValueSys, userId },
  } = props;

  const getName = (str: string) => {
    const userObj = usersData.users.find((obj) => obj.user === str);
    return userObj?.description;
  };

  const formatDealSizeValue = () => {
    const CurrencySymbol = oppState.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA
      ? getCurrencySymbol(oppState.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA)
      : '';
    const renderValue = `${CurrencySymbol} ${estValueSys}`;
    return renderValue;
  };

  return (
    <>
      <div className="d-flex justify-content-between title-row">
        <div className="lft-col">
          {desc}
          <span>
            {opportunityId} | {name}
          </span>
        </div>
        <div className="rgt-col">
          <span className="danger">{stage}</span>
        </div>
      </div>
      <div className="d-flex justify-content-between owner-row">
        <div className="lft-col">
          Record Type
          <span>{oppRecordType}</span>
        </div>
        <div className="rgt-col">
          Close Quarter
          <span>{getQuarterOfYearFromDate(`${endDate}`)}</span>
        </div>
      </div>

      <div className="d-flex justify-content-between qtr-details-row">
        <div className="lft-col">
          Owner
          <span>{getName(userId)}</span>
        </div>
        <div className="rgt-col">
          Forecast
          <span>{forecastCategory}</span>
        </div>
      </div>

      <div className="d-flex justify-content-between location-row">
        <div className="lft-col">{formatDealSizeValue()}</div>
        {/* Commented non-working button <div className="rgt-col">
          <img src={ImageConfig.NAV_MORE_DOTS} alt="More" title="More" />
        </div> */}
      </div>
    </>
  );
};

export default OpportunityCard;
