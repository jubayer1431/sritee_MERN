import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from './components/form/Form';
import Posts from './components/posts/Posts';
import { getAllPosts } from './actions/postActions';
import Logo from './images/sritee.png';
import useStyles from './appStyles';

const App = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentID, setCurrentID] = useState(null);

	useEffect(() => {
		dispatch(getAllPosts());
	}, [currentID, dispatch]);

	return (
		<Container maxWidth={'lg'}>
			<AppBar className={classes.appBar} position={'static'} color={'inherit'}>
				<Typography className={classes.heading} variant={'h2'} align={'center'}>
					<img
						className={classes.image}
						src={Logo}
						alt='Sritee'
						height={'60'}
					/>
					SRITEE
					<img
						className={classes.image}
						src={Logo}
						alt='Sritee'
						height={'60'}
					/>
				</Typography>
			</AppBar>

			<Grow in>
				<Container>
					<Grid
						container
						className={classes.flexReverse}
						justify={'space-between'}
						alignItems={'stretch'}
						spacing={3}
					>
						<Grid item xs={12} sm={4}>
							<Form currentId={currentID} setCurrentId={setCurrentID} />
						</Grid>
						<Grid item xs={12} sm={7}>
							<Posts setCurrentId={setCurrentID} />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
};

export default App;
