import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const SET_HOMEPAGE_FEED = "lists/homepage/global-feed"
const CREATE_LIST = "lists/create-list";
const UPDATE_LIST = "lists/update-list";
const FETCH_LIST_ITEMS = "lists/listitems";
const CREATE_ITEM = "lists/create-item";
const UPDATE_ITEM = "lists/update-item";

export const setHomepageFeed = (homePageFeed) => ({
  type: SET_HOMEPAGE_FEED,
  payload: homePageFeed,
})

export const createListAction = (payload) =>({
  type: CREATE_LIST,
  payload,
})

export const updateListAction = (payload) =>({
  type: UPDATE_LIST,
  payload,
})

export const fetchSingleListItems = (payload) =>({
  type: FETCH_LIST_ITEMS,
  payload,
})

export const createItemAction = (payload, id) =>({
  type: CREATE_ITEM,
  id,
  payload,
})

export const updateItemAction = (payload, id, itemId) =>({
  type: UPDATE_ITEM,
  id,
  payload,
  itemId
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
    return createListData;
  }
  return response;
}

export const updateListThunk = (payload, id) => async(dispatch) =>{
  const response = await csrfFetch(`/api/lists/update/${id}`, {
    method: "post",
    body: JSON.stringify(payload),
  });
  if(response.ok){
    const updateListData = await response.json();
    dispatch(updateListAction(updateListData));
    return updateListData;
  }
  return response;
}

export const fetchSingleListBasedOnId = (id) => async(dispatch) => {
  const response = await csrfFetch(`/api/lists/${id}/items`);
  const singleList = await response.json();
  dispatch(fetchSingleListItems(singleList));
  return response;
}

export const createItemThunk = (payload, id) => async(dispatch) =>{
  const response = await csrfFetch(`/api/lists/listId/${id}/add/item`, {
    method: "post",
    body: JSON.stringify(payload),
  });
  if(response.ok){
    const createItemData = await response.json();
    dispatch(createItemAction(createItemData));
    return createItemData;
  }
  return response;
}

export const updateItemThunk = (payload, id, itemId) => async(dispatch) =>{
  const response = await csrfFetch(`/api/lists/listId/${id}/update/item/${itemId}`, {
    method: "post",
    body: JSON.stringify(payload),
  });
  if(response.ok){
    const createItemData = await response.json();
    dispatch(createItemAction(createItemData));
    return createItemData;
  }
  return response;
}

/* ----- REDUCERS ------ */
const initialState = {
  homepageFeedGlobal:null,
  createdList:null,
  singeListItems:null,
  itemCreated:null,
  mostRecentUpdatedItem:null,
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
    case UPDATE_LIST:{
      newState.updatedList = action.payload;
      return newState;
    }
    //@contains both the list metadata + each single list items data. (key = 'listItems' to access key data)
    case FETCH_LIST_ITEMS:{
      newState.singeListItems = action.payload;
      return newState;
    }
    case CREATE_ITEM:{
      newState.itemCreated = action.payload;
      return newState;
    }
    case UPDATE_ITEM:{
      newState.mostRecentUpdatedItem = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
export default listReducer;
