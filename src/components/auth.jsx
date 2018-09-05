import React from 'react';
import PropTypes from 'prop-types';
import Firebase from '../services/firebase';
import AuthContext from '../contexts/auth-context';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    Firebase.auth().getRedirectResult()
      .then((result) => {
        this.setState({ user: result.user });
      }).catch(error => console.error(error));
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
    return (
      <>
        <AuthContext.Provider
          value={
            {
              user: this.state.user,
              handleSignIn: this.handleSignIn,
              handleSignOut: this.handleSignOut,
            }
          }
        >
          {this.props.children}
        </AuthContext.Provider>
      </>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;
