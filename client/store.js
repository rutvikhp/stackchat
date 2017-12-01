const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

export const gotMessagesFromServer = (messageArr) => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messageArr
  };
}

const initialState = {
  messages: []
}

function reducer (prevState = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, prevState, { messages: action.messages });
    default:
      return prevState;
  }
}

// function reducer (prevState, action) {
//   const newState = {...prevState}
//   switch (action.type) {
//     case GOT_MESSAGES_FROM_SERVER:
//       newState.messages = action.messages;
//       return newState;
//     default:
//       return prevState;
//   }
// }

