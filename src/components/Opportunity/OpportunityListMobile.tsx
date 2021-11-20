import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import _ from 'lodash';
import { OpportunityListItem, OpportunityFilterItem } from '../../helpers/Api/models';
import { AppState } from '../../store/store';
import OpportunityCard from './OpportunityCard';

interface Props {
  getDataRows: (start: number, sortString: string, filter?: OpportunityFilterItem) => Promise<Result>;
  refresh: boolean;
}

interface Result {
  items: OpportunityListItem[];
  load: boolean;
}

const OpportunityListMobile: React.FC<Props> = ({ getDataRows, refresh }) => {
  const state: AppState = useSelector((appState: AppState) => appState);

  const [hasMoreRows, setHasMoreRows] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [opportunities, setOpportunities] = React.useState<OpportunityListItem[]>([]);
  const history = useHistory();

  // To handle pagination.
  const observer = React.useRef<IntersectionObserver>();
  const lastOpptyElement = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMoreRows]
  );

  const fetchOpportunities = async () => {
    const orderByString = '';
    const data: Result = await getDataRows(pageNumber * 20, orderByString);
    setOpportunities((prevOpportunites) => [...prevOpportunites, ...data.items]);
    setHasMoreRows(data.load);
  };

  React.useEffect(() => {
    setHasMoreRows(false);
    fetchOpportunities();
  }, [pageNumber]);

  React.useEffect(() => {
    fetchOpportunities();
  }, []);

  React.useEffect(() => {
    setHasMoreRows(false);
    setPageNumber(0);
    setOpportunities([]);
    fetchOpportunities();
  }, [refresh]);

  const getName = (str: string) => {
    const userObj = state.users.users.find((obj) => obj.user === str);
    const handlerName = userObj?.description ? userObj.description : str;
    return handlerName;
  };

  const openOpptyDetails = (obj: OpportunityListItem) => {
    const opptyId = obj && obj.opportunityId;
    if (opptyId) {
      history.push({ pathname: '/opp-details', state: { oppid: opptyId } });
    }
  };

  const uOppts = _.uniqWith(opportunities, _.isEqual);
  return (
    <>
      <section className="mobile-cardview-list">
        {uOppts?.map((obj, index) => {
          if (index + 1 === uOppts.length) {
            return (
              <div role="presentation" key={obj.opportunityId} className="card-section" onClick={() => openOpptyDetails(obj)} ref={lastOpptyElement}>
                <OpportunityCard opportunity={obj} name={getName(obj.handler)} />
              </div>
            );
          }
          return (
            <div role="presentation" key={obj.opportunityId} className="card-section" onClick={() => openOpptyDetails(obj)}>
              <OpportunityCard opportunity={obj} name={getName(obj.handler)} />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default OpportunityListMobile;
