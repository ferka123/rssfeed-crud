export enum SortOrder {
  asc = 'asc',
  dsc = 'dsc'
}

export enum SortBy {
  title = 'title',
  creator = 'creator',
  date = 'date'
}

export interface FeedOptions {
  page: number;
  limit: number;
  order: SortOrder;
  sortby: SortBy;
  search: string;
}
