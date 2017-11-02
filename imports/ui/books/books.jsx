import React, {
    Component
} from 'react';
import {
    Meteor
} from 'meteor/meteor';
import {
    BooksDB
} from '../../api/books.js';
import {
    CartsDB
} from '../../api/carts.js';
import {
    createContainer
} from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo'
import BookCard from '../../components/bookCard/bookCard.jsx';
import styles from './books.css';

class Books extends Component {
    renderBooks() {
        if (this.props.bookCards.length === 0) {
            return (
                    <p className="book-store-light">There are no books for your chosen filters.</p>
                );
        } 
        else {
        return this.props.bookCards.map((card) => (
            <BookCard id={card._id} key={card._id} book={card} />
        ))};
    }

    render() {
        if (this.props.book) {
            return (
                <div className="book-store-books-section">
                    <br/>
                    <br/>
                    <div className="container book-store-books-section">
                        <div className="row">
                            <div className="col-5">
                                <h4>{this.props.book.title}</h4>
                                <h5>{this.props.book.author}</h5>
                                <p>{this.props.book.shortDescription}</p> 
                                <p>{this.props.book.longDescription}</p>
                            </div>
                            <div className="col-5">
                                  <img className="book-store-image" src={this.props.book.image} alt="Book Image" />
                            </div>

                        </div>
                            <p>${this.props.book.cost}</p>
                            <div className="row">
                                <div className="col-4">
                                    <input type="number" ref="qty" className="form-control book-store-book-qty" />
                                </div>
                                <div className="col-4">
                                    <button className="btn-dark" type="submit" onClick={this.addToCart.bind(this)}>ADD TO CART</button>
                                </div>
                            </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="book-store-books-section book-store-dark">
                    <br/>
                    <br/>
                    <div className="container book-store-books-section book-store-dark">
                        <div className="row">
                            {this.renderBooks()}
                        </div>
                    </div>
                </div>
            );
        }
    }

    addToCart () {
        var currentUser = Meteor.user ();
        
        if (currentUser) {
            var qty = parseInt(this.refs.qty.value);

            if (qty < 0 || !qty) {
                alert("Must add at least one quantity to cart!");
            }
            else {
                var userId = currentUser._id;
                var cartObj = CartsDB.findOne (
                    {
                        "user":userId,
                        "checkout":false
                    }
                );

                if (cartObj) {
                    Meteor.call ('findItem', this.props.book._id, cartObj.items,  (error, result) => {
                        if (result != null && result != undefined && result != NaN) {
                            var index = parseInt(result);
                            cartObj.items[index].qty = parseInt(cartObj.items[index].qty) + parseInt(qty);
                        }
                        else {
                            cartObj.items.push ({
                                "itemId":this.props.book._id,
                                "qty":qty
                            });
                        }
                        CartsDB.update ({"_id":cartObj._id}, cartObj);
                    });
                }
                else {
                    var item = {
                        "itemId":this.props.book._id,
                        "qty":qty
                    };
                    cartObj = {
                        "user":userId,
                        "checkout":false,
                        "items":[item]
                    };
                    CartsDB.insert(cartObj);
                }
            }
        }
        else {
            alert ("Please sign in before adding to cart!");
        }
    }
}


export default createContainer((props) => {
    var books = [];
    var book = null;
    var booksCursor;

    var search = props.location.search;
    var searchParam = search.split("?")[1];
    var searchText = null;
    
    if (searchParam) { 
        searchText = searchParam.split("=")[1];
    }
    else {
        search = props.location.pathname;
        searchParam = search.split("/")[2]; 
        if (searchParam) {
            //var objId = new Mongo.ObjectID(searchParam);
            book = BooksDB.findOne ({"_id":searchParam});
        }
    }

    if (searchText) {
        booksCursor = BooksDB.find({
            $or: [{
                    "title": {
                        $regex: "^(.*?(" + searchText + ")[^$]*)$",
                        $options: 'i'
                    }
                },
                {
                    "genre": {
                        $regex: "^(.*?(" + searchText + ")[^$]*)$",
                        $options: 'i'
                    }
                },
                {
                    "author": {
                        $regex: "^(.*?(" + searchText + ")[^$]*)$",
                        $options: 'i'
                    }
                },
                {
                    "category": {
                        $regex: "^" + searchText + "$",
                        $options: 'i'
                    }
                }
            ]
        });
    }
    else {
        booksCursor = BooksDB.find({});
    }

    booksCursor.forEach(function(bookObj) {
        books.push(bookObj);
    });

    return {
        bookCards: books,
        book: book
    }
}, Books);
