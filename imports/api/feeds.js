import { Mongo } from 'meteor/mongo';
 
export const Feeds = new Mongo.Collection('feeds');

Feeds.allow({
  insert(userId, feed) {
    return true;
  },
  update(userId, feed, fields, modifier ) {
    return true;
  },
  remove(userId, feed) {
    return true;
  }
});
