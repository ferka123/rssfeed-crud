import Grid from '@mui/material/Grid';
import { Stack } from '@mui/system';
import Paginatior from '../../components/Paginator/Paginator';
import Post from '../../components/Post/Post';
import { useGetPostsQuery } from '../../redux/api/endpoints/post';
import { useAppSelector } from '../../redux/store';

const PostFeed = () => {
  const feedOptions = useAppSelector((store) => store.feedState);
  const { data } = useGetPostsQuery(feedOptions);
  return (
    <Stack alignItems="center" flexDirection="column" gap={3}>
      <Grid container spacing={2} gap={3} justifyContent="center">
        {data?.posts.map((postData) => (
          <Post key={postData._id} data={postData} />
        ))}
      </Grid>
      <Paginatior total={data?.total ?? 0} options={feedOptions} />
    </Stack>
  );
};

export default PostFeed;
