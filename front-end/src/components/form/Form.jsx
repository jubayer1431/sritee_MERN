import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { Typography, TextField, Button, Paper } from '@mui/material';

import useStyles from './formStyles';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/postActions';

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();

  // fill out the form while clicking edit button
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  // fill out the form while clicking edit button
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    currentId
      ? dispatch(updatePost(currentId, postData))
      : dispatch(createPost(postData));

    clearFields();
  };

  const clearFields = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete={'off'}
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant={'h6'}>
          {currentId ? 'Editing' : 'Creating'} A Memory
        </Typography>

        <TextField
          name={'creator'}
          variant={'outlined'}
          label={'Creator'}
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({
              ...postData,
              creator: e.target.value,
            })
          }
        />

        <TextField
          name={'title'}
          variant={'outlined'}
          label={'Title'}
          fullWidth
          value={postData.title}
          onChange={(e) =>
            setPostData({
              ...postData,
              title: e.target.value,
            })
          }
        />

        <TextField
          name={'message'}
          variant={'outlined'}
          label={'Message'}
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({
              ...postData,
              message: e.target.value,
            })
          }
        />

        <TextField
          name={'tags'}
          variant={'outlined'}
          label={'Tags'}
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(','),
            })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type={'file'}
            multiple={false}
            onDone={({ base64 }) => {
              setPostData({
                ...postData,
                selectedFile: base64,
              });
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant={'contained'}
          color={'primary'}
          size={'large'}
          type={'submit'}
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant={'contained'}
          color={'secondary'}
          size={'small'}
          onClick={clearFields}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
