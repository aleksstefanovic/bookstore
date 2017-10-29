import { Meteor } from 'meteor/meteor';
import {
    BooksDB
} from '../imports/api/books.js';
import {
    CartsDB
} from '../imports/api/carts.js';
import UserHandler from '../scripts/UserHandler.js';
import Helper from '../scripts/Helper.js';

Meteor.startup(() => {
    Meteor.methods(UserHandler);
    Meteor.methods(Helper);

    Meteor.methods({
      logToConsole (text) {
        this.unblock();
        console.log(text);
      }
    });
});
