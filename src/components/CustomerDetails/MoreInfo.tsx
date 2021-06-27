import React from 'react';
import { Card, Accordion, Image } from 'react-bootstrap';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { OpportunityMoreInfoSection, OpportunityDetailsBasicInfo } from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import { setBusinessPartnerWindowActive, setBusinessPartnerWindowGroup } from '../../store/AddCustomer/Actions';

interface Props {
    title: string,
    data: OpportunityDetailsBasicInfo[]
}

export const MoreInfoAccordian: React.FC<OpportunityMoreInfoSection> = ({ title, data }) => {
    const keys = Object.keys(data);
    const [activeClass, setActiveClass] = React.useState("");

    const toggleAccordion = () => {
        setActiveClass(activeClass === "" ? "active" : "");
    }

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
                    {title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <>
                        {
                            keys.map((key: string) => {
                                return <DisplayGroup title={key} data={data[key]} />
                            })
                        }
                    </>

                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export const DisplayGroup: React.FC<Props> = ({ title, data }) => {
    const dispatch: Dispatch<any> = useDispatch();

    const toggleDrawer = (open: boolean, groupType: string) => (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
        dispatch(setBusinessPartnerWindowActive(true));
        dispatch(setBusinessPartnerWindowGroup(groupType));
    };

    return (
        <div className='more-info-group-container'>
            <div className='more-info-group-name'>
                <span>{title}</span>
                <span className="group-icon"><Image src={ImageConfig.EDIT_ICON} alt="Edit" title="Edit" onClick={toggleDrawer(true, title)} /></span>
            </div>
            <div className="accr-body-container">
                {data.map((obj: any) => {
                    return (
                        <ul className="list-inline bdy-list-item">
                            <li className="list-inline-item">
                                <span>{obj.description}</span>
                                {obj.attributeValue ? obj.attributeValue : "--"}
                            </li>
                        </ul>
                    )
                })
                }
            </div>
        </div>
    )
}


