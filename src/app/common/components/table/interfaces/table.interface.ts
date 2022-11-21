interface DtColumnInterface {
  caption: string;
  dataField: string;
  search?: boolean;
}

interface ContextMenuModel {
  icon?: string;
  menuText: string;
  // rowData?: any;
  handler?: () => void;
  menuEvent?: string;
}

interface PaginationEvt {
  start: number;
  end: number;
  currentPage: number;
  sizePage: number;
}

export {
  DtColumnInterface,
  ContextMenuModel,
  PaginationEvt,
}
