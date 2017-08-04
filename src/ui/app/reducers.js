import {UPLOAD_FILE, SET_LOADING, SET_SELECTED_FILE, SET_SELECTED_ITEM} from './actions';

function mainReducer(state = {list: []}, action) {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case UPLOAD_FILE:
      return Object.assign({}, state, {
        list: action.body
      });
    case SET_SELECTED_FILE:
      return Object.assign({}, state, {
        selectedFile: action.file
      });
    case SET_SELECTED_ITEM:
      return Object.assign({}, state, {
        selectedItem: action.index
      });
    default:
      return state;
  }
}

export default mainReducer;
