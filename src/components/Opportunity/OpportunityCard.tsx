
import { useHistory } from 'react-router';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { getCurrencySymbol, getQuarterOfYearFromDate } from '../../helpers/utilities/lib';
import { OpportunityListItem, UserItem, OpportunityFilterItem } from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import { AppState } from "../../store/store";
import { UsersData } from '../../store/Users/Types';

interface OppProps {
    opportunity: OpportunityListItem;
    name: string
  }
  
  const OpportunityCard: React.FC<React.PropsWithChildren<OppProps>> = (props) => {
    const usersData: UsersData = useSelector((state: AppState) => state.users);
    const history = useHistory();

    const getName = (str: string) => {
      const userObj = usersData.users.find((obj) => obj.handler === str);
      return userObj?.description;
    }

    const formatDealSizeValue = () => {
      let returnString:string = "";
      if(props.opportunity.currency){
        returnString = getCurrencySymbol(props.opportunity.currency) || ''
      }
      returnString = returnString +  props.opportunity.estValue;
      return returnString;
    }


    return (
      <>
        <div className="d-flex justify-content-between title-row">
          <div className="lft-col">
            {props.opportunity.desc}
            <span>
              {props.opportunity.opportunityId} | {props.opportunity.name}
            </span>
          </div>
          <div className="rgt-col">
            <span className="danger">{props.opportunity.stage}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between owner-row">
          <div className="lft-col">
            Record Type
                <span>
              {props.opportunity.oppRecordType}
            </span>
          </div>
          <div className="rgt-col">
           Close Quarter
            <span>
              {getQuarterOfYearFromDate(props.opportunity.endDate + '')}
            </span>
          </div>
        </div>
  
        <div className="d-flex justify-content-between qtr-details-row">
          <div className="lft-col">
              Owner
                <span>
               { getName(props.opportunity.handler)}
            </span>
          </div>
          <div className="rgt-col">
            Forecast
                <span className="danger"></span>
          </div>
        </div>
  
        <div className="d-flex justify-content-between location-row">
          <div className="lft-col">
            {formatDealSizeValue()}
          </div>
          <div className="rgt-col">
            <img src={ImageConfig.NAV_MORE_DOTS} alt="More" title="More" />
          </div>
        </div>
      </>
    )
  }

  export default OpportunityCard;