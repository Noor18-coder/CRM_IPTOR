import React from 'react';
import {
  RowClickedEvent,
  IGetRowsParams,
  GridApi,
  GridReadyEvent,
  IDatasource,
  SortChangedEvent,
  GridOptions,
  FirstDataRenderedEvent,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { OpportunityListItem } from '../../../helpers/Api/models';
import { BusinessPartnerListItem } from '../../../helpers/Api/models/Customer';
import CustomNoRowsOverlay from './customNoRowsOverlay';
import { Constants } from '../../../config/Constants';

export interface SortModel {
  colId: string | undefined;
  sort: string | null | undefined;
}

interface Result {
  items: OpportunityListItem[] | BusinessPartnerListItem[];
  load: boolean;
}

interface Props {
  col: any;
  gridRowClicked: (data: any) => void;
  getDataRows: (start: number, sortString: string) => Promise<Result>;
  sortChanged?: (sortModel: SortModel[]) => void;
  sortOrder?: SortModel[];
  refresh: boolean;
}

const Grids: React.FC<Props> = ({ col, gridRowClicked, getDataRows, refresh, sortChanged, sortOrder }) => {
  const [gridApi, setGridApi] = React.useState<GridApi>();
  const onGridSizeChanged = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  const onSortChanged = (params: SortChangedEvent) => {
    const sortModel: SortModel[] = params.api.getSortModel();
    if (sortChanged) sortChanged(sortModel);
  };

  const onFirstDataRendered = (params: FirstDataRenderedEvent) => {
    if (sortOrder) {
      params.api.setSortModel(sortOrder);
    }
  };

  const onFilter = () => {
    if (gridApi) {
      gridApi.setRowData([]);
      gridApi.onFilterChanged();
      const dataSource = getDataSource();
      gridApi.setDatasource(dataSource);
    }
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    const dataSource = getDataSource();
    params.api.setDatasource(dataSource);
  };

  const getSortOrder = (params?: IGetRowsParams, sortOrderFromState?: SortModel[]): string => {
    if (params && params.sortModel && params.sortModel[0]) {
      if (params.sortModel[0].colId === Constants.ORDER_DESC) {
        return `${params.sortModel[0].colId} ${params.sortModel[0].sort}, ${Constants.COL_OPPORTUNITY_ID} ${params.sortModel[0].sort}`;
      } else {
        return `${params.sortModel[0].colId} ${params.sortModel[0].sort}`;
      }
    } else if (Array.isArray(sortOrderFromState) && sortOrderFromState.length > 0) {
      return `${sortOrderFromState[0].colId} ${sortOrderFromState[0].sort}`;
    }
    return '';
  };

  const getDataSource = (): IDatasource => {
    return {
      rowCount: undefined,
      getRows: async (params: IGetRowsParams) => {
        const orderByString = getSortOrder(params, sortOrder);
        const data: Result = await getDataRows(params.startRow, orderByString);
        if (data.items && data.items.length === 0) {
          if (gridApi) {
            gridApi.showNoRowsOverlay();
          }
        } else if (gridApi) gridApi.hideOverlay();
        if (data && data.load) {
          params.successCallback(data.items, undefined);
        } else {
          params.successCallback(data.items, params.startRow + data.items.length);
        }
      },
    };
  };

  const defaultColDef = {
    width: 100,
    flex: 1,
    wrapText: true,
    autoHeight: true,
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

  const defaultGridOptions: GridOptions = {
    headerHeight: 50,
    rowHeight: 68,
    domLayout: 'normal',
    suppressCellSelection: true,
    onGridSizeChanged,
    rowModelType: 'infinite',
    paginationPageSize: 20,
    cacheBlockSize: 20,
    infiniteInitialRowCount: 1,
    onGridReady,
    suppressHorizontalScroll: true,
    onSortChanged,
    onFirstDataRendered,
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
                'inactive-customer': (params) => {
                  const activeCustomer = params.data && params.data.active;
                  return activeCustomer === false;
                },
                'inactive-oppt': (params) => {
                  const activeOppty = params.data && params.data.activ;
                  return activeOppty === false;
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
