import {
    Meteor
} from 'meteor/meteor';
import React, {
    Component
} from 'react';

export default class Home1 extends Component {
    render() {
        return (
            <div>
            <div className="container book-store-home-section book-store-dark">
              <img className="mx-auto d-block book-store-dark" src="/images/logo.svg" alt="Book Store Logo" />

                <form className="book-store-home-search book-store-dark">
                  <div className="form-group">
                    <label className="col-form-label book-store-light">SEARCH</label>
                    <input type="text" className="form-control book-store-home-searchbar" placeholder="Search..." />
                  </div>
                </form>
            </div>
            <div>
              <input className="book-store-dark book-store-social" type="image" src="/images/twitter.svg" />
              <input className="book-store-dark book-store-social" type="image" src="/images/facebook.svg" />
              <input className="book-store-dark book-store-social" type="image" src="/images/googleplus.svg" />
            </div>
            </div>
        );
    }

}
