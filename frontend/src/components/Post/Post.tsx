import { FeedPost } from '../../redux/api/endpoints/post/types';
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
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import PutPostModal from '../PutPostModal/PutPostModal';
import DeletePostModal from '../DeletePostModal/DeletePostModal';

const Post = ({ data, withEditing }: { data: FeedPost; withEditing?: boolean }) => {
  const formatedDate = new Date(data.date).toLocaleDateString();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchor);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <Card sx={{ width: { xs: '100%', md: 400 }, display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user avatar">
            {data.creator}
          </Avatar>
        }
        action={
          withEditing && (
            <IconButton aria-label="settings" onClick={(e) => setMenuAnchor(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={data.title}
        subheader={`${formatedDate} by ${data.creator}`}
      />
      <CardMedia component="img" height="194" image={data.image} alt={data.title} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {data.content.slice(0, -12)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" href={data.url} target="_blank">
          Read More
        </Button>
      </CardActions>
      <Menu
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={isMenuOpen}
        onClose={() => setMenuAnchor(null)}
        onClick={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => setOpenEdit(true)}>Edit</MenuItem>
        <MenuItem onClick={() => setOpenDelete(true)}>Delete</MenuItem>
      </Menu>
      {openEdit && (
        <PutPostModal open={openEdit} handleClose={() => setOpenEdit(false)} values={data} />
      )}
      {openDelete && (
        <DeletePostModal open={openDelete} handleClose={() => setOpenDelete(false)} id={data._id} />
      )}
    </Card>
  );
};

export default Post;
