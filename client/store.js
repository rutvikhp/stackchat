import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';
import { ENAMETOOLONG } from 'constants';

const initialState = {
  messages: [],
  newMessage: '',
  nameEntry: ''
}

// action types:
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const ADD_MESSAGE_TO_SERVER = 'ADD_MESSAGE_TO_SERVER';
const RECEIVE_NEW_MESSAGE_FROM_SERVER = 'RECEIVE_NEW_MESSAGE_FROM_SERVER';
const CHANGE_NAME_ENTRY = 'CHANGE_NAME_ENTRY';
const DELETE_MESSAGE = 'DELETE_MESSAGE';

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

export const changeNameEntry = (nameValue) => {
  return {
    type: CHANGE_NAME_ENTRY,
    name: nameValue
  }
}

// export const deleteMessage = (messageId) => {
//   return {
//     type: DELETE_MESSAGE,
//     messageId: messageId
//   }
// }

//thunk creator
export function fetchMessages () {
  return function thunk(dispatch){
    axios.get('/api/messages')
    .then(res => res.data)
    .then(messages => {
      dispatch(gotMessagesFromServer(messages));
    });
  };
}

export function postMessage (message) {
  return function thunk(dispatch) {
    axios.post('/api/messages', message)
    .then(res => res.data)
    .then(message => {
      dispatch(receiveNewMessageFromServer(message));
      socket.emit('new-message', message);
    });
  }
}

export function deleteMessage (messageId) {
  return function thunk(dispatch) {
    axios.delete(`/api/messages/${messageId}`)
    .then( res => res.data)
    .then(message => dispatch(fetchMessages()))
  }
}


function reducer (prevState = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, prevState, { messages: action.messages });
    case ADD_MESSAGE_TO_SERVER:
      return Object.assign({}, prevState, { newMessage: action.message });
    case RECEIVE_NEW_MESSAGE_FROM_SERVER:
      return Object.assign({}, prevState, { messages: [...prevState.messages, action.message]});
    case CHANGE_NAME_ENTRY:
      return Object.assign({}, prevState, { nameEntry: action.name })
    default:
      return prevState;
  }
}
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(loggerMiddleware, thunkMiddleware)));
/* eslint-enable */
export default store;
