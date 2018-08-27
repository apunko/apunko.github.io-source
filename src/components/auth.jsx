import React from 'react';
import Firebase from '../services/firebase';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn() {
    Firebase.auth().signInWithPopup(new Firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log(result);
        this.setState({ user: result.user });
      })
      .catch(error => console.error(error));
  }

  handleSignOut() {
    this.setState({ user: null });
    Firebase.auth().signOut();
  }

  render() {
    return (
      <>
        {this.state.user}
        <button type="button" onClick={this.handleSignIn}>Sign in</button>
        <button type="button" onClick={this.handleSignOut}>Sign out</button>
      </>
    );
  }
}

export default Auth;
