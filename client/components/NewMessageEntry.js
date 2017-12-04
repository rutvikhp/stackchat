import React, { Component } from 'react';
import store, { addMessageToServer, receiveNewMessageFromServer, postMessage } from '../store';
import axios from 'axios';
import socket from '../socket';

export default class NewMessageEntry extends Component {
  constructor () {
    super();
    this.state = store.getState();
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnMount () {
    this.unsubscribe();
  }

  handleInput (event) {
    store.dispatch(addMessageToServer(event.target.value));
  }

  handleSubmit (event) {
    event.preventDefault();
    store.dispatch(postMessage({content: this.state.newMessage, channelId: this.props.channelId, name: this.state.nameEntry}))
    // axios.post('/api/messages', { content: this.state.newMessage, channelId: this.props.channelId})
    //   .then(res => res.data)
    //   .then(message => {
    //     store.dispatch(receiveNewMessageFromServer(message));
    //     socket.emit('new-message', message);
    //   });
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value={this.state.newMessage}
            onChange={this.handleInput}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
