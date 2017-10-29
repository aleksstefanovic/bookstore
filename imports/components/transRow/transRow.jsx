import React, {
    Component,
    PropTypes
} from 'react';
import browserHistory from '../../startup/history.jsx';

export default class TransRow extends Component {
    render() {
        return (
                <tr>
                  <td>${this.props.transRow.total}</td>
                  <td>{this.props.transRow.checkoutDate}</td>
                  <td>
                    <button className="btn-dark" onClick={this.viewTrans.bind(this)}>VIEW</button>
                  </td>
                </tr>
        );
    }

    viewTrans () {
        var id = this.props.transRow._id;
        browserHistory.push('/carts/' + id);
    }
}

TransRow.propTypes = {
    transRow: PropTypes.object
};

