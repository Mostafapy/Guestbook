import React from 'react';
import { MessageCard } from './MessageCard';

export class MessageList extends React.Component {

  renderMessages() {
    return this.props.messages.map((message, index) => {
      return (
          <MessageCard key={index}
                      message={message}/>
        )
    });
  }
  render() {
    return (
      <div className="row">
        {this.renderMessages()}
      </div>
    )
  }
}