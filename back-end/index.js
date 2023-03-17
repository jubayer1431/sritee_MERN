import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/postRoutes.js';

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/posts', postRoutes);

mongoose
	.connect(process.env.DATABASE_ATLAS, {
		useNewUrlParser: true,
		// useCreateIndex: true,
		// useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB Connected'))
	.catch((e) => console.log(e.message));

// Start Server
const port = process.env.PORT || 8000;

// saving in a variable (const server) because of unhandled promise rejection error handling
const server = app.listen(port, () => {
	console.log(`Server Started at ${port}`);
});
