import React, {
    Component,
    PropTypes
} from 'react';
import {
    CartsDB
} from '../../api/carts.js';
import {
    BooksDB
} from '../../api/books.js';
import {
    createContainer
} from 'meteor/react-meteor-data';
import browserHistory from '../../startup/history.jsx';
import CartRow from '../../components/cartRow/cartRow.jsx';

class Carts extends Component {
    render() {
        return (
                <div className="book-store-section">
                    <br/>
                    <br/>
                    <div className="container book-store-section">
                        <p>{this.props.orderTitle}</p>
                        <br/>
            
                        <table className="table table-responsive">
                          <tbody>   
                            {this.renderCartRow()}
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>TOTAL</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>${this.props.total}</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <button className="btn-dark" type="submit" onClick={this.checkout.bind(this)}>CHECKOUT</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>                        
                    </div>
                </div>
        );
    }
    
    checkout () {
        browserHistory.push('/checkout');
    }

    renderCartRow () {
        return this.props.items.map((cartRow) => (
            <CartRow id={cartRow.itemId} key={cartRow.itemId} cartRow={cartRow} />
        ));
    }
}

export default createContainer((props) => {
    var currentUser = Meteor.user();
    var cartObj = {"items":[], "total":0.00};

    if (currentUser) {
        Meteor.call('logToConsole', "Showing user profile for " + JSON.stringify(currentUser));

        var search = props.location.pathname;
        var searchParam = search.split("/")[2]; 
        var obj = null;

        if (searchParam) {
            obj = CartsDB.findOne ({"_id":searchParam});
            if (obj) {
                obj.orderTitle = "PAST ORDER";
                if (obj.user != currentUser._id) {
                   obj = null; 
                }
            }
        }
        else {
            obj = CartsDB.findOne (
                {
                    "user": currentUser._id,
                    "checkout": false
                }
            );
            if (obj) {
                obj.orderTitle = "CURRENT ORDER";
            }
        }

        if (obj) {
            cartObj = obj; 
            var total = 0.00;
            for (var i=0; i < cartObj.items.length; i++) {
                var itemObj = BooksDB.findOne ({"_id":cartObj.items[i].itemId}); 
                cartObj.items[i].obj = itemObj;

                total = total + parseInt(cartObj.items[i].qty) * parseInt(cartObj.items[i].obj.cost);
            } 
            cartObj.total = total;
        }
    }
    else {
        Meteor.call('logToConsole', "No user signed in");
    }
  
    return cartObj;
}, Carts)
