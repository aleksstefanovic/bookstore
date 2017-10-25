import React, {
    Component
} from 'react';
import {
    BooksDB
} from '../../api/books.js';
import {
    createContainer
} from 'meteor/react-meteor-data';
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


export default createContainer((props) => {
    var books = [];
    var booksCursor;

    alert(JSON.stringify(props));
    var search = props.location.search;
    var searchParam = search.split("?")[1];
    var searchText = null;
    
    if (searchParam) { 
        searchText = searchParam.split("=")[1];
    }
    else {
           
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
        bookCards: books
    }
}, Books);
