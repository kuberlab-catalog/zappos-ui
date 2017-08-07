export const SET_FILE_LIST = 'SET_FILE_LIST';
export const SET_SIMILAR_LIST = 'SET_SIMILAR_LIST';
export const SET_LOADING = 'SET_LOADING';
export const SET_UPLOADED_FILE = 'SET_UPLOADED_FILE';
export const RESET = 'RESET';

export function getRandomFiles() {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      isLoading: true
    });

    return fetch('/api/getRandom')
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: SET_FILE_LIST,
          body: json
        });

        dispatch({
          type: SET_LOADING,
          isLoading: false
        });

        return json;
      });
  };
}

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
          type: SET_SIMILAR_LIST,
          body: json,
          index: 5
        });

        dispatch({
          type: SET_LOADING,
          isLoading: false
        });

        return json;
      });
  };
}

export function searchBy(fileName, index) {
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
          type: SET_SIMILAR_LIST,
          body: json,
          index: index
        });

        dispatch({
          type: SET_LOADING,
          isLoading: false
        });

        return json;
      });
  };
}

export function setLoading(isLoading) {
  return {type: SET_LOADING, isLoading: isLoading};
}

export function setUploadedFile(file) {
  return {type: SET_UPLOADED_FILE, file: file};
}

export function reset() {
  return {type: RESET};
}
