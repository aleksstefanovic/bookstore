import React, {
    Component
} from 'react';
import {
    Meteor
} from 'meteor/meteor';
import {
    createContainer
} from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo'
import browserHistory from '../../startup/history.jsx';
import styles from './signin.css'

export default class SignIn extends Component {
    render() {
            return (
                    <div className="book-store-dark book-store-section">
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="container book-store-dark">
                          <div className="form-group">
                            <label className="col-form-label book-store-light">USERNAME</label>
                            <input type="text" ref="userName" className="form-control book-store-input" placeholder="Username..." />
                          </div>

                          <div className="form-group">
                            <label className="col-form-label book-store-light">PASSWORD</label>
                            <input type="password" ref="password" className="form-control book-store-input" placeholder="Password..." />
                          </div>

                          <br />
                          <button className="book-store-button" onClick={this.signIn.bind(this)}>SIGN IN</button>
                          <br />
                          <br />
                          <button className="book-store-button" onClick={this.goCreateAccount}>CREATE ACCOUNT</button>
                        </div>
                    </div>
            );
    }

    goCreateAccount () {
        browserHistory.push('/createaccount');
    }

    signIn () {
        var userName = this.refs.userName.value;
        var password = this.refs.password.value;

        Meteor.loginWithPassword (userName, password, (error) => {
            if (error) {
                Meteor.call('logToConsole', "ERROR: " + error);
                alert("ERROR: " + JSON.stringify(error));
            } else {
                Meteor.call('logToConsole', "SUCCESSFUL sign in for user " + Meteor.userId());
                browserHistory.push('/profile');
            }
        });
    }
}
