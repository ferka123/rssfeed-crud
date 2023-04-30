import { FeedPost } from '../../redux/api/endpoints/post/types';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';

const Post = ({ data }: { data: FeedPost }) => {
  const formatedDate = new Date(data.date).toLocaleDateString();
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user avatar">
            {data.creator}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.title}
        subheader={`${formatedDate} by ${data.creator}`}
      />
      <CardMedia component="img" height="194" image={data.image} alt={data.title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" href={data.url} target="_blank">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
