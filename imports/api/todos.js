import { Mongo } from 'meteor/mongo';

export const Todos = new Mongo.Collection('todos');

if (Meteor.isServer) {
  Meteor.publish('todos', function todosPublication(){
    if(this.userId){
      return Todos.find({userId: this.userId});
    }
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
    var todo = Todos.findOne(todoId);
    if(todo.userId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorised');
    }
    Todos.remove(todoId);
  },
  setChecked: function(todoId, setChecked){
    var todo = Todos.findOne(todoId);
    if(todo.userId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorised');
    }
    Todos.update(todoId, {$set:{checked: setChecked}});
  }
});
