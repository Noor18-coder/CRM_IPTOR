import React from 'react';
import { GridOptions, ColDef } from 'ag-grid-community';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { RowClickedEvent } from 'ag-grid-community';

import { OpportunityListItem, UserItem } from '../../../helpers/Api/models';

import { useSelector, useDispatch } from "react-redux";
import { OpportunityState } from '../../../store/Opportunity/Types';
import { AppState } from "../../../store/store";
import { UsersData } from '../../../store/Users/Types';

import { Filter } from '../Filter/Filter';
interface result {
  items: OpportunityListItem[],
  load: boolean
}

interface Props {
  col: any;
  gridRowClicked: (data: any) => void;
  getDataRows: (start: number, sortString: string, filter: string) => Promise<result>
}

const Grids: React.FC<Props> = ({ col, gridRowClicked, getDataRows }) => {

  const state: OpportunityState = useSelector((state: AppState) => state.opportunities);
  const usersData:UsersData = useSelector((state:AppState) => state.users);

  const [filter, setFilter] = React.useState<string>('all');
  const [filters, setFilters] = React.useState<string[]>([]);
  const [gridApi, setGridApi] = React.useState<any>();
  const [gridColumnApi, setGridColumnApi] = React.useState(null);

  const onGridSizeChanged = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  const onFilter = (key: string) => {
    if (key === filter) {
      return;
    }


    setFilter(key);

    if (gridApi) {
      gridApi.setRowData([]);
      gridApi.onFilterChanged();
      const dataSource = getDataSource(key, gridApi);
      gridApi.setDatasource(dataSource);
    }
  }


  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    const dataSource = getDataSource('all', params);
    params.api.setDatasource(dataSource);
  }

  const getDataSource = (filterd: string, params: any) => {
    return {
      rowCount: null,
      getRows: async (params: any) => {
        console.log(params.startRow);
        let orderByString = '';
        if (params && params.sortModel && params.sortModel[0]) {
          orderByString = params.sortModel[0].colId + ' ' + params.sortModel[0].sort;
        }
        const data: result = await getDataRows(params.startRow, orderByString, filterd);



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
        '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
        '    <span ref="eSortAsc" class="asc-icon"></span>' +
        '    <span ref="eSortDesc" class="desc-icon"></span>' +
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

  return (
    <>
      <Filter filters={Array.from(state.opportunityFilters)} selected={filter} selectOption={onFilter} />
      <div className={"lists opportunity-list"}>
        <div className={"table-wrapper"}>
          <div className={"ag-theme-alpine"}>
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={col}
              onRowClicked={onRowClick}
              gridOptions={defaultGridOptions}>
            </AgGridReact>
          </div>
        </div>
      </div>
    </>
  );

}

export default Grids;
