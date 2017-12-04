import React, { Component } from 'react';
import store, { changeNameEntry } from '../store';

export default class NewEntry extends Component {
  constructor() {
    super()
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleChange (event) {
    event.preventDefault();
    store.dispatch(changeNameEntry(event.target.value));
  }

  render() {
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          onChange={this.handleChange}
          value={this.state.nameEntry}
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
        />
      </form>
    )
  }
}
