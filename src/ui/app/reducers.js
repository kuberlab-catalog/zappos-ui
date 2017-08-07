import {SET_FILE_LIST, SET_LOADING, SET_UPLOADED_FILE, RESET, SET_SIMILAR_LIST} from './actions';

const STATE = {list: [], similar: []};

function mainReducer(state = STATE, action) {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case SET_FILE_LIST:
      return Object.assign({}, state, {
        list: action.body
      });
    case SET_SIMILAR_LIST:
      const similar = [...state.similar];
      similar[action.index] = action.body.slice(0, 5);

      return {
        ...state,
        similar: similar
      };
    case SET_UPLOADED_FILE:
      const list = [...state.list];
      list[5] = action.file;

      return Object.assign({}, state, {
        list: list
      });
    case RESET:
      return Object.assign({}, STATE);
    default:
      return state;
  }
}

export default mainReducer;
