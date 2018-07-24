let React = require('react');
import { Button, Form, Header, Grid, Icon, Container, Image} from 'semantic-ui-react';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let {browserHistory} = require('react-router');

class Login extends React.Component {
  constructor() {
      super();
      this.state={username:'',password:'',
      name: '', confirmPassword: '',
      isLoggedIn:'',
      heading: '',
      reg: false,
      log: false,
      formControl: 'login',
      passStatus: '',
      passColor: 'red'
    };
    this.loginAlert = this.loginAlert.bind(this);
    this.registerAlert = this.registerAlert.bind(this);
    this.registerSuccessAlert = this.registerSuccessAlert.bind(this);
  }
  handleName(e){
    this.setState({name:e.target.value})
  }
handleUserName(e)
{
this.setState({username:e.target.value});
}
handlePassword(e)
{
this.setState({password:e.target.value});
}
handleConfirmPassword(e)
{
  const { name, value } = e.target;

  this.setState({
      confirmPassword: value
    }, function() {
      if(this.state.password==this.state.confirmPassword)
      {
        this.setState({passStatus:'Passwords match',passColor:'green'})
      }
      else
      {
        this.setState({passStatus:'Passwords does not match',passColor:'red'})
      }
    })
}
loginAlert() {
  toast.error("Invalid User ID or Password !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      transition: Flip
    });
}
registerAlert() {
  if(this.state.password != this.state.confirmPassword){
    toast.error("Password Mismatch !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  }
  else{
    toast.error("Enter Valid Details !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
}
}
registerSuccessAlert() {
  toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
}
withoutSignUp(){
  document.cookie=this.state.username
  browserHistory.push('/home');
}
LoginUser(){
  let context = this
$.ajax({
 url:"/users/login",
 type: 'POST',
 datatype: 'JSON',
 data:{
   'username':this.state.username,
   'password':this.state.password
 },
 success: function(res){

   console.log(res.responseText);
   if(res.responseText == "authenticated"){
   browserHistory.push('/home');
   document.cookie = context.state.username
 }
   else
   context.loginAlert();
 },
 error: function(err){
  alert("Invalid username or password");
   browserHistory.push('/');
   console.log(err.responseText);
 }
});
}
registerUser(){
  this.setState({heading: 'Register', reg: true, log: true});
  if(this.state.reg)
  {
    let context = this
    if(this.state.username !='' && this.state.password != '' && this.state.password == this.state.confirmPassword){
$.ajax({
 url:"/users/add",
 type: 'POST',
 datatype: 'JSON',
 data:{
   'username':this.state.username,
   'password':this.state.password,
   'name': this.state.name
 },
 success: function(res){
   context.setState({heading: '', reg: false, log: false
 });
 document.cookie = context.state.username
  context.registerSuccessAlert();
    setTimeout(function() {
     browserHistory.push('/home'); }.bind(this), 2000);
 },
 error: function(err){
   this.setState({heading: '', reg: false, log: false});
   context.registerAlert();
   console.log(err.responseText);
 }
});
}
else{
  context.registerAlert();
}
}

}
render(){
  var formControl='';
  if(this.state.heading==''){
  formControl=(  <Form>
   <Form.Group widths={2}>
     <Form.Input hidden placeholder='User Name' onChange={this.handleUserName.bind(this)} />
     <Form.Input placeholder='Password' onChange={this.handlePassword.bind(this)} type="password" />
   </Form.Group>
   </Form>);
 }
 else{
formControl=(   <Form>
<Form.Group widths={2}>
  <Form.Input placeholder='Name' onChange={this.handleName.bind(this)} />
  <Form.Input placeholder='User Name' onChange={this.handleUserName.bind(this)} />
  </Form.Group>
  <Form.Input placeholder='Password' onChange={this.handlePassword.bind(this)} type="password" />
  <Form.Input placeholder='Confirm Password' onChange={this.handleConfirmPassword.bind(this)} type="password" />
  <span style={{color:this.state.passColor}}>{this.state.passStatus}</span>
</Form>
);
 }
 return(
   <div>
 <Container>
 <ToastContainer closeButton={false} hideProgressBar/>
 <Grid centered columns={2}>
  <Grid.Column>
  <Image src = {require('./FoodiesLogo.png')}/>
  <br/>
    {formControl}
    <br/>
   <Button disabled ={this.state.log} onClick={this.LoginUser.bind(this)}>Login</Button>
   <Button onClick={this.registerUser.bind(this)}>Register</Button>
   <h5 onClick={this.withoutSignUp.bind(this)} style={{cursor:'pointer', color:'orange'}}>Continue without signup ?</h5>
   </Grid.Column>
 </Grid>
 </Container>
</div>
);
}
}

module.exports=Login;
