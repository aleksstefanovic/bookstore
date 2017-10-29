import React, {
    Component,
    PropTypes
} from 'react';
import browserHistory from '../../startup/history.jsx';

export default class CartRow extends Component {
    render() {
        return (
                <tr>
                  <td>
                    <button className="btn-dark" type="submit" onClick={this.viewBook.bind(this)}>VIEW</button>
                  </td>
                  <td>{this.props.cartRow.obj.title}</td>
                  <td>
                    <img className="book-store-row-image" src={this.props.cartRow.obj.thumbnail} alt="Book Image" />
                  </td>
                  <td>{this.props.cartRow.qty}</td>
                  <td>${this.props.cartRow.obj.cost}</td>
                </tr>
        );
    }

    viewBook() {
        var id = this.props.cartRow.itemId;
        browserHistory.push('/books/' + id);
    }
}

CartRow.propTypes = {
    cartRow: PropTypes.object
};

