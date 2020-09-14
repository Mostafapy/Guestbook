import React from 'react';
import {  pretifyDate } from '../../../helpers';
import { Link } from 'react-router-dom';

export class MessageManageCard extends React.Component {

  constructor() {
    super();

    this.state = {
      wantDelete: false
    }
  }

  showDeleteMenu() {
    this.setState({
      wantDelete: true
    });
  }

  closeDeleteMenu() {
    this.setState({
      wantDelete: false
    })
  }

  deleteMessage(messageId, messageIndex) {
    this.setState({wantDelete: false});

    this.props.deleteMessageCb(messageId, messageIndex);
  }


  render() {
    const { message, messageIndex } = this.props;
    const { wantDelete } = this.state;

    const deleteClass = wantDelete ? 'toBeDeleted' : '';

    return (
      <div className='col-md-4'>
        <div className={`card text-center ${deleteClass}`}>
          <div className='card-block'>
            {message.text}
          </div>
          <div className='card-footer text-muted'>
            Created at {pretifyDate(message.createdAt)}
            { !wantDelete &&
              <React.Fragment>
                <button onClick={() => { this.showDeleteMenu() }} className='btn btn-danger'> Delete </button>
                <Link className='btn btn-dark m-2' to={{pathname: `/messages/${message._id}/edit`, state: { isUpdate: true }}}> Edit </Link>
              </React.Fragment>
            }
            { wantDelete &&
              <div className='delete-menu'>
                Do you confirm?
                <button onClick={() => {this.deleteMessage(message._id, messageIndex)}} className='btn btn-danger'> Yes </button>
                <button onClick={() => { this.closeDeleteMenu() }} className='btn btn-success'> No </button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}