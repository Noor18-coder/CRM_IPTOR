import React from 'react';
import { useSelector } from "react-redux"
import { Col, Row, Container, Card, Image, Nav, Button } from 'react-bootstrap';
import './Shared/scss/index.scss';
import logo from '../../assets/images/iptor_logo.png';
import {Company} from './Shared/Company';
import LoginFooter from './Shared/LoginFooter';
import VectorImg from '../../assets/images/Vector.png';
import { CompanyInfoItem, UserItem } from '../../helpers/Api/models';
import { AppState } from '../../store';

interface Props {
    selectCompany: (company: string) => void
}

const CompanySelection: React.FC<Props> = ({ selectCompany }) => {

    // Fetching companies list from the redux-store.
    const state: UserItem = useSelector(
        (state: AppState) => state.auth.user
    );

    // Assign the same list to local state variable.
    const [user, setsUser] = React.useState<any>(state.currentEnvironment);
    const [company, setCurrentCompany] = React.useState<string>();

    //
    const selectState = (key: string) => {
        if (key === company) {
            return;
        }
        
        const newList = user.map((item:CompanyInfoItem) => {
            if (item.companyCode === key || item.companyCode == company) {
                const updatedItem = {
                    ...item,
                    selected: !item.selected,
                };
                return updatedItem;
            }
            return item;
        });
        setsUser(newList);
        setCurrentCompany(key);
        selectCompany(key);
    }


    React.useEffect(() => {

    }, [company]);

    return (
        <Container className="login-bg">
            <Row>
                <Col xl={12}>
                    <Image src={logo} width={55} height={20}></Image>
                    <h4 style={{ fontSize: '19px' }}>Hi jacek, Please select company</h4>
                    <Card className="company-list">
                        <Card.Body className={"middle-container"}>
                            <Container className={"scrollable"}>
                                <Company companies={user} doClick={selectState} ></Company>
                            </Container>
                        </Card.Body>
                    </Card>
                    <Nav.Item className="back-to-login">
                        <Image src={VectorImg} className={'backtologinimg'} width={16} height={10}></Image>
                        <Nav.Link href="/">Back to Login</Nav.Link>
                    </Nav.Item>
                </Col>
            </Row>
            <LoginFooter></LoginFooter>
        </Container>
    );
}

export default CompanySelection;