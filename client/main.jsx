import React from 'react';
import {
    Meteor
} from 'meteor/meteor';
import {
    render
} from 'react-dom';
import {
    renderRoutes
} from '../imports/startup/routes.jsx';

import Home from '../imports/ui/home/home.jsx';
import Nav from '../imports/ui/nav/nav.jsx';
import styles from './main.css'

Meteor.startup(() => {
    render(<Nav />, document.getElementById('nav'));
    render(renderRoutes(), document.getElementById('app'));
});
