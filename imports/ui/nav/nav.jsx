import React, {
    Component
} from 'react';
import styles from './nav.css'

export default class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark book-store-nav book-store-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link book-store-nav-hover book-store-nav-item" href="/">Home</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link book-store-nav-hover book-store-nav-item" href="/books">Category 1</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link book-store-nav-hover book-store-nav-item" href="/books">Category 2</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link book-store-nav-hover book-store-nav-item" href="/books">Category 3</a>
              </li>

            </ul>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link book-store-nav-hover book-store-nav-cart book-store-nav-item" href="/cart">CART <span>0</span></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link book-store-button book-store-nav-item" href="/signin">SIGN IN</a>
              </li>
            </ul>
          </div>
        </nav>
        );
    }
}
