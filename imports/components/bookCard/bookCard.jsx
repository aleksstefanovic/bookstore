import React, {
    Component,
    PropTypes
} from 'react';
import browserHistory from '../../startup/history.jsx';

export default class BookCard extends Component {
    render() {
        return (
              <div className="card text-center text-white book-store-medium-dark book-store-books-card">
                <img className="card-img-top" src={this.props.book.image} alt="Card image cap" />
                <div className="card-body book-store-medium-dark">
                  <h4 className="card-title">{this.props.book.title}</h4>
                  <p className="card-text">{this.props.book.shortDescription}</p>
                  <button className="btn-light book-store-books-button" type="submit" onClick={this.viewBook.bind(this)}>VIEW</button>
                </div>
              </div>
        );
    }

    viewBook() {
        var id = this.props.id;
        browserHistory.push('/books/' + id);
    }
}

BookCard.propTypes = {
    book: PropTypes.object
};

