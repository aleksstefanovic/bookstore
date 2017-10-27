import React, {
    Component
} from 'react';
import {
    BooksDB
} from '../../api/books.js';
import {
    createContainer
} from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo'
import BookCard from '../../components/bookCard/bookCard.jsx';
import styles from './books.css';
//import background from '../../../client/background.css'

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
                            <div className="col">
                                <h4>{this.props.book.title}</h4>
                                <h5>{this.props.book.author}</h5>
                                <p>{this.props.book.description}</p> 
                            </div>
                            <div className="col">
                                  <img className="mx-auto d-block" src={this.props.book.thumbnail} alt="Book Image" />
                            </div>

                        </div>
                            <p>${this.props.book.price}</p>
                            <div className="row">
                                <div className="col-2">
                                    <input type="number" className="form-control book-store-book-qty" />
                                </div>
                                <div className="col-2">
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
        alert("Added to cart!");
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
            var objId = new Mongo.ObjectID(searchParam);
            book = BooksDB.findOne ({"_id":objId});
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
