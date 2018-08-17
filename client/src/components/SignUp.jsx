import React from 'react';
import { Grid, Button, Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default class SignUp extends React.Component {
  
  state = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  };
 
  setCookie = (token, token_timestamp, id) => {
    // params for cookie: (name of cookie, 
    // data in cookie, availability of cookie in app)
    const cookies = new Cookies;
    
    cookies.set(
      'token'
      , {
        'token': token, 
        'token_timestamp': token_timestamp,
        'id_user': id
      }
      , { path: '/' } 
    );
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    let formContents = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    console.log('CLIENT:signup:', formContents);
    axios({
      method: 'post',
      url: '/signup/create',
      data: { formContents }
    })
      .then(response => {
        this.setCookie(
          response.data.token
          , response.data.token_timestamp
          , response.data.id_user
        );
        console.log('CLIENT:response: ', response.data);
        // send the user back to <App />
        this.props.retrieveCurrentUser(response.data);

        // clear all input fields
        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          username: '',
          password: ''
        });
      })
      .catch(err => {
        console.error(err);
        // send back to '/signup'
      });
    
  }
  
  render () {
    return (
      <div>
        <div className="login_wrapper">
          <Grid>
            <Form horizontal>
              <FormGroup controlId="formHorizontalFirstName">
                <Col componentClass={ControlLabel} sm={2}>
                First Name
                </Col>
                <Col sm={10}>
                  <FormControl 
                    type="text"
                    name="firstname"
                    placeholder="Enter FirstName..." 
                    value={this.state.firstname}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalLastName">
                <Col componentClass={ControlLabel} sm={2}>
                  Last Name
                </Col>
                <Col sm={10}>
                  <FormControl 
                    type="text" 
                    name="lastname"
                    placeholder="Enter Last Name..." 
                    value={this.state.lastname}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                email
                </Col>
                <Col sm={10}>
                  <FormControl 
                    type="email"
                    name="email"
                    placeholder="Enter Email..."
                    value={this.state.email}
                    onChange={this.handleChange} 
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalUserName">
                <Col componentClass={ControlLabel} sm={2}>
                  Username
                </Col>
                <Col sm={10}>
                  <FormControl 
                    type="text" 
                    name="username"
                    placeholder="Enter Username..." 
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl 
                    type="password"
                    name="password"
                    placeholder="Enter Password..." 
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button 
                    type="submit"
                    onClick={this.handleSubmit}
                  >Create Your Account
                  </Button>
                </Col>
              </FormGroup>

              <div className="aTag_wrapper">
                <a href="/login" className="justSignIn">
                Already have an account? Sign in.
                </a>
              </div>

              <div className="oauth_wrapper">
                <p>or sign in with...</p>
                <a href="/auth/google"><Button>Sign in with Google</Button></a>
                <Button>Sign in with Facebook</Button>
              </div>
          
            </Form>;
          </Grid>
        </div>
      </div>
    );
  }
}