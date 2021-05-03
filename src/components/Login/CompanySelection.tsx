import React from 'react';
import { useSelector, shallowEqual, useDispatch, useStore } from "react-redux"
import { Col, Row, Container, Card, Image, Nav, Button } from 'react-bootstrap';
import './Shared/scss/index.scss';
import logo from '../../assets/images/iptor_logo.png';
import Company from './Shared/Company';
import LoginFooter from './Shared/LoginFooter';
import VectorImg from '../../assets/images/Vector.png';
import { CompanyInfoItem } from '../../helpers/Api/models';
import { AppState } from '../../store';
import {AuthState } from '../../store/Auth/Types';

const items:CompanyInfoItem[] = [
  {
      "companyCode": "CD",
      "companyShortName": "DEV116A CD",
      "name": "CRM; Development"
  },
  {
      "companyCode": "CP",
      "companyShortName": "DEV116A CP",
      "name": "CRM; Production"
  },
  {
      "companyCode": "CQ",
      "companyShortName": "DEV116A CQ",
      "name": "CRM; Quality control"
  },
  {
      "companyCode": "D1",
      "companyShortName": "DEV116A D1",
      "name": "Development, release 11.60 (1)"
  },
  {
      "companyCode": "D2",
      "companyShortName": "DEV116A D2",
      "name": "Development, release 11.60 (2)"
  },
  {
      "companyCode": "DV",
      "companyShortName": "DEV116A DV",
      "name": "Development, release 11.60"
  },
  {
      "companyCode": "MD",
      "companyShortName": "DEV116A DV",
      "name": "MDC/CDM Development 11.60"
  },
  {
      "companyCode": "PR",
      "companyShortName": "DEV116A PR",
      "name": "Production, release 11.60"
  },
  {
      "companyCode": "QC",
      "companyShortName": "DEV116A QC",
      "name": "Quality control, release 11.60"
  }
];


const CompanySelection:React.FC = () => {
    // const items:AuthState = useSelector(
    //     (state: AppState) => state.auth
    //  );

     const [currentState, setCurrentSelection] = React.useState<string>();

     const selectState = (key:string) => {
          setCurrentSelection(key);
      }

      React.useEffect(() => {
          if(currentState){
             
          }
      }, [currentState]);

     const doLogin = (str:string) =>{
         console.log(str);
     }

    return (
        <Container className="login-bg">
        <Row>
          <Col xl={12}>   
          <Image src={logo}  width={55} height={20}></Image>
          <h4 style={{ fontSize: '19px' }}>Hi jacek, Please select company</h4>
          <Card style={{ width: '20rem', border: '0' , marginTop:'60px', padding: '9px'}}>
          <Card.Body className={"middle-container"}>
            <Container className={"scrollable"}>
           
               { items.map((obj:CompanyInfoItem) => {console.log(obj.name); return <Company doClick={selectState} name={obj.name} companyCode={obj.companyCode} companyShortName={obj.companyShortName} />}) } 
            </Container>
            </Card.Body> 
            </Card>
            <Nav.Item className="back-to-login">
            <Image src={VectorImg} className={'backtologinimg'}  width={16} height={10}></Image>
              <Nav.Link href="#">Back to Login</Nav.Link>
            </Nav.Item>
            <LoginFooter></LoginFooter>
          </Col>  
        </Row>
      </Container>
    );
}

export default CompanySelection;