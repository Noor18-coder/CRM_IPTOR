
import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import OpportunityGridOptions from '../../../config/OpportunityGrid';
//import { Column } from './Column';
import { parseCommandLine } from 'typescript';

import Dots from '../../../assets/images/nav-more.svg';
import { RowClickedEvent } from 'ag-grid-community';

interface Props {
  rowData : any[], 
  openOpptyDetails:  (data:any) => void
}

const Grid:React.FC<Props> = ({rowData, openOpptyDetails}) => {

  const fields = OpportunityGridOptions;
  const headerClass = ['table-cell align-items-center'];

  const onGridSizeChanged = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  const staticArrayCellClass = ['table-cell', 'justify-content-center'];

  const imgDot = () =>  '<img class="nav-more-menu" src="' + Dots + '" alt="...">';

  const defaultColDef = {
    width: 100,
    headerComponentParams: {
        template:
            '<div class="ag-cell-label-container" role="presentation">' +
            '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
            '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
            '    <span  ref="eSortAsc" class="asc-icon"></span>' +
            '    <span ref="eSortDesc" class="desc-icon"></span>' +
            '  </div>' +
            '</div>'
    }
};

  const Column = (obj: any) => {
    const staticArrayCellClass = ['table-cell', 'justify-content-center'];

    return (
      <AgGridColumn
        field={obj.field}
        sortable={obj.sortable}
        headerName={obj.headerName}
        cellClass={staticArrayCellClass}
        cellRenderer={obj.cellRender}
      ></AgGridColumn>
    )
  }

  const gridRowClicked = (event:RowClickedEvent) => {
    openOpptyDetails(event.data);
  }

  return (
    <div className={"lists opportunity-list"}>
      <div className={"table-wrapper"}>
        <div className={"ag-theme-alpine"}>

          <AgGridReact
            defaultColDef={defaultColDef}
            headerHeight={60}
            rowHeight={60}
            domLayout={'autoHeight'}
            rowData={rowData}
            onRowClicked={gridRowClicked}
            suppressCellSelection={true}
            onGridSizeChanged={onGridSizeChanged}>
            {fields.map((obj) => { return Column(obj); })}
            <AgGridColumn
            cellRenderer={imgDot}
            width={30}
            suppressAutoSize={true}></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>

  );

};

export default Grid;