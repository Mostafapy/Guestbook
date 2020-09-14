import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import Header from './components/shared/Header';
import Login from './components/login/Login';
import { Register } from './components/register/Register';
import { LoggedInRoute } from './components/shared/auth/LoggedInRoute';

import MessageListing from './components/message/message-listing/MessageListing';
import MessageUpdate from './components/message/message-detail/MessageUpdate';
import { MessageCreate } from './components/message/message-create/MessageCreate';
import { MessageManage } from './components/message/message-manage/MessageManage';
import { ProtectedRoute } from './components/shared/auth/ProtectedRoute';


import * as actions from './actions';

import './App.scss';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div className='App'>
          <ToastContainer />
          <Header logout={this.logout}/>
          <div className='container'>
            <Switch>
              <Route exact path='/' render={() =>  <Redirect to='/messages' /> }/>
              <Route exact path='/messages' component={MessageListing} />
              <ProtectedRoute exact path='/messages/manage' component={MessageManage} />
              <ProtectedRoute exact path='/messages/new' component={MessageCreate} />
              <Route exact path='/messages/:id/edit' component={MessageUpdate} />
              <Route exact path='/login' component={Login} />
              <LoggedInRoute exact path='/register' component={Register} />
            </Switch>
          </div>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;