export interface FeedPost {
  title: string;
  image: string;
  content: string;
  url: string;
  creator: string;
  tags?: string[];
}

export interface FeedResponse {
  status: string;
  total: number;
  posts: FeedPost[];
}
