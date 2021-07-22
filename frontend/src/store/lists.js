import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const SET_HOMEPAGE_FEED = "lists/homepage/global-feed"

export const setHomepageFeed = (homePageFeed) => ({
  type: SET_HOMEPAGE_FEED,
  payload: homePageFeed,
})


/* ----- THUNK MIDDLEWARE ------ */
export const fetchHomeFeed = () => async(dispatch) => {
  const response = await csrfFetch('/api/lists/global-feed-lists');
  const homePageFeed = await response.json();
  dispatch(setHomepageFeed(homePageFeed));
  return response;
}

/* ----- REDUCERS ------ */
const initialState = {homepageFeedGlobal:null};
const listReducer = (state=initialState, action) =>{
  let newState = {...state};
  switch (action.type) {
    case SET_HOMEPAGE_FEED:{
      newState.homepageFeedGlobal = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
export default listReducer;
