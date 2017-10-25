import { Mongo } from 'meteor/mongo';
 
export const BooksDB = new Mongo.Collection('books');
