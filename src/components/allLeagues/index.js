import React from 'react';
import { connect } from 'react-redux';

import { signInRequest, tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';
import * as util from './../../lib/util.js';

class AllLeagues extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    util.userValidation(this.props);
  }

  render() {
    return (
      <section className='page-outer-div'>
        <p> all leagues page</p>
      </section>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

let mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch(signInRequest(user)),
    userProfileFetch: () => dispatch(userProfileFetchRequest()),
    tokenSignIn: token => dispatch(tokenSignInRequest(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllLeagues);