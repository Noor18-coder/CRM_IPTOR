
import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { OpportunitiesList, Data, getFields } from '../../../mocks/opportunity_list.mocks';
//import { Column } from './Column';
import { parseCommandLine } from 'typescript';

import Dots from '../../../assets/images/nav-more.svg';

const Grid = () => {

  const rowClass = 'my_row';
  const fields = getFields();
  const rowData: Data[] = OpportunitiesList.getOpportunities(100);
  const headerClass = ['table-cell align-items-center'];

  const onGridSizeChanged = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  const staticArrayCellClass = ['table-cell', 'justify-content-center'];

  const imgDot = () =>  '<img class="nav-more-menu" src="' + Dots + '" alt="...">';

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

  return (
    <div className={"lists opportunity-list"}>
      <div className={"table-wrapper"}>
        <div className={"ag-theme-alpine"}>

          <AgGridReact
            headerHeight={60}
            rowHeight={60}
            domLayout={'autoHeight'}
            rowData={rowData}
            onGridSizeChanged={onGridSizeChanged}>
            {fields.map((obj) => { return Column(obj); })}
            <AgGridColumn
            cellRenderer={imgDot}
            width={60}
            suppressAutoSize={true}></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>

  );

};

export default Grid;