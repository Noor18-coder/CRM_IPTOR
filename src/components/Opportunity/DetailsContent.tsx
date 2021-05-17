import React from 'react'
import Container from 'react-bootstrap'
import Actions from './Actions'
import InfoAccordion from './InfoAccordion'
import Product from './Product'
import ProductMobile from './ProductMobile'
import Staging from './Staging'
const DetailsContent = () => {
    return (
        // <!-- MAIN BODY CONTENT SECTION START -->
        <section className="main-wrapper opportunity">
        <div className="container-fluid">
            <Actions/>
            <Product/>
            <ProductMobile/>
            <Staging/>
            <InfoAccordion/>
        </div>
        </section>
        //   <!-- MAIN BODY CONTENT SECTION END -->
    )
}

export default DetailsContent
