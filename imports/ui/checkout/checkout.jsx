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
                                        <input type="text" ref="billaddress1" className="form-control" placeholder="Address 1" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">ADDRESS 2</label>
                                        <input type="text" ref="billaddress2" className="form-control" placeholder="Address 2" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">POSTAL CODE</label>
                                        <input type="text" ref="billpostalcode" className="form-control" placeholder="Postal Code" />
                                    </div>
                                </div>

                                <div className="col">
                                    <p>SHIPPING ADDRESS</p>
                                    <div className="form-group">
                                        <label className="col-form-label">ADDRESS 1</label>
                                        <input type="text" ref="shipaddress1" className="form-control" placeholder="Address 1" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">ADDRESS 2</label>
                                        <input type="text" ref="shipaddress2" className="form-control" placeholder="Address 2" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">POSTAL CODE</label>
                                        <input type="text" ref="shippostalcode" className="form-control" placeholder="Postal Code" />
                                    </div>
                                </div>
                            </div> 
                            <br />
                            <div className="row">
                                <div className="col">
                                    <p>PAYMENT INFO</p>
                                    <div className="form-group">
                                        <label className="col-form-label">CREDIT CARD</label>
                                        <input type="text" ref="creditcard" className="form-control" placeholder="Credit Cart" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">CVV</label>
                                        <input type="text" ref="cvv" className="form-control" placeholder="CVV" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">EXPIRY DATE</label>
                                        <input type="text" ref="expirydate" className="form-control" placeholder="Expiry Date" />
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

            var billaddress1 = this.refs.billaddress1.value;
            var billaddress2 = this.refs.billaddress2.value;
            var billpostalcode = this.refs.billpostalcode.value;
            var shipaddress1 = this.refs.shipaddress1.value;
            var shipaddress2 = this.refs.shipaddress2.value;
            var shippostalcode = this.refs.shippostalcode.value;
            var creditcard = this.refs.creditcard.value;
            var cvv = this.refs.cvv.value;
            var expirydate = this.refs.expirydate.value;
    

            /*checkoutInfo.billingaddress.billaddress1 = billaddress1;
            checkoutInfo.billingaddress.billaddress2 = billaddress2;
            checkoutInfo.billingaddress.billpostalcode = billpostalcode;

            checkoutInfo.shippingaddress.shipaddress1 = shipaddress1;
            checkoutInfo.shippingaddress.shipaddress2 = shipaddress2;
            checkoutInfo.shippingaddress.shippostalcode = shippostalcode;

            checkoutInfo.paymentinfo.creditcard = creditcard;
            checkoutInfo.paymentinfo.cvv = cvv;
            checkoutInfo.paymentinfo.expirydate = expirydate;*/

            if (!billaddress1 || !billpostalcode ||
                !shipaddress1 || !shippostalcode ||
                !creditcard || !cvv || !expirydate) {
                
                alert ("All fields are mandatory!");
            }
            else {
                var checkoutInfo = {
                    "billingaddress":{
                        "billaddress1":billaddress1,
                        "billaddress2":billaddress2,
                        "billpostalcode":billpostalcode
                    }, 
                    "shippingaddress":{
                        "shipaddress1":shipaddress1,
                        "shipaddress2":shipaddress2,
                        "shippostalcode":shippostalcode
                    }, 
                    "paymentinfo":{
                        "creditcard":creditcard,
                        "cvv":cvv,
                        "expirydate":expirydate
                    }
                };
                newObj.checkoutInfo = checkoutInfo;
                CartsDB.update ({"_id":this.props.cartObj._id}, newObj);
                browserHistory.push('/');
            }
        }
        else {
            alert ("Nothing in cart to checkout with");
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
