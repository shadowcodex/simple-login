import { Template } from 'meteor/templating';

import './home.html';

Template.register.onCreated(function() {
  this.lastError = new ReactiveVar(null);
});

Template.register.helpers({
  errorMessage: function() {
    return Template.instance().lastError.get();
  }
});

Template.register.events({
    'submit form': function (event, template) {
      event.preventDefault();
      var email = event.target.email.value;
      var password = event.target.password.value;
      var btn = $(event.target).find("input[type=submit]:focus");
      if (btn) {
        if (btn[0].className === 'create') {
          console.log('create user');
          Accounts.createUser({email: email, password: password}, function(error){
            if(error)
              template.lastError.set(error.reason);
            else
              template.lastError.set(null);
          });
        } else if (btn[0].className === 'login') {
          console.log('login user');
          Meteor.loginWithPassword(email, password, function(error){
            if(error)
              template.lastError.set(error.reason);
            else
              template.lastError.set(null);
          });
        }
      } else {
        console.log('default action');
      }
    }
});

Template.register.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});