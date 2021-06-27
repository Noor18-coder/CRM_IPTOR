import React from 'react';
import { GridOptions, ColDef } from 'ag-grid-community';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { RowClickedEvent } from 'ag-grid-community';

import { OpportunityListItem, UserItem, OpportunityFilterItem } from '../../../helpers/Api/models';

import { useSelector, useDispatch } from "react-redux";
import { OpportunityState } from '../../../store/Opportunity/Types';
import { AppState } from "../../../store/store";
import { UsersData } from '../../../store/Users/Types';
import CustomNoRowsOverlay from '../Grid/customNoRowsOverlay'

interface result {
  items: OpportunityListItem[],
  load: boolean
}

interface Props {
  col: any;
  gridRowClicked: (data: any) => void;
  getDataRows: (start: number, sortString: string, filter?: OpportunityFilterItem) => Promise<result>,
  refresh:boolean
}

const Grids: React.FC<Props> = ({ col, gridRowClicked, getDataRows , refresh}) => {

  const state: OpportunityState = useSelector((state: AppState) => state.opportunities);
  const usersData:UsersData = useSelector((state:AppState) => state.users);
  const [gridApi, setGridApi] = React.useState<any>();
  const [gridColumnApi, setGridColumnApi] = React.useState(null);

  const onGridSizeChanged = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  const onFilter = () => {
     
    if (gridApi) {
      gridApi.setRowData([]);
      gridApi.onFilterChanged();
      const dataSource = getDataSource(gridApi);
      gridApi.setDatasource(dataSource);
    }
  }


  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    const dataSource = getDataSource(params);
    params.api.setDatasource(dataSource);
  }

  const getDataSource = ( params: any, filterd?: OpportunityFilterItem) => {
    return {
      rowCount: null,
      getRows: async (params: any) => {
        let orderByString = '';
        if (params && params.sortModel && params.sortModel[0]) {
          orderByString = params.sortModel[0].colId + ' ' + params.sortModel[0].sort;
        }
        
        const data: result = await getDataRows(params.startRow, orderByString, filterd);
        if (data.items.length === 0) {
            gridApi.showNoRowsOverlay();
        }
        else {
            if (gridApi)
                gridApi.hideOverlay();
        }
        if (data && data.load) {
          const rows = data.items;
          params.successCallback(rows, undefined);
        } else {
          const rows = data.items;
          const count = params.startRow + rows.length;
          params.successCallback(rows, count);
          }
      }
    };
  }

  const defaultColDef = {
    width: 100,
    headerComponentParams: {
      template:
        '<div class="ag-cell-label-container" role="presentation">' +
        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
        '    <span ref="eSortAsc" class="asc-icon"></span>' +
        '    <span ref="eSortDesc" class="desc-icon"></span>' +
        '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
        '  </div>' +
        '</div>'
    }
  };
  
  const defaultGridOptions = {
    headerHeight: 60,
    rowHeight: 60,
    domLayout: 'autoHeight',
    suppressCellSelection: true,
    onGridSizeChanged: onGridSizeChanged,
    rowModelType: 'infinite',
    paginationPageSize: 20,
    cacheBlockSize: 20,
    infiniteInitialRowCount: 1,
    onGridReady: onGridReady,
    gridRowClicked: gridRowClicked
  };

  const onRowClick = (event: RowClickedEvent) => {
    gridRowClicked(event.data);
  }

  React.useEffect(() => {
    onFilter();
  },[refresh]);

  return (
    <>
      <div className={"lists opportunity-list"}>
        <div className={"table-wrapper"}>
          <div className={"ag-theme-alpine"}>
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={col}
              onRowClicked={onRowClick}
              gridOptions={defaultGridOptions}
              frameworkComponents={{
                    customNoRowsOverlay: CustomNoRowsOverlay,
              }}
              noRowsOverlayComponent={'customNoRowsOverlay'}
              noRowsOverlayComponentParams={{
                  noRowsMessageFunc: () => 'No Records Found',
                }}

                      >
            </AgGridReact>
          </div>
        </div>
      </div>
    </>
  );

}

export default Grids;
