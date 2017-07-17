const defaultState = {
  messages: [],
  error: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_MESSAGE' : {
      return {...state, messages: state.messages.push(action.payload)};
    }
    default : {
      return state;
    }
  }
}
