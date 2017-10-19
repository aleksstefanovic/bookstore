import React from 'react';
import {
    Meteor
} from 'meteor/meteor';
import {
    render
} from 'react-dom';

import Home from '../imports/ui/home/home.jsx';
import Nav from '../imports/ui/nav/nav.jsx';

Meteor.startup(() => {
    render(<Nav />, document.getElementById('nav'));
    render(<Home />, document.getElementById('app'));
});
