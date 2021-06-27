
import { useHistory } from 'react-router';
import { getCurrencySymbol, getQuarterOfYearFromDate } from '../../helpers/utilities/lib';
import { OpportunityListItem, UserItem, OpportunityFilterItem } from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';

interface OppProps {
    opportunity: OpportunityListItem;
    name: string
  }
  
  const OpportunityCard: React.FC<React.PropsWithChildren<OppProps>> = (props) => {
    const history = useHistory();
    return (
      <>
        <div className="d-flex justify-content-between title-row">
          <div className="lft-col">
            {props.opportunity.name}
            <span>
              {props.opportunity.opportunityId} | {props.opportunity.oppRecordType}
            </span>
          </div>
          <div className="rgt-col">
            <span className="danger">{props.opportunity.stage}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between owner-row">
          <div className="lft-col">
            Owner
                <span>
              {props.name}
            </span>
          </div>
          <div className="rgt-col">
            Deal Size
                <span className="danger">{getCurrencySymbol(props.opportunity.currency) + ' ' + props.opportunity.curValue}</span>
          </div>
        </div>
  
        <div className="d-flex justify-content-between qtr-details-row">
          <div className="lft-col">
            Close Quarter
                <span>
              {getQuarterOfYearFromDate(props.opportunity.endDate + '')}
            </span>
          </div>
          <div className="rgt-col">
            Forecast
                <span className="danger">Upside</span>
          </div>
        </div>
  
        <div className="d-flex justify-content-between location-row">
          <div className="lft-col">
            {props.opportunity.customer}
          </div>
          <div className="rgt-col">
            <img src={ImageConfig.NAV_MORE_DOTS} alt="More" title="More" />
          </div>
        </div>
      </>
    )
  }

  export default OpportunityCard;