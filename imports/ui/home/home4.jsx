import {
    Meteor
} from 'meteor/meteor';
import React, {
    Component
} from 'react';

export default class Home4 extends Component {
    render() {
        return (
            <div className="container book-store-home-section">
               <br/>
               <br/>
               <h3>Halloween Book Sale!</h3>
                <div className="row">
                    <div className="col">
                       <p>Nam tincidunt nulla sit amet augue malesuada, sed vehicula velit interdum. Duis vel turpis at magna hendrerit laoreet. Quisque mauris turpis, interdum id porta sed, ornare ac diam. Aenean posuere dui a nunc aliquet, ac dictum eros maximus. Integer ac massa tortor. Sed suscipit efficitur dui, sit amet dapibus purus tempor ac. Pellentesque magna arcu, congue quis risus eget, fringilla rhoncus leo.</p>
                    </div>
                    <div className="col">
                      <img className="mx-auto d-block book-store-dark book-store-image" src="http://lorempixel.com/400/200/people/1" alt="Placeholder Image" />
                    </div>
                </div>
            </div>
        );
    }

}
