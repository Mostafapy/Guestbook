import React from 'react';
import MessageCreateForm from './MessageCreateForm';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../actions';

export class MessageCreate extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    }


    this.createMessage = this.createMessage.bind(this);
  }

  createMessage(messageData) {
    actions.createMessage(messageData).then(
      (message) => this.setState({redirect: true}),
      (errors) => this.setState({errors}))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{pathname:'/messages'}}/>
    }

    return (
      <section id='newMessage'>
        <div className='bwm-form'>
          <div className='row text-center'>
            <div className='col-12'>
              <h1 className='page-title'>Create Message</h1>
              <MessageCreateForm submitCb={this.createMessage}
                                errors={this.state.errors}/>
            </div>
          </div>
        </div>
      </section>
    )
  }
}