import './main.html';

Todos = new Mongo.Collection('todos');

Todos._collection.insert({text:"Start Meteor project",createdAt:new Date()});
Todos._collection.insert({text:"Call mum",createdAt:new Date()});
Todos._collection.insert({text:"Grocery shopping",createdAt:new Date()});

if (Meteor.isClient) {
  // Template Helpers
  Template.main.helpers({
    todos: function(){
      return Todos.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.main.events({
    "submit .new-todo": function(event){
      var text = event.target.text.value;

      Todos._collection.insert({
        text: text,
        createdAt: new Date()
      });

      // Clear Form
      event.target.text.value='';

      // Prevent Submit
      return false;
    },
    "click .toggle-checked": function(){
      Todos._collection.update(this._id, {$set:{checked: ! this.checked}});
    },
    "click .delete-todo": function(){
      if(confirm('Are you sure?')){
        Todos._collection.remove(this._id);
      }
    }
  });
}
