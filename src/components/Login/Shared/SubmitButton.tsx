import {Button} from 'react-bootstrap';

export interface Props {
    title : string ;
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
}

const SubmitButton:React.FC<Props> = ({
    title,
    onClick
}) => {
    return(
        <Button  type="submit" className="btn-login" variant="primary" block onClick={onClick}>
            {title}
        </Button>
    )
}; 

export default SubmitButton;