import React from 'react';
import { MessageList } from './MessageList';
import { connect } from 'react-redux';

import * as actions from '../../../actions';


class MessageListing extends React.Component {

  componentWillMount() {
    this.props.dispatch(actions.fetchMessages());
  }

  render() {
    return (
      <section id="messageListing">
        <h1 className="page-title">Messages</h1>
        <MessageList messages={this.props.messages} />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages.data
  }
}

export default connect(mapStateToProps)(MessageListing)