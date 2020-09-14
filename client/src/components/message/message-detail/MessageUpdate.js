import React from 'react';
import { connect } from 'react-redux';

import { UserGuard } from '../../shared/auth/UserGuard';
import { EditableText } from '../../shared/editable/EditableText';
import {  pretifyDate } from '../../../helpers';


import * as actions from '../../../actions';

class MessageUpdate extends React.Component {

  constructor() {
    super();

    this.state = {
      isAllowed: false,
      isFetching: true
    }

    this.updateMessage = this.updateMessage.bind(this);
    this.resetMessageErrors = this.resetMessageErrors.bind(this);
    this.verifyMessageOwner = this.verifyMessageOwner.bind(this);
  }

  componentWillMount() {
    const messageId = this.props.match.params.id;

    this.props.dispatch(actions.fetchMessageById(messageId));
  }

  componentDidMount() {
    this.verifyMessageOwner();
  }

  updateMessage(messageData) {
    const {message: {_id}, dispatch } = this.props;

    dispatch(actions.updateMessage(_id, messageData));
  }

  resetMessageErrors() {
    this.props.dispatch(actions.resetMessageErrors());
  }

  verifyMessageOwner() {
    const messageId = this.props.match.params.id;
    this.setState({isFetching: true});

    return actions.verifyMessageOwner(messageId).then(
      () => {
        this.setState({isAllowed: true, isFetching: false})
      },
      () => {
        this.setState({isAllowed: false, isFetching: false})
      });
  }

  render() {
    const { message, errors } = this.props;
    const { isFetching, isAllowed } = this.state;

    if (message._id) {
      return (
        <UserGuard isAllowed={isAllowed} isFetching={isFetching}>
          <section id='messageDetails'>
            <div className='details-section border border-primary rounded'>
              <div className='row'>
                <div className='col-12'>
                  <div className='message'>
                    <div className="message-owner m-2 mr-5">
                      <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
                      <span className="mr-0 font-weight-bold">{message.user && message.user.name}</span>
                    </div>
                    <div>
                    <div className='m-2 ml-5 font-weight-normal'>
                    <EditableText  entity={message}
                                   entityField={'description'}
                                   className={'message-description'}
                                   updateEntity={this.updateMessage}
                                   rows={6}
                                   cols={50}
                                   errors={errors}
                                   resetErrors={this.resetMessageErrors} /></div>
                    <div className='m-2 ml-5 pt-5'>
                      Created at {pretifyDate(message.createdAt)}
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </UserGuard>
      )
    } else {
      return (
        <h1> Loading... </h1>
        )
    }
  }
}

function mapStateToProps(state) {
  return {
    message: state.message.data,
    errors: state.message.errors
  }
}

export default connect(mapStateToProps)(MessageUpdate)