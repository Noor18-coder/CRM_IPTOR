import { Card } from 'react-bootstrap';
import { LoginCompanySelection } from '../../../helpers/Api/models/LoginCompanySelection';


const Company:React.FC<LoginCompanySelection> = ({
    companyCode,
    name,
    companyShortName
}) => {
    return(
        <div className={'company-card'}>
            <div className={'center'}>
                <div className={'text'}>{name}</div>
                <img />
            </div>
            
        </div>
    )
}; 

export default Company;