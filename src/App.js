import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import ChatAssistant from './ChatAssistant';
import ChatToChatTalk from './ChatToChatTalk';
import ImageGeneration from './ImageGeneration';
import ChatReservation from './ChatReservation';

function App() {
  return (
    <Router>
      <Switch>
        <Route 
          path="/chatassistant" 
          render={routeProps => (
            <ChatAssistant {...routeProps}/>)} 
        />
        <Route 
          path="/chattochattalk" 
          render={routeProps => (
            <ChatToChatTalk {...routeProps}/>)} 
        />
        <Route 
          path="/imagegeneration" 
          render={routeProps => (
            <ImageGeneration {...routeProps}/>)} 
        />
        <Route 
          path="/reservation" 
          render={routeProps => (
            <ChatReservation {...routeProps}/>)} 
        />
        <Redirect to='/chatassistant' />
      </Switch>
    </Router>
  );
}

export default App;
