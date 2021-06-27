import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router';

import { AppState } from "../../store/store";
import { UsersData } from '../../store/Users/Types';

import { BusinessPartnerListItem, BusinessPartnerFilterItem } from '../../helpers/Api/models/Customer';
import { BusinessPartnerState } from '../../store/Customer/Types';
import BusinessPartnerCard from './CustomerCard';
import Loader from '../Shared/Loader/Loader'

interface result {
    items: BusinessPartnerListItem[],
    load: boolean
}

interface Props {
  gridRowClicked: (data: any) => void;
  getDataRows: (start: number, sortString: string) => Promise<result>,
  refresh:boolean;
}

const BusinessPartnerListMobile: React.FC<Props> = ({ gridRowClicked, getDataRows, refresh}) => {

  const state: BusinessPartnerState = useSelector((state: AppState) => state.businesspartners);
  const usersData: UsersData = useSelector((state: AppState) => state.users);

  const [hasMoreRows, setHasMoreRows] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [businessPartners, setBusinesspartners] = React.useState<BusinessPartnerListItem[]>([]);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [listData, setlistData] = React.useState<boolean>(false);


  // To handle pagination. 
  const observer = React.useRef<IntersectionObserver>();
  const lastBusinessPartnerElement = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPageNumber(pageNumber + 1)
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMoreRows]);

  const fetchBusinesspartners = async () => {
    let orderByString = '';
      const data: result = await getDataRows(pageNumber * 20, orderByString);
      if (data.items.length === 0)
          setlistData(true)
      else
          setlistData(false)
    setBusinesspartners(prevBusinessPartners => [...prevBusinessPartners, ...data.items]);
    setHasMoreRows(data.load);
    setLoader(false)
  };

  React.useEffect(() => {
    setHasMoreRows(false);
    fetchBusinesspartners();
  }, [pageNumber]);

  React.useEffect(() => {
      fetchBusinesspartners();
      setLoader(true)
  }, []);

  React.useEffect(() => {
    setHasMoreRows(false);
    setPageNumber(0);
    setBusinesspartners([]);
    fetchBusinesspartners();
  },[refresh]);

  const getName = (str: string) => {
    const userObj = usersData.users.find((obj) => obj.handler === str);
    const handlerName = userObj?.description ? userObj.description : str;
    return handlerName;
  }

  const openBusinessPartnerDetails = () => {}

  return (
    <>
      <section className="mobile-cardview-list">
        {loader && <Loader />}
        {businessPartners.length > 0 && businessPartners?.map((obj, index) => {
          if (index + 1 === businessPartners.length) {
              return <div className="card-section" onClick={() => openBusinessPartnerDetails()} ref={lastBusinessPartnerElement}>
                        <BusinessPartnerCard businesspartner={obj} />
                     </div>
          } else {
              return <div className="card-section" onClick={() => openBusinessPartnerDetails()} >
                        <BusinessPartnerCard businesspartner={obj} />
                     </div>
            }
        })}
        {listData && <div className="mobile-text">No Records Found</div>}
      </section>
    </>
  )
}

export default BusinessPartnerListMobile;
