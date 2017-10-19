import {
    Meteor
} from 'meteor/meteor';
import React, {
    Component
} from 'react';

export default class Home1 extends Component {
    render() {
        return (
            <div className="container book-store-dark">
              <img className="mx-auto d-block book-store-dark" src="/images/logo.svg" alt="Book Store Logo" />

                <label className="book-store-light">SEARCH</label>
                <form className="form-inline book-store-home-search">
                  <div className="form-group">
                    <input type="text" className="book-store-home-searchbar" placeholder="Search..." />
                  </div>
                </form>
            </div>
        );
    }

}
