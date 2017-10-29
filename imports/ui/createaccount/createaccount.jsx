import React, {
    Component
} from 'react';
import {
    Meteor
} from 'meteor/meteor';
import {
    createContainer
} from 'meteor/react-meteor-data';
import browserHistory from '../../startup/history.jsx';
import { Mongo } from 'meteor/mongo'

export default class CreateAccount extends Component {
    render() {
            return (
                    <div className="book-store-dark book-store-section">
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="container book-store-dark">
                          <div className="form-group">
                            <label className="col-form-label book-store-light">EMAIL</label>
                            <input type="text" ref="email" className="form-control book-store-input" placeholder="Email..." />
                          </div>

                          <div className="form-group">
                            <label className="col-form-label book-store-light">USERNAME</label>
                            <input type="text" ref="userName" className="form-control book-store-input" placeholder="Username..." />
                          </div>

                          <div className="form-group">
                            <label className="col-form-label book-store-light">PASSWORD</label>
                            <input type="password" ref="password" className="form-control book-store-input" placeholder="Password..." />
                          </div>

                          <div className="form-group">
                            <label className="col-form-label book-store-light">PASSWORD (REPEAT)</label>
                            <input type="password" ref="password2" className="form-control book-store-input" placeholder="Password..." />
                          </div>

                          <br />
                          <button className="book-store-button" onClick={this.createUser.bind(this)}>CREATE ACCOUNT</button>
                        </div>
                    </div>
            );
    }

    createUser () {
        var userName = this.refs.userName.value;
        var password = this.refs.password.value;
        var password2 = this.refs.password2.value;
        var email = this.refs.email.value;

        if (password == password2) {

            Meteor.call ('createNewUser', email, userName, password,  (error, result) => {
                        if (error) {
                            Meteor.call('logToConsole', "ERROR: " + error);
                            alert("ERROR: " + JSON.stringify(error));
                        } else {
                            Meteor.call('logToConsole', "SUCCESSFUL create new user");
                            Meteor.loginWithPassword(email, password, (error) => {
                                if (error) {
                                    Meteor.call('logToConsole', "ERROR: " + error);
                                    alert("ERROR: " + JSON.stringify(error));
                                } else {
                                    Meteor.call('logToConsole', "SUCCESSFUL sign in for user " + Meteor.userId());
                                    browserHistory.push('/profile');
                                }
                            });
                        }
                    });
        }
        else {
           alert("Passwords don't match!"); 
        }
    }
}
