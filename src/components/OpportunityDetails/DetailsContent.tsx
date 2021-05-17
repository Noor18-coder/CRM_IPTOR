import React from 'react'
import Container from 'react-bootstrap'
import Actions from './Actions'
import InfoAccordion from './InfoAccordion'
import Product from './Product'
import ProductMobile from './ProductMobile'
import Staging from './Staging'
import  {DetailsData} from '../../mocks/OpportunityDetails.mock';

export interface Data {

    data:DetailsData

}


const DetailsContent:React.FC<Data> = (props) => {
    return (
        // <!-- MAIN BODY CONTENT SECTION START -->
        <section className="main-wrapper opportunity">
        <div className="container-fluid">
            <Actions/>
            <Product data={props.data}/>
            <ProductMobile data={props.data}/>
            <Staging/>
            <InfoAccordion/>
        </div>
        </section>
        //   <!-- MAIN BODY CONTENT SECTION END -->
    )
}

export default DetailsContent
