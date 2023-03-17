import catchAsync from '../utils/catchAsync.js';
import PostModel from '../models/postModel.js';
import mongoose from 'mongoose';

export const getAllPosts = catchAsync(async (req, res) => {
	const posts = await PostModel.find();

	res.status(200).json({
		data: posts,
	});
});

export const createPost = catchAsync(async (req, res) => {
	const body = req.body;
	const post = await PostModel.create(body);
	res.status(201).send(post);
});

export const updatePost = catchAsync(async (req, res) => {
	// id is assigning to _id while destructuring id from req.params
	const { id: _id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(_id))
		res.status(404).send('No post found with that ID !!!');

	const post = await PostModel.findByIdAndUpdate(
		_id,
		{ ...req.body, _id },
		{
			new: true,
		}
	);

	res.send(post);
});

export const deletePost = catchAsync(async (req, res) => {
	// id is assigning to _id while destructuring id from req.params
	const { id: _id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(_id))
		res.status(404).send('No post found with that ID !!!');

	await PostModel.findByIdAndDelete(_id);
	res.status(200).json({
		data: null,
		message: 'Post Deleted',
	});
});

export const likePost = catchAsync(async (req, res) => {
	// id is assigning to _id while destructuring id from req.params
	const { id: _id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(_id))
		res.status(404).send('No post found with that ID !!!');

	const post = await PostModel.findById(_id);
	const updatedPost = await PostModel.findByIdAndUpdate(
		_id,
		{ likeCount: post.likeCount * 1 + 1 },
		{
			new: true,
		}
	);

	res.send(updatedPost);
});
