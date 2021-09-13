import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Popover, Image } from 'react-bootstrap';
import { isArray } from 'lodash';
import i18n from '../../i18n';
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
import Container from '../EditOpportunity/Container';
import ImageConfig from '../../config/ImageConfig';

import { getOpportunityDetails, openOpportunityForm, getOpportunityAttributes } from '../../store/OpportunityDetails/Actions';
import { getCurrencySymbol } from '../../helpers/utilities/lib';

export const OpportunityDetails: React.FC = (props: any) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 992 });

  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  // eslint-disable-next-line react/destructuring-assignment
  const opportunityId = props.location.state.oppid;

  const getName = (str: string) => {
    const userObj = state.users.users.find((obj) => obj.user === str);
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

  React.useEffect(() => {
    dispatch(getOpportunityDetails(opportunityId));
    dispatch(getOpportunityAttributes(opportunityId));
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
          data.push({ description: 'Opp Value', attributeValue: `${getEstimatedValue(basicInfo)}` });
          break;
        default:
          break;
      }
    });
    return data;
  };

  const getEstimatedValue = (basicInfo: models.OpportunityDetailsDefault) => {
    // eslint-disable-next-line max-len
    return `${
      state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA && getCurrencySymbol(state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA)
    } ${basicInfo?.estimatedValueSys}
    (${basicInfo.currency ? getCurrencySymbol(basicInfo.currency) : ''} ${basicInfo.estimatedValue ? basicInfo.estimatedValue : ''} )`;
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

  return (
    <>
      <Header page={1} />
      {state.opportuntyDetails.loader ? <Loader component="opportunity" /> : null}
      <section className="main-wrapper opportunity">
        <div className="container-fluid">
          <NavSection backToOpportunityList={backToOpportunityList} popover={popover} />
          {state.opportuntyDetails.opportunityDefaultParams ? <OpportunityInfo /> : null}
          {state.opportuntyDetails.opportunityDefaultParams ? <OpportunityInfoMobile /> : null}
          <section className="sec-info-accordion">
            {state.opportuntyDetails.opportunityDefaultParams ? (
              <InfoAccordion
                title="Basics"
                data={getBasicInfo(state.opportuntyDetails.opportunityDefaultParams)}
                openEditOpportunity={openOpportunityBasicEdit}
              />
            ) : null}
            {isDesktop && state.opportuntyDetails.attributes ? (
              <InfoAccordionGroups title="More Information" data={state.opportuntyDetails.attributes} openEditForm={openEditForm} />
            ) : null}
            {(isTablet || isMobile) && state.opportuntyDetails.attributes ? (
              <AccordianForMobileWithGroups title="More Information" data={state.opportuntyDetails.attributes} openEditForm={openEditForm} />
            ) : null}
            <ProductAccordian opportunityId={opportunityId} />
            <ContactAccordian opportunityId={opportunityId} />
          </section>
        </div>
      </section>
      <Footer />
      <Container />
    </>
  );
};
