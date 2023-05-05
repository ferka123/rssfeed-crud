import Grid from '@mui/material/Grid';
import { Stack } from '@mui/system';
import AddPostButton from '../../components/AddPostButton/AddPostButton';
import FeedControls from '../../components/FeedControls';
import Paginatior from '../../components/Paginator/Paginator';
import Post from '../../components/Post/Post';
import PostSkeleton from '../../components/Post/PostSkeleton';
import PostNotFound from '../../components/PostNotFound/PostNotFound';
import { useGetPostsQuery } from '../../redux/api/endpoints/post';
import { useAppSelector } from '../../redux/store';

const PostFeed = ({ withEditing }: { withEditing?: boolean }) => {
  const feedOptions = useAppSelector((store) => store.feedState);
  const { data, isLoading } = useGetPostsQuery(feedOptions);
  return (
    <>
      <Stack
        alignItems="center"
        flexDirection="column"
        gap={3}
        maxWidth={850}
        marginX="auto"
        flexGrow={1}
      >
        <FeedControls />
        <Grid container gap={3} justifyContent="space-between">
          {isLoading
            ? [...Array(feedOptions.limit)].map((_, key) => <PostSkeleton key={key} />)
            : data?.posts.map((postData) => (
                <Post key={postData._id} data={postData} withEditing={withEditing} />
              ))}
        </Grid>
        {data?.posts.length === 0 && <PostNotFound />}
        <Paginatior total={data?.total ?? 0} options={feedOptions} />
      </Stack>
      {withEditing && <AddPostButton />}
    </>
  );
};

export default PostFeed;
