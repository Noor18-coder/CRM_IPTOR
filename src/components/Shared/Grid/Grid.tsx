import React from 'react';
import { RowClickedEvent, IGetRowsParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { OpportunityListItem } from '../../../helpers/Api/models';
import { BusinessPartnerListItem } from '../../../helpers/Api/models/Customer';
import CustomNoRowsOverlay from './customNoRowsOverlay';

interface Result {
  items: OpportunityListItem[] | BusinessPartnerListItem[];
  load: boolean;
}

interface Props {
  col: any;
  gridRowClicked: (data: any) => void;
  getDataRows: (start: number, sortString: string) => Promise<Result>;
  refresh: boolean;
}

const Grids: React.FC<Props> = ({ col, gridRowClicked, getDataRows, refresh }) => {
  const [gridApi, setGridApi] = React.useState<any>();

  const onGridSizeChanged = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  const onFilter = () => {
    if (gridApi) {
      gridApi.setRowData([]);
      gridApi.onFilterChanged();
      const dataSource = getDataSource();
      gridApi.setDatasource(dataSource);
    }
  };

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    const dataSource = getDataSource();
    params.api.setDatasource(dataSource);
  };

  const getDataSource = () => {
    return {
      rowCount: null,
      getRows: async (params: IGetRowsParams) => {
        let orderByString = '';
        if (params && params.sortModel && params.sortModel[0]) {
          orderByString = `${params.sortModel[0].colId} ${params.sortModel[0].sort}`;
        }

        const data: Result = await getDataRows(params.startRow, orderByString);
        if (data.items && data.items.length === 0) {
          if (gridApi) {
            gridApi.showNoRowsOverlay();
          }
        } else if (gridApi) gridApi.hideOverlay();
        if (data && data.load) {
          const rows = data.items;
          params.successCallback(rows, undefined);
        } else {
          const rows = data.items;
          const count = params.startRow + rows.length;
          params.successCallback(rows, count);
        }
      },
    };
  };

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
        '</div>',
    },
  };

  const defaultGridOptions = {
    headerHeight: 60,
    rowHeight: 60,
    domLayout: 'normal',
    suppressCellSelection: true,
    onGridSizeChanged,
    rowModelType: 'infinite',
    paginationPageSize: 20,
    cacheBlockSize: 20,
    infiniteInitialRowCount: 1,
    onGridReady,
    suppressHorizontalScroll: true,
    gridRowClicked,
  };

  const onRowClick = (event: RowClickedEvent) => {
    gridRowClicked(event.data);
  };

  React.useEffect(() => {
    onFilter();
  }, [refresh]);

  return (
    <>
      <div className="lists opportunity-list">
        <div className="table-wrapper">
          <div className="ag-theme-alpine">
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={col}
              onRowClicked={onRowClick}
              gridOptions={defaultGridOptions}
              frameworkComponents={{
                customNoRowsOverlay: CustomNoRowsOverlay,
              }}
              noRowsOverlayComponent="customNoRowsOverlay"
              noRowsOverlayComponentParams={{
                noRowsMessageFunc: () => 'No Records Found',
              }}
              rowClassRules={{
                'inactive-customer': function (params) {
                  const activeCustomer = params.data && params.data.active;
                  return activeCustomer === false;
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Grids;
