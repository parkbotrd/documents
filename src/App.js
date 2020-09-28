import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Main from './components/Main'
import Tickets from './components/Tickets'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/tickets/:ticketId">
          <Tickets />
        </Route>
        <Route path="/tickets">
          <Tickets />
        </Route>
        
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
