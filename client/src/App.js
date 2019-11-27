import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SingleImageUpload from './components/SingleImageUpload';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/imageUpload" render={() => <SingleImageUpload />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
