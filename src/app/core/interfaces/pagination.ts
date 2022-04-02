export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalItems: number;
  searchTerm: string | null;
}

export interface PageCached {
  [key: string]: Array<string>;
}

export const constructPageCacheKey =
  (pageSize: number, pageNumber: number, searchTerm: string | null) => `${pageSize}_${[pageNumber]}_${searchTerm}`;

export const getPageCachedInfo = (pageCached: PageCached, pagination: Pagination) => {
  const pageCacheKey = constructPageCacheKey(pagination.pageSize, pagination.pageNumber, pagination.searchTerm);
  return pageCached.hasOwnProperty(pageCacheKey) ? pageCached[pageCacheKey] : [];
};

export const defaultPagination: Pagination = {
  pageNumber: 0,
  pageSize: 20,
  totalPage: 0,
  totalItems: 0,
  searchTerm: ''
};
