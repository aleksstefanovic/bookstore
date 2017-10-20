import React, {
    Component
} from 'react';
import styles from './home.css'
import Home1 from './home1.jsx';
import Home2 from './home2.jsx';
import Home3 from './home3.jsx';
import Home4 from './home4.jsx';

export default class Home extends Component {

    renderHome1() {
        return (<Home1 />);
    }
    renderHome2() {
        return (<Home2 />);
    }
    renderHome3() {
        return (<Home3 />);
    }
    renderHome4() {
        return (<Home4 />);
    }

    render() {
        return (
            <div className="book-store-home-section">
                <div className="book-store-home-section book-store-dark">
                  {this.renderHome1()}
                </div>
                <div className="book-store-home-section book-store-not-dark">
                  {this.renderHome2()}
                </div>
                <div className="book-store-home-section book-store-not-dark">
                  {this.renderHome3()}
                </div>
                <div className="book-store-home-section book-store-not-dark">
                  {this.renderHome4()}
                </div>
            </div>
        );
    }
}
