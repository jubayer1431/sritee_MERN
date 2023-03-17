import * as api from '../api';
import catchAsync from '../utils/catchAsync';

// Action Creators
// Action Creators are functions that return actions
export const getAllPosts = () =>
  catchAsync(async (dispatch) => {
    const { data } = await api.fetchPosts();
    const action = {
      type: 'FETCH_ALL_POSTS',
      payload: data.data,
    };
    dispatch(action);
  });

export const createPost = (post) =>
  catchAsync(async (dispatch) => {
    const { data } = await api.createPost(post);
    const action = {
      type: 'CREATE_POST',
      payload: data,
    };
    dispatch(action);
  });

export const updatePost = (id, updatedPost) =>
  catchAsync(async (dispatch) => {
    const { data } = await api.updatePost(id, updatedPost);
    const action = {
      type: 'UPDATE_POST',
      payload: data,
    };
    dispatch(action);
  });

export const deletePost = (id) =>
  catchAsync(async (dispatch) => {
    await api.deletePost(id);
    const action = {
      type: 'DELETE_POST',
      payload: id,
    };
    dispatch(action);
  });

export const likePost = (id) =>
  catchAsync(async (dispatch) => {
    const { data } = await api.likePost(id);
    const action = {
      type: 'LIKE_POST',
      payload: data,
    };
    dispatch(action);
  });
