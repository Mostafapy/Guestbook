
import React from 'react';
import {  pretifyDate } from '../../../helpers';

import { Link } from 'react-router-dom';


export function MessageCard(props) {
  const message = props.message;

  return (
    <div className='col-12 mb-2'>
      <Link className='message-detail-link' to="/messages/manage">
      <section id='messageDetails'>
            <div className='details-section border border-primary rounded-pill'>
              <div className='row'>
                <div className='col-12'>
                  <div>
                    <div className="message-owner mr-5 mt-3">
                      <img className="" src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
                      <span className='font-weight-bold'>{message.user && message.user.name}</span>
                    </div>
                    <div>
                    <h4 className='m-2 ml-5 font-weight-normal'>{message.text}</h4>
                    </div>
                    <div className='m-2 ml-5 pt-5 flow-text grey-text text-darken-1'>
                      Created at {pretifyDate(message.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      </Link>
    </div>
  )
}