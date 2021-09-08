import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { BusinessPartnerListItem } from '../../helpers/Api/models/Customer';
import BusinessPartnerCard from './CustomerCard';
import Loader from '../Shared/Loader/Loader';

interface Result {
  items: BusinessPartnerListItem[];
  load: boolean;
}

interface Props {
  gridRowClicked: (data: any) => void;
  getDataRows: (start: number, sortString: string) => Promise<Result>;
  refresh: boolean;
}

const BusinessPartnerListMobile: React.FC<Props> = ({ getDataRows, refresh }) => {
  const [hasMoreRows, setHasMoreRows] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [businessPartners, setBusinesspartners] = React.useState<BusinessPartnerListItem[]>([]);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [listData, setlistData] = React.useState<boolean>(false);
  const history = useHistory();

  // To handle pagination.
  const observer = React.useRef<IntersectionObserver>();
  const lastBusinessPartnerElement = useCallback(
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

  const fetchBusinesspartners = async () => {
    const orderByString = '';
    const data: Result = await getDataRows(pageNumber * 20, orderByString);
    if (data.items.length === 0) setlistData(true);
    else setlistData(false);
    setBusinesspartners((prevBusinessPartners) => [...prevBusinessPartners, ...data.items]);
    setHasMoreRows(data.load);
    setLoader(false);
  };

  React.useEffect(() => {
    setHasMoreRows(false);
    fetchBusinesspartners();
  }, [pageNumber]);

  React.useEffect(() => {
    fetchBusinesspartners();
    setLoader(true);
  }, []);

  React.useEffect(() => {
    setHasMoreRows(false);
    setPageNumber(0);
    setBusinesspartners([]);
    fetchBusinesspartners();
  }, [refresh]);

  const openBusinessPartnerDetails = (obj: BusinessPartnerListItem) => {
    const custId = obj && obj.businessPartner ? obj.businessPartner : null;
    if (custId) {
      history.push({ pathname: '/cust-details', state: { custId } });
    }
  };

  return (
    <>
      <section className="mobile-cardview-list">
        {loader && <Loader />}
        {businessPartners.length > 0 &&
          businessPartners?.map((obj, index) => {
            if (index + 1 === businessPartners.length) {
              return (
                <div
                  className="card-section"
                  onClick={() => openBusinessPartnerDetails(obj)}
                  ref={lastBusinessPartnerElement}
                  onKeyDown={() => openBusinessPartnerDetails(obj)}
                  role="presentation">
                  <BusinessPartnerCard businesspartner={obj} />
                </div>
              );
            }
            return (
              <div
                className="card-section"
                onClick={() => openBusinessPartnerDetails(obj)}
                onKeyDown={() => openBusinessPartnerDetails(obj)}
                role="presentation">
                <BusinessPartnerCard businesspartner={obj} />
              </div>
            );
          })}
        {listData && <div className="mobile-text">No Records Found</div>}
      </section>
    </>
  );
};

export default BusinessPartnerListMobile;
