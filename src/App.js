import React, { Component } from 'react';
// The same as: var GoogleContacts = require('google-contacts').GoogleContacts;
import {GoogleContacts} from 'google-contacts';

import './App.css';

class App extends Component {

  handleClientLoad() {
    // Loads the client library and the auth2 library together for efficiency.
    // Loading the auth2 library is optional here since `gapi.client.init` function will load
    // it if not already loaded. Loading it upfront can save one network request.
    gapi.load('client:auth2', initClient);
  }

  initClient() {
    // Initialize the client with API key and People API, and initialize OAuth with an
    // OAuth 2.0 client ID and scopes (space delimited string) to request access.
    gapi.client.init({
        apiKey: 'AIzaSyCuuKIxKPs1kgYNu6megRiWPM7g0Wuj5Pg',
        discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        clientId: '872005603268-02af44imjn6jejsu2nl8km3k5q23poqv.apps.googleusercontent.com',
        scope: 'profile'
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }
  updateSigninStatus(isSignedIn) {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    if (isSignedIn) {
      makeApiCall();
    }
  }
  handleSignInClick(event) {
    // Ideally the button should only show up after gapi.client.init finishes, so that this
    // handler won't be called before OAuth is initialized.
    gapi.auth2.getAuthInstance().signIn();
  }
  handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }
  makeApiCall() {
    // Make an API call to the People API, and print the user's given name.
    gapi.client.people.people.get({
      resourceName: 'people/me'
    }).then(function(response) {
      console.log('Hello, ' + response.result.names[0].givenName);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  }

  componentDidMount() {
    this.getContacts()
  }

  getContacts = () => {
    const gc = new GoogleContacts({
      token:
    })
  }

  render() {
    return (
      <div>
        <button id="signin-button" onclick="handleSignInClick()">Sign In</button>
        <button id="signout-button" onclick="handleSignOutClick()">Sign Out</button>
      </div>
    );
  }
}
export default App;