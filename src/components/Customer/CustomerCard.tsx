import { BusinessPartnerListItem } from '../../helpers/Api/models/Customer';
import ImageConfig from '../../config/ImageConfig';

interface OppProps {
  businesspartner: BusinessPartnerListItem;
  name?: string;
}

const BusinessPartnerCard: React.FC<React.PropsWithChildren<OppProps>> = (props) => {
  const {
    businesspartner: { description, area, owner, industry, numberOfActiveOpportunities },
  } = props;
  return (
    <>
      <div className="d-flex justify-content-between title-row">
        <div>
          <span className="customer-card-text">{description}</span>
          <p>{area}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between owner-row">
        <div className="lft-col p-0">
          Owner <span className="customer-card-text">{owner}</span>
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
        <div className="rgt-col">
          <img src={ImageConfig.NAV_MORE_DOTS} alt="More" title="More" />
        </div>
      </div>
    </>
  );
};

export default BusinessPartnerCard;
