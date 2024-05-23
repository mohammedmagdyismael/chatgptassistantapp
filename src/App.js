import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { setupOpenAI } from './app/SetupOpenAI';
import Layout from './components/Layout/Layout';

import PharmaciesMasterLisrMapping from './views/PharmaciesMasterLisrMapping';
import GPTModels from './views/GPTModels';

function App() {
  const openai = setupOpenAI();
  return (
    <Layout>
      <Router>
        <Switch>
        <Route 
            path="/gpts" 
            render={routeProps => (
              <GPTModels openaiClient={openai} {...routeProps}/>)} 
          />
          <Route 
            path="/pharmaciesfiles" 
            render={routeProps => (
              <PharmaciesMasterLisrMapping openai={openai} {...routeProps}/>)} 
          />
          <Redirect to='/pharmaciesfiles' />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
