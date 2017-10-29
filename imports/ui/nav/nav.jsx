import React, {
    Component,
    PropTypes
} from 'react';
import {
    CartsDB
} from '../../api/carts.js';
import {
    createContainer
} from 'meteor/react-meteor-data';
import styles from './nav.css'

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark book-store-nav book-store-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link book-store-nav-hover book-store-nav-item" href="/">Home</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link book-store-nav-hover book-store-nav-item" href="/books?filter=fiction">Fiction</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link book-store-nav-hover book-store-nav-item" href="/books?filter=nonfiction">Non-Fiction</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link book-store-nav-hover book-store-nav-item" href="/books?filter=magazines">Magazines</a>
              </li>

            </ul>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link book-store-nav-hover book-store-nav-cart book-store-nav-item" href="/cart">CART <span>{this.props.cartCount}</span></a>
              </li>
              <li className="nav-item active" style={this.props.showSignIn}>
                <a className="nav-link book-store-button book-store-nav-item" href="/signin">SIGN IN</a>
              </li>
              <li className="nav-item active" style={this.props.showProfile}>
                <a className="nav-link book-store-button book-store-nav-item" href="/profile">PROFILE</a>
              </li>
            </ul>
          </div>
        </nav>
        );
    }
}

export default createContainer((props) => {
    var userObj = {
        user: Meteor.user(),
        cartCount: 0
    };
    if (userObj.user) {
        Meteor.call('logToConsole', "Showing user profile for " + JSON.stringify(userObj.user));
        userObj.showSignIn = {};
        userObj.showSignIn = {"display":"none"};

        var cartObj = CartsDB.findOne ({ "user": userObj.user._id});
        if (cartObj) {
           userObj.cartCount = cartObj.items.length; 
        }
    }
    else {
        Meteor.call('logToConsole', "No user signed in, showing sign in button");
        userObj.showProfile = {"display":"none"};
        userObj.showSignIn = {};
    }

    return userObj;
}, Nav)
