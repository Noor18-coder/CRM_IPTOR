import * as React from "react"
import Grid from '../Shared/Grid/Grid';
import Header from '../Shared/Header/Header';
import GridFilter from '../Shared/Filter/GridFilter';
import '../../assets/styles/styles.scss';

const ShowTeams: React.FC = () => {

  const filters = [
    {
      value:'all',
      name:'All',
      active:true
    },
    {
      value:'one',
      name:'One',
      active:false
    },
    {
    value:'two',
    name:'Two',
    active:false
  },
  {
    value:'three',
    name:'Three',
    active:false
  },
  {
    value:'four',
    name:'Four',
    active:false
  }];

  const onGridSort = (key:String) => {

  }


  return (
    <div>
      <Header />
      <section className={"opprtunities"}>
        <div className={"container-fluid"}>

          <div className={"row s-header"}>
            <div className={"col col-md-4"}>
              <div className={"page-title"}>
                Opportunites
              </div>
            </div>
            
            <div className={"col col-md-4"}>
              <div className={"navbar-search-overlap"}>
                <form role="search">
                  <div className={"form-group"}>
                    <div className={"input-search"}>
                      <i className={"input-search-icon wb-search"} aria-hidden="true"></i>
                      <input type="text" className={"form-control"} name="site-search" placeholder="Search" />
                      <button type="button" className={"search-settings-button"}></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className={"col col-md-4 justify-content-end"}>
              <button className={"btn add-opportunity"} data-toggle="modal" data-target="#myModal2">+ New Opportunity</button>
            </div>
          </div>
        </div>
        <GridFilter filters={filters} selectOption={onGridSort} />
        <Grid />
      </section>
    </div>
  );
}

export default ShowTeams;