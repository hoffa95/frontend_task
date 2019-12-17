import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './helpers/PrivateRoute';
import Profile from './components/Profile';
import store from "./store";
import history from "./helpers/history";
import { StoreProvider } from 'easy-peasy';
import NewArticle from './components/NewArticle';
import Article from './components/Article';

class App extends Component {
  render() {
    return (
      <StoreProvider store={store} >
        <div className="App">
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute path="/newarticle/:slug" component={NewArticle} />
              <PrivateRoute path="/newarticle/" component={NewArticle} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path='/articles/:slug' component={Article}/>
              <Redirect from="*" to="/login" />
            </Switch>
          </Router>
        </div>
      </StoreProvider>
    );
  }
}

export default App;