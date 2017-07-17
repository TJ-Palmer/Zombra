export function add(amount) {
  return (dispatch) => {
    dispatch({type: 'ADD', payload: amount});
  };
}

export function minus(amount) {
  return (dispatch) => {
    dispatch({type: 'MINUS', payload: amount});
  };
}
