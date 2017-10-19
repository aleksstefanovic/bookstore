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
            <div>
              {this.renderHome1()}
              {this.renderHome2()}
              {this.renderHome3()}
              {this.renderHome4()}
            </div>
        );
    }
}
