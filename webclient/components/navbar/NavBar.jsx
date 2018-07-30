import React, {Component} from 'react'
import {Input, Menu, Segment, Button, Header, Icon} from 'semantic-ui-react'
let {hashHistory, Link} = require('react-router');
import dbcalls from '../../interactors/internal/dbcalls.js'

class MenuExamplePointing extends Component {

  constructor(props){
    super(props);
    console.log(this.props.activeItem);
    this.state = {
      activeItem: this.props.activeItem || 'home'
    }
  }

   handleItemClick = (e, {name}) => this.setState({activeItem: name})
   logOut(){
        var successFunction = function() {
          console.log('cookies');
          document.cookie = "username = ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
          setTimeout(() => {hashHistory.push('/')}, 1000)
        }.bind(this)
        var errorFunction = function(err) {
            console.log('error in logout'+err);
        }.bind(this)
        dbcalls.logoutUser(successFunction,errorFunction)
  }
  reDirect(){
    hashHistory.push('/')
  }
   render() {
       const {activeItem} = this.state
       var logBut = ''
       if(document.cookie =='')
       {
       logBut = (<Button  size='large' color='blue' onClick={this.reDirect.bind(this)}>Sign In/Log In</Button>);
     }
       else{
       logBut = (<Button  size='large' color='red' onClick={this.logOut.bind(this)}>Logout</Button>);
     }
       return (
           <div>
               <Menu secondary>
                   <Link to='/home'>
                       <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                       <Header as='h5' icon color='orange' textAlign='center'><Icon name='cocktail'/>Foodies</Header>
                       </Menu.Item>
                   </Link>
                   <Menu.Item/>
                   <Link to='/fav'>
                       <Menu.Item name='favourites' active={activeItem === 'favourites'} onClick={this.handleItemClick}>
                       <Header as='h5'icon color='red' textAlign='center'><Icon name='heart'/>Favourites</Header>
                       </Menu.Item>
                   </Link>
                   <Menu.Menu position='right'>
                       <Menu.Item>
                          {logBut}
                       </Menu.Item>
                   </Menu.Menu>
               </Menu>
           </div>
       )
   }
}
module.exports = MenuExamplePointing;
