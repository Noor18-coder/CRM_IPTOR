const filters = ['All', 'Rejected', 'Q4', 'Q2', 'Q3', 'Q1'];

interface Option {
    value:string;
    name:string;
    active:boolean;
}

interface Props {
    filters: Option[],
    selectOption: (key:string) => void
}


 const GridFilter:React.FC<Props> = ({filters ,selectOption}) => {
    return (
        <div className={"row s-header"}>
            <div className={"col"}>
                <div className={"navbar-filter"}>
                    <ul>
                        { filters.map((obj:Option, index:any) => {
                            const classes = 'btn ' + (obj.active === true ? 'btn-active' : '');
                            return (
                                <li key={obj.value}>    
                                    <button className={classes} onClick={() => selectOption(obj.value)}>{obj.name}</button>
                                </li>
                            );
                        })}

                        <li className={"contain-dropdown"}>
                            <button className={"btn"}>Stage</button>
                            <span className={"s-icon"}></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default GridFilter;