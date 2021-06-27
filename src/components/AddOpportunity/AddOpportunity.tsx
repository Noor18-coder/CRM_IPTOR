import React from 'react';

import AddOpportunityUserDefinedFields from './AddOpportunityUserDefinedFields';
import AddOpportunityDefaultFields from './AddOpportunityDefaultFields';
import AddOpportunitySelectItems from './AddOpportunitySelectItems';
import ImageConfig from '../../config/ImageConfig';

const AddOpportunity = () => {
    const [step, setStep] = React.useState<number>(1);

    const  changeStep = (num:number) => {
        setStep(num);
    }

    return (
        <>
            <div className="sliding-panel-container">
                <div className="sliding-panel">
                    <div className="title-row">
                        <img src={ImageConfig.CHEVRON_LEFT} className="mob-steps-back" />
                    Add New Opportunity
                    <a className="panel-close-icon" href="#" >
                            <img src={ImageConfig.CLOSE_BTN} /></a>
                    </div>

                    <div className="all-opportunity-steps-container">
                    {step == 1 ? <AddOpportunityDefaultFields changeStep={changeStep} /> : null }
                    {step == 2 ? <AddOpportunityUserDefinedFields  changeStep={changeStep}  /> : null }
                    {step == 3 ? <AddOpportunitySelectItems changeStep={changeStep}  /> : null }
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default AddOpportunity;  