import React from 'react'
import {Button} from 'semantic-ui-react'
import { Card, Icon, Image, Input, Container} from 'semantic-ui-react'
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dbcalls from '../../interactors/internal/dbcalls.js'

class RestaurantCard extends React.Component {
    constructor() {
        super();
        this.sendData = this.sendData.bind(this);
        this.state={addButton:'Add',updateButton:'Update'}
      }
  sendData(){
    if(document.cookie==''){
      toast.error("Please Sign Up/Log In !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    }
    else{
   var stateData = {
      _id : this.props.id,
     imageurl : this.props.image,
     resName : this.props.name,
     resCuisines : this.props.cuisines,
     resAddress : this.props.location,
     resRating : this.props.ratings,
     comments : this.props.comment,
     distance : this.props.distance,
     user: document.cookie
   }
     var successFunction = function(data) {
      this.setState({'addButton':'Added to your Fav'})
         console.log(data);
       }.bind(this)
     var errorFunction = function(xhr, status, err) {
         console.error(this.props.url, status, err.toString());
       }.bind(this)
       dbcalls.addFavourites(stateData, successFunction, errorFunction)
 }
}
   deleteData(){
     var stateData =  {resId : this.props.id}
     var successFunction = function(data) {
      this.props.remove(this.props.id);
         console.log(data);
       }.bind(this)
     var errorFunction = function(xhr, status, err) {
         console.error(this.props.url, status, err.toString());
       }.bind(this)
       dbcalls.deleteFavourite(stateData, successFunction, errorFunction)
 }
commentsChange(evt){
   this.setState({comments : evt.target.value});
 }
updateComments() {
     var stateData = {
       'id': this.props.id,
       'comments': this.state.comments
     }
     var successFunction = function(data){
      this.props.update(this.props.id,this.state.comments);
      // this.setState({'updateButton':'Updated'})
     }.bind(this)
     var errorFunction = function(err){
       console.log('error occurred on AJAX');
       console.log(err);
     }
   dbcalls.updateComments(stateData, successFunction, errorFunction)
 }
      render()
      {

        var but = "";
        var comm="";
        if(this.props.fav === "fav") {
          but = (
            <div>
            <Input placeholder= 'Comments' fluid onChange={this.commentsChange.bind(this)}
            /><br/>
            <Button primary onClick={this.deleteData.bind(this)}>Delete</Button>
            <Button primary onClick={this.updateComments.bind(this)}>{this.state.updateButton}</Button>
             </div>
            );
          comm=(<div><Card.Description className="com"><h5>comments : {this.props.comment}</h5></Card.Description></div>);

        }
        else {
          but = (
            <Button primary onClick={this.sendData.bind(this)}>{this.state.addButton}</Button>
            );
        }
        return(
  <Card style = {{height: 'auto'}}>
  <Image src={this.props.image} alt="Image not available" className="cardimage"/>
  <Card.Content>
    <Card.Header className="head">{this.props.name}</Card.Header>
    <Card.Meta >{this.props.cuisines}</Card.Meta>
    <Card.Meta style = {{color: 'green'}}>Avg. Cost <span style = {{color: 'red', fontWeight: 'bold'}}>Rs {this.props.cost}</span> (2 ppl)</Card.Meta>
    <Card.Description className="desc">{this.props.location}</Card.Description>
    {comm}
    <br/>
    <h3 style={{marginTop:'-5px'}}>{this.props.distance} m away</h3>
    <a href={'https://www.google.com/maps/dir/'+this.props.lat+','+this.props.lon+'/'+this.props.lat1+','+this.props.lon1}
    target="_blank">
    <Icon name='location arrow'/>
    Navigate
    </a>
  </Card.Content>
  <Card.Content extra>
    <a>
      <Icon name='user' className="rate"/>
      {this.props.ratings}/5 ratings ({this.props.votes})
    </a>
    <div className="commentText">
    {but}
    </div>
  </Card.Content>
  <ToastContainer closeButton={false} hideProgressBar transition={Zoom}/>
  </Card>
        )
      }
    }
    RestaurantCard.propTypes = {
      id: React.PropTypes.object,
      name: React.PropTypes.object,
}
module.exports=RestaurantCard;
