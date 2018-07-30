import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Image, Button, Container, Divider } from 'semantic-ui-react';
import MyCard from './restaurantCard.jsx';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dbcalls from '../../interactors/internal/dbcalls.js';
var NavBar = require('../navbar/NavBar.jsx');

let {hashHistory} = require('react-router');

class MyFavourites extends React.Component{
  constructor() {
    super();
    this.state = {
      objArray : []
    };
    this.getFavourites = this.getFavourites.bind(this);
    this.removeFavCard = this.removeFavCard.bind(this);
    this.updateComments = this.updateComments.bind(this);
  }

  getFavourites() {
    console.log(this.props.location.pathname);
    if(document.cookie=='')
    {
      toast.error("Please Sign Up/Log In !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          transition: Flip,
           onClose: () => hashHistory.push('/home')
        });
    }
    else{
       var stateData =  {user: document.cookie}
			var successFunction = function(data)
			{
        if(data.length==0)
        {
          toast.error("No Favourites, Please add Restaurants !", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
              transition: Flip,
              onClose: () => hashHistory.push('/home')
            });
         }
         else
        {
          this.setState({
          objArray: data
        });
      }
			}
			var errorFunction = function(err)
			{
				console.log('error occurred on AJAX');
				console.log(err);
			}
      dbcalls.getFavourite(stateData, successFunction.bind(this), errorFunction.bind(this))

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
  render () {
    let values = this.state.objArray;
    let methodRef = this.removeFavCard;
    let updateRef = this.updateComments;
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
      <div>
      <NavBar activeItem = 'favourites'/>
      <br/>
      <Container>
      <Divider/>
       <ToastContainer closeButton={false} hideProgressBar/>
			<Card.Group>
				{cards}
			</Card.Group>
    </Container>
    </div>
		);
	}

}
module.exports = MyFavourites;
