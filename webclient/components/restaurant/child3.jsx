import React from 'react'
import {Button} from 'semantic-ui-react'
import { Card, Icon, Image, Input, Container} from 'semantic-ui-react'
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
class Child3 extends React.Component {
    constructor() {

        super();
        this.sendData = this.sendData.bind(this);
        this.state={addButton:'Add',updateButton:'Update'}
      }
  sendData(){
    if(document.cookie==''){
      this.refs.container.error('Please Sign Up/Log In', '', {
        timeOut: 1000,
        extendedTimeOut: 10000
      });
    }
    else{
   let resdata = {
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
   console.log(JSON.stringify(resdata,undefined,2));
   $.ajax({
     url : "/restaurants/add",
     type : 'POST',
     data : resdata,
     success: function(data) {
      this.setState({'addButton':'Added to your Fav'})
         console.log(data);
       }.bind(this),
     error: function(xhr, status, err) {
         console.error(this.props.url, status, err.toString());
       }.bind(this)
   });
 }
}
   deleteData(){
    // f = this.props.remove;
   console.log(this.props.location);
   $.ajax({
     url : "/restaurants/delete",
     type : 'DELETE',
     data :  {resId : this.props.id},
     success: function(data) {
      this.props.remove(this.props.id);
        // f(this.props.id);
         console.log(data);
       }.bind(this),
     error: function(xhr, status, err) {
         console.error(this.props.url, status, err.toString());
       }.bind(this)
   });
 }
updateComments(evt){
   this.setState({comments : evt.target.value});
   this.update1();
   console.log(this.state.comments);
 }
update1() {
  // let f = this.props.func;
   $.ajax({
     url:'/restaurants/update/'+this.props.id,
     type: 'patch',
     data:{"comments": this.state.comments},
     success: function(data){
      // f();
      this.props.update(this.props.id,this.state.comments);
      this.setState({'updateButton':'Updated'})
       console.log(this.props.id);
       console.log('Successfully updated' + data);
     }.bind(this),
     error: function(err){
       console.log('error occurred on AJAX');
       console.log(err);
     }
   });
 }
      render()
      {

        var but = "";
        var comm="";
        if(this.props.fav === "fav") {
          but = (
            <div>
            <Input placeholder={this.props.comment} fluid onChange={this.updateComments.bind(this)}
            />
            <Button primary onClick={this.deleteData.bind(this)}>Delete</Button>
            <Button primary onClick={this.update1.bind(this)}>{this.state.updateButton}</Button>
             </div>
            );
          comm=(<div><Card.Description className="com">comment:{this.props.comment}</Card.Description></div>);

        }
        else {
          but = (
            <Button primary onClick={this.sendData.bind(this)}>{this.state.addButton}</Button>
            );
        }
        return(
  <Card>
  <Image src={this.props.image} alt="Image not available" className="cardimage"/>
  <Card.Content>
    <Card.Header className="head">{this.props.name}</Card.Header>
    <Card.Meta className="cus">{this.props.cuisines}</Card.Meta>
    <Card.Description className="desc">{this.props.location}</Card.Description>
    {comm}
    <h5 style={{marginTop:'-5px'}}>{this.props.distance} m away</h5>
    <a href={'https://www.google.com/maps/dir/'+this.props.lat+','+this.props.lon+'/'+this.props.lat1+','+this.props.lon1}
    target="_blank">
    <Icon name='location arrow'/>
    Navigate
    </a>
  </Card.Content>
  <Card.Content extra>
    <a>
      <Icon name='user' className="rate"/>
      {this.props.ratings}/5 ratings
    </a>
    <div className="commentText">
    {but}
    </div>
  </Card.Content>
  <ToastContainer ref='container' toastMessageFactory={ToastMessageFactory} className='toast-top-center'/>
  </Card>
        )
      }
    }
    Child3.propTypes = {
      id: React.PropTypes.object,
      name: React.PropTypes.object,

}
    module.exports=Child3;
