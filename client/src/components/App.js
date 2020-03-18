import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Home from './Home';
import About from './About';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" exact component={About}/>
          <Route path="/login" exact component= {Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
    </div>
  );
}

export default App;
