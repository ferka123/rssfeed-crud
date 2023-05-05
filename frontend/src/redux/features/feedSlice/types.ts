export enum SortBy {
  titleAsc = 'title-asc',
  titleDsc = 'title-dsc',
  creatorAsc = 'creator-asc',
  CreatorDsc = 'creator-dsc',
  dateAsc = 'date-asc',
  dateDsc = 'date-dsc'
}

export interface FeedOptions {
  page: number;
  limit: number;
  sortby: SortBy;
  search: string;
  filterdate: string;
  filtercreator: string;
}
