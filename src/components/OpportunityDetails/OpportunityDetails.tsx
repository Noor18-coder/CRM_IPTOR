import React from 'react';
import { useMediaQuery } from 'react-responsive';

import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Popover, Image } from 'react-bootstrap';
import { isArray } from 'lodash';
import { AppState } from '../../store/store';

import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import { InfoAccordion, InfoAccordionGroups, AccordianForMobileWithGroups } from './InfoAccordion';
import { ContactAccordian } from './ContactDetails';
import { ProductAccordian } from './ProductDetails';
import OpportunityInfo from './OpportunityInfo';
import OpportunityInfoMobile from './OpportunityInfoMobile';
import * as models from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import { NavSection } from '../Shared/DetailsNav/NavSection';
import Loader from '../Shared/Loader/Loader';
import i18n from '../../i18n';
import Container from '../EditOpportunity/Container';
import ImageConfig from '../../config/ImageConfig';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import { setLoadingMask, removeLoadingMask } from '../../store/InitialConfiguration/Actions';
import { APPROVAL_STATUS } from '../../config/Constants';
import { saveOpportunityDetails, saveOpportunityAttributes, openOpportunityForm } from '../../store/OpportunityDetails/Actions';

export const OpportunityDetails: React.FC = (props: any) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 992 });

  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  // eslint-disable-next-line react/destructuring-assignment
  const opportunityId = props.location.state.oppid;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [defaultOpptyDetail, setDefaultOpptyDetails] = React.useState<models.OpportunityDetailsDefault>();
  const [opptyDataBasicGroup, setOpptyDataForBasicInfoGroup] = React.useState<models.OpportunityDetailsBasicInfo[]>();
  const [opptyDataMoreInfoGroup, setOpptyDataForMoreInfoGroup] = React.useState<models.AttributeValueObject[]>();
  const [opptyDataContactInfo, setOpptyDataContactInfo] = React.useState<models.OpportunityContact[]>([]);
  const [opptyDataProductInfo, setOpptyDataProductInfo] = React.useState<models.Product[]>([]);

  const getName = (str: string) => {
    const userObj = state.users.users.find((obj) => obj.handler === str);
    return userObj?.description ? userObj?.description : '';
  };

  const popover = () => {
    return (
      <Popover id="popover-basic" className="tool-tip">
        <Popover.Content>
          <button type="button" className="link-anchor-button" onClick={assignOpportunity}>
            Assign To <Image className="logout-image" height="15" src={ImageConfig.LOGOUT_ICON} alt="Iptor" title="Iptor" />
          </button>
        </Popover.Content>
        {state.auth.user.role?.toLowerCase() === 'admin' ? (
          <Popover.Content>
            <button type="button" className="link-anchor-button" onClick={deleteOpportunity}>
              Delete <Image className="logout-image" height="15" src={ImageConfig.LOGOUT_ICON} alt="Iptor" title="Iptor" />
            </button>
          </Popover.Content>
        ) : null}
      </Popover>
    );
  };

  const isOpportunityEditable = (opptyDetails: models.OpportunityDetailsDefault) => {
    // Only active opportunity is editable and its approval status is not either submitted or rejected.
    // Also, only admin and handler can edit the opportunity.
    if (
      opptyDetails.activ === true &&
      opptyDetails.approvalStatus !== APPROVAL_STATUS.SUBMITTED &&
      opptyDetails.approvalStatus !== APPROVAL_STATUS.REJECTED &&
      (state.auth.user.role?.toLowerCase() === 'admin' || state.auth.user.user === opptyDetails.handler)
    ) {
      dispatch(openOpportunityForm({ allowEdit: true }));
    } else {
      dispatch(openOpportunityForm({ allowEdit: false }));
    }
  };

  const fetchOpportunityDetails = async (opptyId: string) => {
    setLoading(true);
    dispatch(setLoadingMask());
    const opptyDetails: models.OpportunityDetailsDefault = await OpportunityDetailsApi.get(opptyId);
    setDefaultOpptyDetails(opptyDetails);
    isOpportunityEditable(opptyDetails);
    dispatch(saveOpportunityDetails(opptyDetails));
    getBasicInfo(opptyDetails);
    const attributeValues: models.AttributeValueObject[] = await OpportunityDetailsApi.getGroupInfo(opptyId);
    setOpptyDataForMoreInfoGroup(attributeValues);
    dispatch(saveOpportunityAttributes(attributeValues));
    const contactData = await OpportunityDetailsApi.getOpportunityContact(opptyId);
    setOpptyDataContactInfo(contactData);
    const opptyItems = await OpportunityDetailsApi.getOpportunityItems(opptyId);
    setOpptyDataProductInfo(opptyItems);

    dispatch(removeLoadingMask());
    setLoading(false);
  };

  React.useEffect(() => {
    fetchOpportunityDetails(opportunityId);
    dispatch(openOpportunityForm({ open: false }));
    document.body.classList.remove('body-scroll-hidden');
  }, []);

  const getBasicInfo = (basicInfo: models.OpportunityDetailsDefault) => {
    const data: models.OpportunityDetailsBasicInfo[] = [];

    Object.entries(basicInfo).forEach(([key, value]) => {
      switch (key) {
        case 'opportunityId':
          data.push({ description: 'Opp Number', attributeValue: value });
          break;
        case 'desc':
          data.push({ description: 'Opp Name', attributeValue: value });
          break;
        case 'handler':
          data.push({ description: 'Owner', attributeValue: value ? getName(value) : '' });
          break;
        case 'stage':
          data.push({ description: 'Stage', attributeValue: value });
          break;
        case 'currency':
          data.push({ description: 'Currency', attributeValue: value });
          break;
        case 'endDate':
          data.push({ description: 'Close Date', attributeValue: value });
          break;
        case 'oppRecordType':
          data.push({ description: 'Opportunity Type', attributeValue: value });
          break;
        case 'estimatedValue':
          data.push({ description: 'Opp Value', attributeValue: `${value}` });
          break;
        default:
          break;
      }
    });
    setOpptyDataForBasicInfoGroup(data);
  };

  const history = useHistory();
  const backToOpportunityList = () => {
    history.goBack();
  };

  const openEditForm = (groupName: string) => {
    document.body.classList.add('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: true, groupName, action: 'edit' }));
  };

  const openOpportunityBasicEdit = () => {
    document.body.classList.add('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: true, groupName: 'opportunity_defaults', action: 'edit' }));
  };

  const openAddContactForm = () => {
    document.body.classList.add('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: true, groupName: 'add_contact', action: 'edit' }));
  };

  const deleteOpportunity = async () => {
    try {
      const response: models.OpportunityDeleteResponse = await OpportunityDetailsApi.opportunityDelete(opportunityId);
      if (response && response.messages && isArray(response.messages) && response.messages[0] && response.messages[0].text) {
        alert(response.messages[0].text);
      } else {
        backToOpportunityList();
        alert(i18n.t('opportunityDeletedSuccess'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const assignOpportunity = () => {
    document.body.classList.add('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: true, groupName: 'assign_opportunity', action: 'edit' }));
  };

  const openAddItemForm = (action: string, data?: models.Product) => {
    if (action === 'delete_item') {
      const params: models.DeleteOpportunityItemParams = {
        parentId: opportunityId,
        itemId: data && data.itemId ? data.itemId : '',
      };
      OpportunityDetailsApi.deleteItem(params).then(() => {
        reloadOpportunity();
      });
    } else {
      document.body.classList.add('body-scroll-hidden');
      dispatch(openOpportunityForm({ open: true, groupName: action, data, action: 'edit' }));
    }
  };

  const deleteContact = (params: models.DeleteCustomerContactParams) => {
    AddOpportunityApi.deleteContact(params).then(() => {
      reloadOpportunity();
    });
  };

  const reloadOpportunity = () => {
    fetchOpportunityDetails(opportunityId);
  };

  return (
    <>
      <Header page={1} />
      {loading || state.opportuntyDetails.loader ? (
        <Loader component="opportunity" />
      ) : (
        <section className="main-wrapper opportunity">
          <div className="container-fluid">
            <NavSection backToOpportunityList={backToOpportunityList} popover={popover} />
            {defaultOpptyDetail ? <OpportunityInfo /> : null}
            {defaultOpptyDetail ? <OpportunityInfoMobile data={defaultOpptyDetail} reloadOpportunityDetailsPage={reloadOpportunity} /> : null}
            <section className="sec-info-accordion">
              {opptyDataBasicGroup?.length ? (
                <InfoAccordion title="Basics" data={opptyDataBasicGroup} openEditOpportunity={openOpportunityBasicEdit} />
              ) : null}
              {isDesktop && opptyDataMoreInfoGroup ? (
                <InfoAccordionGroups title="More Information" data={opptyDataMoreInfoGroup} openEditForm={openEditForm} />
              ) : null}
              {(isTablet || isMobile) && opptyDataMoreInfoGroup ? (
                <AccordianForMobileWithGroups title="More Information" data={opptyDataMoreInfoGroup} openEditForm={openEditForm} />
              ) : null}

              <ProductAccordian title="Products & Modules" data={opptyDataProductInfo} openAddItemForm={openAddItemForm} />
              <ContactAccordian title="Contacts" data={opptyDataContactInfo} openAddContactForm={openAddContactForm} deleteContact={deleteContact} />
            </section>
          </div>
        </section>
      )}
      <Footer />
      <Container reloadOpportunityDetailsPage={reloadOpportunity} />
    </>
  );
};
