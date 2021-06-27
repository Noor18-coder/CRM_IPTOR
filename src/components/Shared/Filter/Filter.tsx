const filters = ['All', 'Rejected', 'Q4', 'Q2', 'Q3', 'Q1'];

export interface Option {
    value:string;
    name:string;
    active:boolean;
}

interface Props {
    filters: string[],
    selectOption: (key:string) => void,
    selected:string
}


export const Filter:React.FC<Props> = ({filters ,selected, selectOption}) => {
    return (
        <div className={"row s-header"}>
            <div className={"col"}>
                <div className={"navbar-filter"}>
                    <ul>
                        { filters.map((obj:string, index:any) => {
                            const classes = 'btn ' + (obj === selected ? 'btn-active' : '');
                            return (
                                <li key={obj}>    
                                    <button className={classes} onClick={() => selectOption(obj)}>{obj}</button>
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