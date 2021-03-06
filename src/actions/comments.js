export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";

export const requestComments = postId => ({
  type: REQUEST_COMMENTS,
  postId
});

export const receiveComments = (postId, items, error) => ({
  type: RECEIVE_COMMENTS,
  items,
  postId,
  error
});

export const retrieveComments = postId => async dispatch => {
  dispatch(requestComments(postId));

  let comments, error;
  try {
    comments = await (
      await fetch(
        "https://jsonplaceholder.typicode.com/comments?postId=" + postId
      )
    ).json();
  } catch (e) {
    error = true;
    comments = [];
  }

  dispatch(receiveComments(postId, comments.slice(0, 5), error));
};

export const addComment = (postId, formData) => ({
  type: ADD_COMMENT,
  postId,
  formData
});
