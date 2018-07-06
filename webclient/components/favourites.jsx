import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image, Button, Container } from 'semantic-ui-react';
import MyCard from './restaurant/child3.jsx';
let {browserHistory} = require('react-router');

class MyFavourites extends React.Component{
  constructor() {
    super();
    this.state = {
      objArray : []
    };
   // this.change = this.change.bind(this);
    this.getFavourites = this.getFavourites.bind(this);
    this.removeFavCard = this.removeFavCard.bind(this);
    this.updateComments = this.updateComments.bind(this);
  }

  getFavourites() {
    console.log(this.props.location.pathname);
    if(document.cookie=='')
    {
      this.refs.container.error('Please Sign Up/Log In', '', {
        timeOut: 1000,
        extendedTimeOut: 10000
      });
      setTimeout(function() {
       browserHistory.push('/home'); }.bind(this), 1000);
    }
    else{
    $.ajax({
			   url:"/restaurants/",
			 type:'POST',
       data: {user: document.cookie},
			 beforeSend: function (request)
									 {
											 request.setRequestHeader("user-key", "46a2eab73fc526624bab1d5a65c8001a");
									 },
			success: function(data)
			{
        if(data.length==0)
        {
          this.refs.container.error('No Favourites, Please add Restaurants', '', {
            timeOut: 2000,
            extendedTimeOut: 10000
          });
          setTimeout(function() {
           browserHistory.push('/home'); }.bind(this), 2000);
        }
        this.setState({
          objArray: data
        });
			}.bind(this),
			error: function(err)
			{
				console.log('error occurred on AJAX');
				console.log(err);
			}.bind(this)
		});
  }
  }



   removeFavCard(id){
       var favArray = this.state.objArray;
   var arr=[];
   console.log(JSON.stringify(favArray));
   for(var obj of favArray){
     if(obj._id!=id){
       arr.push(obj);
     }
   }
   this.setState({objArray : arr});
   }

   updateComments(id,comments){
   	var favArray = this.state.objArray;
      for (var obj of favArray) {
          if (obj._id === id) {
              obj.comments = comments;
          }
      }
      this.setState({objArray: favArray});
  }


  componentDidMount() {
    this.getFavourites();
  }
  //  change(){
  //   this.getFavourites();
  // }
  render () {
    let values = this.state.objArray;
    let methodRef = this.removeFavCard;
    let updateRef = this.updateComments;
 	// let chan=this.change.bind(this);
		let cards = values.map(function(item) {
				return (
			<div>
					<MyCard id={item._id} image={item.imageurl}
					name={item.resName} cuisines={item.resCuisines} location={item.resAddress}
					ratings={item.resRating} comment={item.comments} distance={item.distance}
          fav = "fav" remove={methodRef}
					update={updateRef}/>
			</div>
			);
		});

		return (
			<div style={{marginLeft: '50px'}}>
			<Card.Group itemsPerRow={2}>
				{cards}
			</Card.Group>
		</div>
		);
	}

}
module.exports = MyFavourites;
