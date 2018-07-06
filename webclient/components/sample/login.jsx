let React = require('react');
import { Button, Form, Header, Grid, Icon, Container, Image} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
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
  this.refs.container.error('Invalid User Name/ Password', '', {
    timeOut: 1000,
    extendedTimeOut: 10000
  });
}
registerAlert() {
  if(this.state.password != this.state.confirmPassword){
    this.refs.container.error('Password Mismatch', '', {
      timeOut: 1000,
      extendedTimeOut: 10000
    });
  }
  else{
  this.refs.container.error('Provide valid details', '', {
    timeOut: 1000,
    extendedTimeOut: 10000
  });
}
}
registerSuccessAlert() {
  this.refs.container.success('Successfully Registered', '', {
    timeOut: 3000,
    extendedTimeOut: 1000
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
 <ToastContainer ref='container' toastMessageFactory={ToastMessageFactory} className='toast-top-center'/>
 </Container>
</div>
);
}
}

module.exports=Login;
