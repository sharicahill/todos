import { Mongo } from 'meteor/mongo';

export const Todos = new Mongo.Collection('todos');

if (Meteor.isServer) {
  Meteor.publish('todos', function todosPublication(){
  return Todos.find();
  });
}

// Meteor methods
Meteor.methods({
  addTodo: function(text){
    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorised');
    }
    Todos.insert({
      text: text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTodo: function(todoId){
    Todos.remove(todoId);
  },
  setChecked: function(todoId, setChecked){
    Todos.update(todoId, {$set:{checked: setChecked}});
  }
});
