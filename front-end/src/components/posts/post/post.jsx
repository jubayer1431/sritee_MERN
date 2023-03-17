import React from 'react';
import moment from 'moment';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import EditIcon from '@mui/icons-material/Edit';

import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/postActions';

import useStyles from './postStyles';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant={'h6'}>{post.creator}</Typography>
        <Typography variant={'body2'}>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          size={'small'}
          style={{ color: 'white' }}
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizIcon fontSize={'default'} />
          {/*<EditIcon fontSize={'default'} />*/}
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant={'body2'} color={'textSecondary'}>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant={'h5'} gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant={'body2'} color={'textSecondary'} component={'p'}>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          color={'primary'}
          size={'small'}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <ThumbUpAltIcon fontSize={'small'} />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button
          color={'primary'}
          size={'small'}
          onClick={() => {
            dispatch(deletePost(post._id));
          }}
        >
          <DeleteIcon fontSize={'small'} />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
