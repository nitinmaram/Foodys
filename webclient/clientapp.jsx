var React = require('react');
var ReactDOM = require('react-dom');
import { Header,Icon, Button, Container} from 'semantic-ui-react';
var {hashHistory, Route, Router, IndexRoute} = require('react-router');
var NavBar = require('./components/navbar/NavBar.jsx');
var Home = require('./components/container.jsx');
var fav = require('./components/restaurant/favourites.jsx');
import Login from './components/login/login.jsx'

ReactDOM.render(
  <Router history={hashHistory}>
          <Route path="/" component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/fav" component={fav}/>
  </Router>,document.getElementById('mountapp'));
