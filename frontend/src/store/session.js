import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const SET_SESSION = "session/login-session";
const REMOVE_SESSION = "session/remove-session";

const loginSession = (userInfo) => ({
  //userInfo is user data that is from the post login session from server.
  type: SET_SESSION,
  payload: userInfo
})

export const removeSession = () => ({
  type: REMOVE_SESSION,
})


/* ----- THUNK MIDDLEWARE ------ */
// make the request to the server here
export const loginUser = (userCredentials) => async (dispatch) =>{
  const {credential, password} = userCredentials;
  const response = await csrfFetch('/api/session', {
    method: "post",
    body: JSON.stringify({
      credential,
      password
    })
  })
  if(response.ok){
    const loginResponse = await response.json();
    dispatch(loginSession(loginResponse.user));
  }
  return response;
}

//restore user to persist session in store
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(loginSession(data.user));
  return response;
};

// sign up user
export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(loginSession(data.user));
  return response;
};


/* ----- REDUCERS ------ */
const initialState = {user:null};
const sessionReducer = (state=initialState, action) =>{
  let newState = {...state};
  switch (action.type) {
    case SET_SESSION: {
      newState.user = action.payload;
      return newState;
    }
    case REMOVE_SESSION: {
      newState.user = null;
      return newState;
    }
    default:
      return state;
  }
}
export default sessionReducer;
