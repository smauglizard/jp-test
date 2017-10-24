import { Mongo } from 'meteor/mongo';
 
export const Items = new Mongo.Collection('items');

Items.allow({
  insert(userId, item) {
    return true;
  },
  update(userId, item, fields, modifier) {
    return true;
  },
  remove(userId, item) {
    return true;
  }
});
