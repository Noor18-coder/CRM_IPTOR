import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AddOpportunity from './AddOpportunity';


interface Props {
  open:boolean,
  onChange: (open: boolean) => void
}



const Container:React.FC<Props> = ({open, onChange}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  const isDesktop = useMediaQuery({ minWidth: 992 });

  const [isOpen, setState] = React.useState(true);

  const closeDrawer = (open:boolean) => (event:React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
    setState(false);
    onChange(false);
  };

  React.useEffect(() => {
    if(open){
      setState(true)
    }
  }, [open]);


  return (
        <React.Fragment>
         { isMobile || isTablet ? <AddOpportunity /> :  
          <Drawer anchor={'right'} open={isOpen} onClose={closeDrawer(false)}>
            <AddOpportunity />
          </Drawer> }
        </React.Fragment>

  );
}

export default Container;