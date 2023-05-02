import Grid from '@mui/material/Grid';
import { Stack } from '@mui/system';
import AddPostButton from '../../components/AddPostButton/AddPostButton';
import FeedControls from '../../components/FeedControls';
import Paginatior from '../../components/Paginator/Paginator';
import Post from '../../components/Post/Post';
import { useGetPostsQuery } from '../../redux/api/endpoints/post';
import { useAppSelector } from '../../redux/store';

const PostFeed = () => {
  const feedOptions = useAppSelector((store) => store.feedState);
  const { data } = useGetPostsQuery(feedOptions);
  return (
    <>
      <Stack alignItems="center" flexDirection="column" gap={3} maxWidth={850} marginX="auto">
        <FeedControls />
        <Grid container gap={3} justifyContent="space-between">
          {data?.posts.map((postData) => (
            <Post key={postData._id} data={postData} />
          ))}
        </Grid>
        <Paginatior total={data?.total ?? 0} options={feedOptions} />
      </Stack>
      <AddPostButton />
    </>
  );
};

export default PostFeed;
