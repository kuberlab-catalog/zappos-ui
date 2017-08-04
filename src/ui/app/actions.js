export const UPLOAD_FILE = 'UPLOAD_FILE';
export const SET_LOADING = 'SET_LOADING';
export const SET_SELECTED_FILE = 'SET_SELECTED_FILE';
export const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM';

export function uploadFile(body) {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      isLoading: true
    });

    return fetch('/api/upload', {method: 'POST', body: body})
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: UPLOAD_FILE,
          body: json
        });

        dispatch({
          type: SET_LOADING,
          isLoading: false
        });

        dispatch({
          type: SET_SELECTED_ITEM,
          item: null
        });

        return json;
      });
  };
}

export function searchBy(fileName) {
  const form = new FormData();
  form.append('fileName', fileName);

  return dispatch => {
    dispatch({
      type: SET_LOADING,
      isLoading: true
    });

    return fetch('/api/searchBy', {method: 'POST', body: form})
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: UPLOAD_FILE,
          body: json
        });

        dispatch({
          type: SET_SELECTED_FILE,
          file: fileName
        });

        dispatch({
          type: SET_LOADING,
          isLoading: false
        });

        dispatch({
          type: SET_SELECTED_ITEM,
          item: null
        });

        return json;
      });
  };
}

export function setLoading(isLoading) {
  return {type: SET_LOADING, isLoading: isLoading};
}

export function setSelectedFile(file) {
  return {type: SET_SELECTED_FILE, file: file};
}

export function setSelectedItem(index) {
  return {type: SET_SELECTED_ITEM, index: index};
}
