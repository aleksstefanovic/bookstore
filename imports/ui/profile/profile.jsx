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

export default class Profile extends Component {
    render() {
            return (
                    <div className="book-store-dark book-store-section">
                        <br />
                        <br />

                        <div className="container book-store-dark">
                          <button className="book-store-button" onClick={this.signOut}>SIGN OUT</button>
                        </div>
                    </div>
            );
    }

    signOut () {
        Meteor.call('logToConsole', "Signing out user " + Meteor.userId());
        Meteor.logout();
        browserHistory.push('/');
    }
}
