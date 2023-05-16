import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { setupOpenAI } from './app/SetupOpenAI';
import Layout from './components/Layout/Layout';

import ChatToChatTalk from './views/ChatToChatTalk';
import KeyWordsExtraction from './views/KeyWordsExtraction';
import ReviewsClassification from './views/ReviewClassification';
import ImageGeneration from './views/ImageGeneration';
import ContentWriter from './views/ContentWriter';
import ChatAssistant from './views/ChatAssistant';
import VezeetaCallCenter from './views/VezeetaCallCenter';
import VezeetaCallCenterContextFlow from './views/VezeetaCallCenterContextFlow';

function App() {
  const openai = setupOpenAI();
  return (
    <Layout>
      <Router>
        <Switch>
          <Route 
            path="/chatassistant" 
            render={routeProps => (
              <ChatAssistant openai={openai} {...routeProps}/>)} 
          />
          <Route 
            path="/vezeetacallCenter" 
            render={routeProps => (
              <VezeetaCallCenter openai={openai} {...routeProps}/>)} 
          />
          <Route 
            path="/vezeetaCallCentercontextflow" 
            render={routeProps => (
              <VezeetaCallCenterContextFlow openai={openai} {...routeProps}/>)} 
          />
          <Route 
            path="/contentwriter" 
            render={routeProps => (
              <ContentWriter openai={openai} {...routeProps}/>)} 
          />
          <Route 
            path="/reviewsclassification" 
            render={routeProps => (
              <ReviewsClassification openai={openai} {...routeProps}/>)} 
          />
          <Route 
            path="/keywordextraction" 
            render={routeProps => (
              <KeyWordsExtraction openai={openai} {...routeProps}/>)} 
          />
          <Route 
            path="/chattochattalk" 
            render={routeProps => (
              <ChatToChatTalk openai={openai} {...routeProps}/>)} 
          />
          <Route 
            path="/imagegeneration" 
            render={routeProps => (
              <ImageGeneration openai={openai} {...routeProps}/>)} 
          />
          <Redirect to='/chatassistant' />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
