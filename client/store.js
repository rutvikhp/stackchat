import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';


// action types:
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const ADD_MESSAGE_TO_SERVER = 'ADD_MESSAGE_TO_SERVER';
const RECEIVE_NEW_MESSAGE_FROM_SERVER = 'RECEIVE_NEW_MESSAGE_FROM_SERVER';

// action creators:
export const gotMessagesFromServer = (messageArr) => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messageArr
  };
}

export const addMessageToServer = (message) => {
  return {
    type: ADD_MESSAGE_TO_SERVER,
    message: message
  };
}

export const receiveNewMessageFromServer = (message) => {
  return {
    type: RECEIVE_NEW_MESSAGE_FROM_SERVER,
    message: message
  };
}

export function fetchMessages () {
  return function thunk(dispatch){
    axios.get('/api/messages')
    .then(res => res.data)
    .then(messages => {
      dispatch(gotMessagesFromServer(messages));
    });
  };
}

const initialState = {
  messages: [],
  newMessage: ''
}

function reducer (prevState = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, prevState, { messages: action.messages });
    case ADD_MESSAGE_TO_SERVER:
      return Object.assign({}, prevState, { newMessage: action.message });
    case RECEIVE_NEW_MESSAGE_FROM_SERVER:
      return Object.assign({}, prevState, { messages: [...prevState.messages, action.message]});
    default:
      return prevState;
  }
}

const store = createStore(reducer, initialState, compose(applyMiddleware(loggerMiddleware, thunkMiddleware)));

export default store;
