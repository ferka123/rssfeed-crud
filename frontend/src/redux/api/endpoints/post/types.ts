export interface FeedPost {
  _id: string;
  title: string;
  image: string;
  content: string;
  url: string;
  creator: string;
  date: string;
  tags?: string[];
}

export interface FeedResponse {
  status: string;
  total: number;
  posts: FeedPost[];
}
