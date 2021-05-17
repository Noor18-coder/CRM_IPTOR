export interface Props {
    title : string ;
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
}

export const SubmitButton:React.FC<Props> = ({
    title,
    onClick
}) => {
    return(
        <button type="submit" className={"iptor-login-btn"} onClick={onClick}>
            {title}
        </button>
    )
}; 
