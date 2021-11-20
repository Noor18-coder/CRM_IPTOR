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

import {
  getOpportunityDetails,
  openOpportunityForm,
  getOpportunityAttributes,
  setEditOpportunityErrorMessage,
  resetOpportunityDetails,
  setOpportunityEditSuccess,
} from '../../store/OpportunityDetails/Actions';
import { getCurrencySymbol, getDateInFormat } from '../../helpers/utilities/lib';
import { AreaInfo } from '../../helpers/Api/models';

export const OpportunityDetails: React.FC<any> = (props: any) => {
  const isMobile = useMediaQuery({ maxWidth: 767.98 });
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

  const getArea = (str: string) => {
    const areaObj: AreaInfo | undefined = state.enviornmentConfigs.crmAreaInfo.find((obj: AreaInfo) => {
      return obj.area === str;
    });
    return areaObj && areaObj?.description ? areaObj?.description : '';
  };

  const popover = () => {
    return (
      <Popover id="popover-basic" className="tool-tip">
        <Popover.Content>
          <button type="button" className="link-assign-to" onClick={assignOpportunity}>
            <Image className="assign-to-image" src={ImageConfig.ASSIGN_TO} alt="Iptor" title="Iptor" />
            <span className="assign-to-text">Assign To</span>
          </button>
        </Popover.Content>
        {state.auth.user.role?.toLowerCase() === 'admin' ? (
          <Popover.Content>
            <button type="button" className="link-assign-to" onClick={deleteOpportunity}>
              <Image className="popover-icon" src={ImageConfig.DELETE_ICON} alt="Iptor" title="Iptor" />
              <span className="text-link">Delete</span>
            </button>
          </Popover.Content>
        ) : null}
      </Popover>
    );
  };

  React.useEffect(() => {
    dispatch(resetOpportunityDetails());
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
        case 'userId':
          data.push({ description: 'Owner', attributeValue: value ? getName(value) : '' });
          break;
        case 'stage':
          data.push({ description: 'Stage', attributeValue: value });
          break;
        case 'currency':
          data.push({ description: 'Currency', attributeValue: value });
          break;
        case 'endDate':
          // eslint-disable-next-line no-case-declarations
          const datestr = getDateInFormat(new Date(value));
          data.push({ description: 'Close Date', attributeValue: datestr });
          break;
        case 'oppRecordType':
          data.push({ description: 'Opportunity Type', attributeValue: value });
          break;
        case 'estimatedValue':
          data.push({ description: 'Opp Value', attributeValue: `${getEstimatedValue(basicInfo)}` });
          break;
        case 'area':
          data.push({ description: 'Area', attributeValue: `${getArea(value)}` });
          break;
        case 'forecastCategory':
          data.push({ description: 'Forecast Category', attributeValue: value });
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
    } ${basicInfo.estimatedValueSys ? Math.round(basicInfo.estimatedValueSys) : ''}
    (${basicInfo.currency ? getCurrencySymbol(basicInfo.currency) : ''} ${basicInfo.estimatedValue ? Math.round(basicInfo.estimatedValue) : ''} )`;
  };

  const history = useHistory();
  const backToOpportunityList = () => {
    dispatch(resetOpportunityDetails());
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
        dispatch(setEditOpportunityErrorMessage(response.messages[0].text));
      } else {
        dispatch(setOpportunityEditSuccess({ success: true, error: i18n.t('opportunityDeletedSuccess') }));
        setTimeout(() => {
          backToOpportunityList();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const assignOpportunity = () => {
    document.body.classList.add('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: true, groupName: 'assign_opportunity', action: 'edit' }));
  };

  const hideErrorMessage = () => {
    dispatch(setEditOpportunityErrorMessage(''));
  };

  return (
    <>
      <Header page={1} />
      {state.opportuntyDetails.loader ? <Loader component="opportunity" /> : null}
      <section className="main-wrapper opportunity">
        {(state.opportuntyDetails.editOportunity.open === false && state.opportuntyDetails.editOportunity.error) ||
        (state.opportuntyDetails.editOportunity.success && state.opportuntyDetails.editOportunity.error !== '') ? (
          <div className="iptor-alert">
            <div className="alert-wrapper">
              <div role="alert" className="alert alert-danger">
                <button className="btn alert-close" type="button" onClick={hideErrorMessage}>
                  <img src={ImageConfig.CLOSE_BTN} alt="close" />
                </button>
                {`${state.opportuntyDetails.editOportunity.error}`}
              </div>
            </div>
          </div>
        ) : null}
        <div className="container-fluid">
          <NavSection backToOpportunityList={backToOpportunityList} popover={popover} />
          {state.opportuntyDetails.opportunityDefaultParams.opportunityId ? (
            <>
              <OpportunityInfo />
              <OpportunityInfoMobile popover={popover} />
              <section className="sec-info-accordion">
                <InfoAccordion
                  title="Basics"
                  data={getBasicInfo(state.opportuntyDetails.opportunityDefaultParams)}
                  openEditOpportunity={openOpportunityBasicEdit}
                />

                {isDesktop ? (
                  <InfoAccordionGroups
                    title="More Information"
                    openEditForm={openEditForm}
                    oppType={state.opportuntyDetails.opportunityDefaultParams.oppRecordType}
                  />
                ) : null}
                {isTablet || isMobile ? (
                  <AccordianForMobileWithGroups
                    title="More Information"
                    openEditForm={openEditForm}
                    oppType={state.opportuntyDetails.opportunityDefaultParams.oppRecordType}
                  />
                ) : null}
                <ProductAccordian opportunityId={opportunityId} />
                <ContactAccordian opportunityId={opportunityId} />
              </section>
            </>
          ) : null}
        </div>
      </section>
      <Footer />
      <Container />
    </>
  );
};
