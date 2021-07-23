import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const SET_HOMEPAGE_FEED = "lists/homepage/global-feed"
const CREATE_LIST = "lists/create-list";
const FETCH_LIST_ITEMS = "lists/listitems";

export const setHomepageFeed = (homePageFeed) => ({
  type: SET_HOMEPAGE_FEED,
  payload: homePageFeed,
})

export const createListAction = (payload) =>({
  type: CREATE_LIST,
  payload,
})

export const fetchSingleListItems = (payload) =>({
  type: FETCH_LIST_ITEMS,
  payload,
})


/* ----- THUNK MIDDLEWARE ------ */
export const fetchHomeFeed = () => async(dispatch) => {
  const response = await csrfFetch('/api/lists/global-feed-lists');
  const homePageFeed = await response.json();
  dispatch(setHomepageFeed(homePageFeed));
  return response;
}

export const createListThunk = (payload) => async(dispatch) =>{
  const response = await csrfFetch('/api/lists/create', {
    method: "post",
    body: JSON.stringify(payload),
  });
  if(response.ok){

    const createListData = await response.json();
    dispatch(createListAction(createListData));
  }
  return response;
}

export const fetchSingleListBasedOnId = (id) => async(dispatch) => {
  const response = await csrfFetch(`/api/lists/${id}/items`);
  const singleList = await response.json();
  dispatch(fetchSingleListItems(payload));
  return response;
}

/* ----- REDUCERS ------ */
const initialState = {
  homepageFeedGlobal:null,
  createdList:null,
  singeListItems:null,
};
const listReducer = (state=initialState, action) =>{
  let newState = {...state};
  switch (action.type) {
    case SET_HOMEPAGE_FEED:{
      newState.homepageFeedGlobal = action.payload;
      return newState;
    }
    case CREATE_LIST:{
      newState.createdList = action.payload;
      return newState;
    }
    //@contains both the list metadata + each single list items data. (key = 'listItems' to access key data)
    case FETCH_LIST_ITEMS:{
      newState.singeListItems = action.payload;
    }
    default:
      return state;
  }
}
export default listReducer;
