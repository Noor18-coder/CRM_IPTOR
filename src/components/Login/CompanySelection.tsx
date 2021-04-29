import React from 'react';
import { Col, Row, Container, Card, Image, Nav } from 'react-bootstrap';
import './Shared/scss/index.scss';
import logo from '../../assets/images/iptor_logo.png';
import Company from './Shared/Company';
import {LoginCompanySelection}  from '../../helpers/Api/models/LoginCompanySelection';
import LoginFooter from './Shared/LoginFooter';
import VectorImg from '../../assets/images/Vector.png';


const CompanySelection:React.FC = () => {
    const arr:LoginCompanySelection[] = [
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
        }];

    return (
        <Container className="login-bg">
        <Row>
          <Col xl={12}>   
          <Image src={logo}  width={55} height={20}></Image>
          <h4 style={{ fontSize: '19px' }}>Hi jacek, Please select company</h4>
          <Card style={{ width: '20rem', border: '0' , marginTop:'60px', padding: '9px'}}>
          <Card.Body className={"middle-container"}>
            <Container className={"scrollable"}>
                {arr.map((obj:LoginCompanySelection) => {return <Company companyCode={obj.companyCode} companyShortName={obj.companyShortName} name={obj.name} />} )}
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