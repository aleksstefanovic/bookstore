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
import {
    CartsDB
} from '../../api/carts.js';
import {
    BooksDB
} from '../../api/books.js';
import TransRow from '../../components/transRow/transRow.jsx';
import { Mongo } from 'meteor/mongo'

class Profile extends Component {
    render() {
            return (
                    <div className="book-store-section">
                        <br />
                        <br />

                        <div className="container book-store-section">
                            <p>{this.props.username}</p>
                            <br/>

                            <p>PAST TRANSACTIONS</p>
                            <table className="table table-responsive">
                              <tbody>   
                                {this.renderTransRow()}
                              </tbody>
                            </table>                        
                            <button className="btn-dark" onClick={this.signOut}>SIGN OUT</button>
                        </div>
                    </div>
            );
    }

    renderTransRow () {
        return this.props.trans.map((trans) => (
            <TransRow id={trans._id} key={trans._id} transRow={trans} />
        ));
    }

    signOut () {
        Meteor.call('logToConsole', "Signing out user " + Meteor.userId());
        Meteor.logout();
        browserHistory.push('/');
    }
}

export default createContainer((props) => {
    var currentUser = Meteor.user();
    var obj = {"trans":[], "username":""};

    if (currentUser) {
        obj.username = currentUser.username;
        Meteor.call('logToConsole', "Showing user profile for " + JSON.stringify(currentUser));

        var transCursor = CartsDB.find (
            {
                "user": currentUser._id,
                "checkout": true
            }
        );
        transCursor.forEach(function(transObj) {
            var total = 0.00;
            for (var i=0; i < transObj.items.length; i++) {
                var itemObj = BooksDB.findOne ({"_id":transObj.items[i].itemId}); 
                total = total + parseInt(transObj.items[i].qty) * parseInt(itemObj.cost);
            } 
            transObj.total = total;

            var checkoutDate = transObj.checkoutDate;
            
            if (checkoutDate) {
                var dateString =
                    checkoutDate.getUTCFullYear() +"-"+
                    ("0" + (checkoutDate.getUTCMonth()+1)).slice(-2) +"-"+
                    ("0" + checkoutDate.getUTCDate()).slice(-2);
                transObj.checkoutDate = dateString;
            }

            obj.trans.push(transObj);
        });

    }
    else {
        Meteor.call('logToConsole', "No user signed in");
    }
  
    return obj;
}, Profile)
