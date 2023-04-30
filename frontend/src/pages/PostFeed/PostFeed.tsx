import Grid from '@mui/material/Grid';
import Post from '../../components/Post/Post';
import { useGetPostsQuery } from '../../redux/api/endpoints/post';
import { useAppSelector } from '../../redux/store';

const PostFeed = () => {
  const feedOptions = useAppSelector((store) => store.feedState);
  const { data } = useGetPostsQuery(feedOptions);
  return (
    <Grid container spacing={2} gap={3}>
      {data?.posts.map((postData) => (
        <Post key={postData._id} data={postData} />
      ))}
    </Grid>
  );
};

export default PostFeed;
