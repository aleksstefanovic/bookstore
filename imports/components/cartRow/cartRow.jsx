import React, {
    Component,
    PropTypes
} from 'react';
import {
    CartsDB
} from '../../api/carts.js';
import browserHistory from '../../startup/history.jsx';

export default class CartRow extends Component {
    render() {
        return (
                <tr>
                  <td>
                    <button style={this.props.cartRow.enableChange} className="btn-dark" type="submit" onClick={this.removeItem.bind(this)}>X</button>
                  </td>
                  <td>
                    <button className="btn-dark" type="submit" onClick={this.viewBook.bind(this)}>VIEW</button>
                  </td>
                  <td>{this.props.cartRow.obj.title}</td>
                  <td>
                    <img className="book-store-row-image" src={this.props.cartRow.obj.image} alt="Book Image" />
                  </td>
                  <td style={this.props.cartRow.enableChange}><input className="book-store-small-input" type="number" ref="qty" defaultValue={this.props.cartRow.qty} onChange={this.newQty.bind(this)}/></td>
                  <td style={this.props.cartRow.disableChange}>{this.props.cartRow.qty}</td>
                  <td>${this.props.cartRow.obj.cost}</td>
                </tr>
        );
    }

    newQty () {
        var cartObj = CartsDB.findOne ({"_id":this.props.cartRow.cartId});
        if (this.refs.qty.value) {
            Meteor.call ('findItem', this.props.cartRow.itemId, cartObj.items,  (error, result) => {
                var index = parseInt(result);
                cartObj.items[index].qty = parseInt(this.refs.qty.value);
                CartsDB.update ({"_id":cartObj._id}, cartObj);
            });
        }
    }

    removeItem () {
        var cartObj = CartsDB.findOne ({"_id":this.props.cartRow.cartId});
        Meteor.call ('findItem', this.props.cartRow.itemId, cartObj.items,  (error, result) => {
            var index = parseInt(result);
            cartObj.items.splice (index, 1);
            CartsDB.update ({"_id":cartObj._id}, cartObj);
        });
    }

    viewBook() {
        var id = this.props.cartRow.itemId;
        browserHistory.push('/books/' + id);
    }
}

CartRow.propTypes = {
    cartRow: PropTypes.object
};

