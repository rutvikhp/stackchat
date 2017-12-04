import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import store, { gotMessagesFromServer, fetchMessages, deleteMessage } from '../store';

export default class MessagesList extends Component {

  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
    // axios.get('/api/messages')
    //   .then(res => res.data)
    //   .then(messages => {
    //     store.dispatch(gotMessagesFromServer(messages));
    //     // this.setState({ messages })
    //   });
    store.dispatch(fetchMessages());
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount () {
    this.unsubcribe();
  }

  handleClick (event) {
    // console.log('event',event.target.value)
    store.dispatch(deleteMessage(event.target.value));

  }

  render () {

    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message =>
            <div>
            <Message message={message} key={message.id} />
            <button value={message.id} key={'BUTTON'+ message.id} onClick={this.handleClick}>x</button>
            </div>
          ) }
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}
