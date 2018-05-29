import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {  signOut  } from '../../actions/userAuth-actions.js';
import Icon from '../helpers/icons';
import Avatar from '../helpers/avatar';
import { classToggler, renderIf } from '../../lib/util.js';


class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state={ visible: false, intro: false};
  }


  componentWillMount() {
    this.tokenCheck();
  }

  tokenCheck = () => {
    if(!this.props.userAuth) {
      let token;
      process.env.NODE_ENV === 'production' ? token = readCookie('Bracket-Busters-Token') : token = localStorage.token;  
      if(!token) this.setState({ introNav: true })
    }
    else {
      this.setState({ intro: false })
    }
  }

  handleSignOut = () => {
    this.props.signOut();
    this.props.history.push('/');
  };

  render() {
    let profileImage = this.props.userProfile && this.props.userProfile.image ? <Avatar url={this.props.userProfile.image} /> : <span><i className='fa fa-user colorChangeHover'></i> </span>;
    let profileLink = this.props.userProfile && this.props.userProfile._id ? `/user/${this.props.userProfile._id}` : '';
    return (
      <header className={util.classToggler({
        'navbar': true,
        'introNavbar': !this.props.userAuth,
      })}>
        <nav>
          <div className='logo'>
              <Link to='/' className={util.classToggler({ 'link': true, 'logo-text': true, 'intro-text': !this.props.userAuth })}><span className='bracket'>BRACKET</span><span className='light'>BUSTERS</span></Link>
          </div>
          <ul className='socials'>
            <li className='social dropdown'>
              {util.renderIf(this.props.userAuth,
                <div>
                  <div className='avatarDiv' onClick={() => this.setState({ visible: !this.state.visible })} >
                    <i className={this.props.userProfile && this.props.userProfile.image ? 'fa fa-caret-down colorChangeHover noTop' : 'fa fa-caret-down colorChangeHover' }></i>
                    {profileImage}
                  </div>
                  <div className={ this.state.visible ? 'slideIn dropdownDiv' : 'slideOut dropdownDiv' }>
                    <Link to={profileLink} className='link' onClick={() => this.setState({ visible: !this.state.visible })}>profile</Link>
                    <Link to='/leagues' className='link' onClick={() => this.setState({ visible: !this.state.visible })}>leagues</Link>
                    <Link to='/groups' className='link' onClick={() => this.setState({ visible: !this.state.visible })}>groups</Link>
                    <p className='logout link' onClick={this.handleSignOut}>logout</p>
                  </div>
                </div>
              )}
            </li>
            <li className='social'>
              <a href="https://github.com/brianbixby" rel="noopener noreferrer" target="_blank"><span><i className="fa fa-github social-icons"></i></span> </a>
            </li>
            <li className='social'>
              <a href="https://www.linkedin.com/in/brianbixby1/" rel="noopener noreferrer" target="_blank"><span><i className="fa fa-linkedin social-icons"></i></span></a>
            </li>
          </ul>
        </nav>
    </header>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

let mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);