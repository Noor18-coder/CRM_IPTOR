import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { OpportunityListItem, UserItem, OpportunityFilterItem } from '../../helpers/Api/models';
import { OpportunityState } from '../../store/Opportunity/Types';
import { AppState } from "../../store/store";
import { UsersData } from '../../store/Users/Types';
import OpportunityCard from './OpportunityCard';

interface Props {
  gridRowClicked: (data: any) => void;
  getDataRows: (start: number, sortString: string, filter?: OpportunityFilterItem) => Promise<result>
}

interface result {
  items: OpportunityListItem[],
  load: boolean
}


const OpportunityListMobile: React.FC<Props> = ({ gridRowClicked, getDataRows }) => {

  const state: OpportunityState = useSelector((state: AppState) => state.opportunities);
  const usersData: UsersData = useSelector((state: AppState) => state.users);

  const [hasMoreRows, setHasMoreRows] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [opportunities, setOpportunities] = React.useState<OpportunityListItem[]>([]);

  // To handle pagination. 
  const observer = React.useRef<IntersectionObserver>();
  const lastOpptyElement = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPageNumber(pageNumber + 1)
      }

    });
    if (node) observer.current.observe(node);

  }, [hasMoreRows]);

  React.useEffect(() => {
    setHasMoreRows(false);
    const fetchOpportunities = async () => {
      let orderByString = '';
      const data: result = await getDataRows(pageNumber * 20, orderByString);
      setOpportunities(prevOpportunites => [...prevOpportunites, ...data.items]);
      setHasMoreRows(data.load);
    };
    fetchOpportunities();
  }, [pageNumber]);


  React.useEffect(() => {
    const fetchOpportunities = async () => {
      let orderByString = '';
      const data: result = await getDataRows(pageNumber * 20, orderByString);
      setOpportunities(data.items);
      setHasMoreRows(data.load);
    };
    fetchOpportunities();

  }, []);


  const getName = (str: string) => {
    const userObj = usersData.users.find((obj) => obj.handler === str);
    const handlerName = userObj?.description ? userObj.description : str;
    return handlerName;
  }


  return (
    <>
      <section className="mobile-cardview-list">
        {opportunities?.map((obj, index) => {
          if (index + 1 === opportunities.length) {
            return <div  key={obj.opportunityId} className="card-section" ref={lastOpptyElement}><OpportunityCard opportunity={obj} name={getName(obj.handler)} /></div>
          } else {
            return <div key={obj.opportunityId} className="card-section"><OpportunityCard opportunity={obj} name={getName(obj.handler)} /></div>
          }
        })}
      </section>
    </>
  )
}


export default OpportunityListMobile;
