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
import browserHistory from '../../startup/history.jsx';

class Checkout extends Component {
    render() {
        return (
                <div className="book-store-section">
                    <br/>
                    <br/>
                    <div className="container book-store-section">
                        <form onSubmit={this.finish.bind(this)}>
                            <div className="row">
                                <div className="col">
                                    <p>BILLING ADDRESS</p>
                                    <div className="form-group">
                                        <label className="col-form-label">ADDRESS 1</label>
                                        <input type="text" className="form-control" placeholder="Address 1" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">ADDRESS 2</label>
                                        <input type="text" className="form-control" placeholder="Address 2" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">POSTAL CODE</label>
                                        <input type="text" className="form-control" placeholder="Postal Code" />
                                    </div>
                                </div>

                                <div className="col">
                                    <p>SHIPPING ADDRESS</p>
                                    <div className="form-group">
                                        <label className="col-form-label">ADDRESS 1</label>
                                        <input type="text" className="form-control" placeholder="Address 1" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">ADDRESS 2</label>
                                        <input type="text" className="form-control" placeholder="Address 2" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">POSTAL CODE</label>
                                        <input type="text" className="form-control" placeholder="Postal Code" />
                                    </div>
                                </div>
                            </div> 
                            <br />
                            <div className="row">
                                <div className="col">
                                    <p>PAYMENT INFO</p>
                                    <div className="form-group">
                                        <label className="col-form-label">CREDIT CARD</label>
                                        <input type="text" className="form-control" placeholder="Credit Cart" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">CCV</label>
                                        <input type="text" className="form-control" placeholder="CCV" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">EXPIRY DATE</label>
                                        <input type="text" className="form-control" placeholder="Expiry Date" />
                                    </div>
                                    <br />
                                    <button className="btn-dark" ref="submit" type="submit">FINISH</button>
                                </div>
                            </div> 
                        </form>
                    </div>
                </div>
        );
    }

    finish () {
        if (this.props.cartObj.items.length != 0) {
            var newObj = this.props.cartObj;
            newObj.checkout = true;
            newObj.checkoutDate = new Date ();
            CartsDB.update ({"_id":this.props.cartObj._id}, newObj);
            browserHistory.push('/');
        }
    }
}

export default createContainer((props) => {
    var currentUser = Meteor.user();
    var cartObj = {};

    if (currentUser) {
        Meteor.call('logToConsole', "Showing user profile for " + JSON.stringify(currentUser));

        var obj = CartsDB.findOne (
            {
                "user": currentUser._id,
                "checkout": false
            }
        );
        if (obj) {
            cartObj = obj; 
        }
    }
    else {
        Meteor.call('logToConsole', "No user signed in");
    }
  
    return {"cartObj":cartObj};
}, Checkout)
