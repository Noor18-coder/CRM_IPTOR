import { useSelector } from 'react-redux';
import { BusinessPartnerListItem } from '../../helpers/Api/models/Customer';
import { AppState } from '../../store/store';

interface OppProps {
  businesspartner: BusinessPartnerListItem;
  name?: string;
}

const BusinessPartnerCard: React.FC<React.PropsWithChildren<OppProps>> = (props) => {
  const state: AppState = useSelector((CustomerState: AppState) => CustomerState);
  const {
    businesspartner: { description, area, owner, industry, numberOfActiveOpportunities },
  } = props;

  const getUserName = (str: any) => {
    const userObj = state.users.users.find((obj) => obj.user === str);
    return userObj?.description ? userObj?.description : '--';
  };

  return (
    <>
      <div className="d-flex justify-content-between title-row">
        <div>
          <span className="customer-card-text">{description}</span>
          <p className="area-text">{area}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between owner-row">
        <div className="lft-col p-0">
          Owner <span className="customer-card-text">{getUserName(owner)}</span>
        </div>
        <div className="rgt-col">
          Industry <span className="customer-card-text">{industry}</span>
        </div>
      </div>
      <div className="d-flex justify-content-between location-row">
        <div className="lft-col p-0">
          <span className="display-inline"> Active Opp - </span>{' '}
          <span className="customer-card-text display-inline">{numberOfActiveOpportunities}</span>
        </div>
        {/* Commented non-working button <div className="rgt-col">
          <img src={ImageConfig.NAV_MORE_DOTS} alt="More" title="More" />
        </div> */}
      </div>
    </>
  );
};

export default BusinessPartnerCard;
