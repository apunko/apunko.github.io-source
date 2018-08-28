import React from 'react';
import PropTypes from 'prop-types';
import Firebase from '../services/firebase';

const { Provider } = React.createContext();

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    Firebase.auth().getRedirectResult()
      .then((result) => {
        this.setState({ user: result.user });
      }).catch(error => console.error(error));

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn() {
    Firebase.auth().signInWithRedirect(new Firebase.auth.GoogleAuthProvider())
      .then((result) => {
        this.setState({ user: result.user });
      })
      .catch(error => console.error(error));
  }

  handleSignOut() {
    this.setState({ user: null });
    Firebase.auth().signOut();
  }

  render() {
    console.log(this.state.user);
    return (
      <>
        <Provider value={this.state.user}>
          <button type="button" onClick={this.handleSignIn}>Sign in</button>
          <button type="button" onClick={this.handleSignOut}>Sign out</button>
          {this.props.children}
        </Provider>
      </>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;
