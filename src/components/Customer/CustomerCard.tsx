import { useHistory } from 'react-router';
import { BusinessPartnerListItem, BusinessPartnerFilterItem } from '../../helpers/Api/models/Customer';
import ImageConfig from '../../config/ImageConfig';

interface OppProps {
    businesspartner: BusinessPartnerListItem;
    name?: string
  }
  
const BusinessPartnerCard: React.FC<React.PropsWithChildren<OppProps>> = (props) => {
    return (
        <>
            <div className="d-flex justify-content-between title-row">
                <div>
                    <span className="customer-card-text">{props.businesspartner.description}</span>
                    <p>{props.businesspartner.area}</p>
                </div>
            </div>
            <div className="d-flex justify-content-between owner-row">
                <div className="lft-col p-0">
                    Owner <span className="customer-card-text">{props.businesspartner.owner}</span>
                </div>
                <div className="rgt-col">
                    Industry <span className="customer-card-text">{props.businesspartner.industry}</span>
                </div>
            </div>
            <div className="d-flex justify-content-between location-row">
                  <div className="lft-col p-0">
                    <span className="display-inline"> Active Opp - </span> <span className="customer-card-text display-inline">{props.businesspartner.numberOfActiveOpportunities}</span>
                  </div>
                  <div className="rgt-col">
                        <img src={ImageConfig.NAV_MORE_DOTS} alt="More" title="More" />
                  </div>
            </div>
      </>
    )
  }

export default BusinessPartnerCard;