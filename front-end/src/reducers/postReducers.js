export default (postsState = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_POSTS':
      return action.payload;

    case 'CREATE_POST':
      return [...postsState, action.payload];

    case 'UPDATE_POST':
    case 'LIKE_POST':
      // we are doing this to modify our states with the updated post. action.payload is the latest updated post
      return postsState.map((post) =>
        post._id !== action.payload._id ? post : action.payload
      );

    case 'DELETE_POST':
      return postsState.filter((post) => post._id !== action.payload);

    default:
      return postsState;
  }
};
