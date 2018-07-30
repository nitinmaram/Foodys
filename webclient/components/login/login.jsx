let React = require('react');
import { Button, Form, Header, Grid, Icon, Container, Image} from 'semantic-ui-react';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let {hashHistory} = require('react-router');
import dbcalls from '../../interactors/internal/dbcalls.js'

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
ajaxErrorAlert() {
  toast.error("Server down please try after some time !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      transition: Flip
    });
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
  toast.success("Successfully Registered !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      onClose: () => hashHistory.push('/home')
    });
}
withoutSignUp(){
  // document.cookie='username = '+this.state.username
  hashHistory.push('/home');
}
LoginUser(){
  let context = this

  var stateData = {
    'username':this.state.username,
    'password':this.state.password
  }
  var successFunction = function(res) {
    if(res.responseText == "authenticated"){
    hashHistory.push('/home');
    document.cookie = 'username = '+context.state.username
    }
    else
    context.loginAlert();
  }

  var errorFunction = function(err){
        console.log(err);
        ajaxErrorAlert.bind(this)
    }

  dbcalls.loginUser(stateData, successFunction.bind(this), errorFunction.bind(this))
}
registerUser(){
  this.setState({heading: 'Register', reg: true, log: true});
  if(this.state.reg)
  {
    let context = this
    if(this.state.username !='' && this.state.password != '' && this.state.password == this.state.confirmPassword){
      var stateData = {
        'username':this.state.username,
        'password':this.state.password,
        'name': this.state.name
      }
      var successFunction = function(res){
        context.setState({heading: '', reg: false, log: false
      });
      document.cookie = 'username = '+context.state.username
       context.registerSuccessAlert();
      }
      var errorFunction = function(err){
        this.setState({heading: '', reg: false, log: false});
        context.registerAlert();
        console.log(err.responseText);
      }

      dbcalls.addUser(stateData, successFunction.bind(this),errorFunction.bind(this))

    }
      else
      {
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
