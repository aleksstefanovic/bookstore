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

                <form className="book-store-home-search book-store-dark" action="/books" method="get">
                  <div className="form-group">
                    <label className="col-form-label book-store-light">SEARCH</label>
                    <input type="text" className="form-control book-store-home-searchbar" name="filter" placeholder="Search..." />
                  </div>
                </form>
            </div>
            <div>
              <input className="book-store-dark book-store-social" type="image" src="/images/twitter.svg" onClick={this.goToTwitter}/>
              <input className="book-store-dark book-store-social" type="image" src="/images/facebook.svg" onClick={this.goToFacebook}/>
              <input className="book-store-dark book-store-social" type="image" src="/images/googleplus.svg" onClick={this.goToGooglePlus}/>
            </div>
            </div>
        );
    }

    goToTwitter () {
        window.open ("https://www.twitter.com");
    }

    goToFacebook () {
        window.open ("https://www.facebook.com");
    }

    goToGooglePlus () {
        window.open ("https://www.plus.google.com");
    }
}
