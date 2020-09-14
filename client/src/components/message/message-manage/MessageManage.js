import React from 'react';
import * as actions from '../../../actions';
import { Link } from 'react-router-dom';
import { MessageManageCard } from './MessageManageCard';
import { ToastContainer, toast } from 'react-toastify';

export class MessageManage extends React.Component {

  constructor() {
    super();

    this.state = {
      userMessages: [],
      errors: [],
      isFetching: false
    }

    this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentWillMount() {
    this.setState({isFetching: true});

    actions.getUserMessages().then(
      userMessages => this.setState({userMessages, isFetching: false})
      )}

  renderMessageCards(messages) {
    return messages.map((message, index) =>
     <MessageManageCard key={index}
                       message={message}
                       messageIndex={index}
                       deleteMessageCb={this.deleteMessage} />);
  }

  deleteMessage(messageId, messageIndex) {
    actions.deleteMessage(messageId).then(
      () => this.deleteMessageFromList(messageIndex),
      errors => toast.error(errors[0].detail))
}

  deleteMessageFromList(messageIndex) {
    const userMessages = this.state.userMessages.slice();
    userMessages.splice(messageIndex, 1);

    this.setState({userMessages});
  }

  render() {
    const { userMessages, isFetching } = this.state;

    return (
      <section id='userMessages'>
      <ToastContainer />
        <h1 className='page-title'>My Messages</h1>
        <div className='row'>
        {this.renderMessageCards(userMessages)}
        </div>
        { !isFetching && userMessages.length === 0 &&
          <div className='alert alert-warning'>
            You dont have any messages currenty created. 
            <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/messages/new'>Create Message</Link>
          </div>
        }
      </section>
    )
  }
}