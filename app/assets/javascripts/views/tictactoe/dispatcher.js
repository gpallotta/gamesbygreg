Games.Views.TictactoeDispatcher = Backbone.View.extend({

  template: HandlebarsTemplates['tictactoe/index'],

  playingStates: { watching: 0, joining: 1, playing: 2 },

  currentState: false,

  events: {
    'click #ttt-human': 'humanGame',
    'click #ttt-gregbot': 'gregbotGame'
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  initialize: function() {
    var that = this;
    var online0, online1;
  },

  humanGame: function() {
    var view = new Games.Views.TictactoeHuman();
    $('#main-container').html(view.render().el);
    this.setUpMessages();
  },

  gregbotGame: function() {
    var view = new Games.Views.TictactoeGregbot();
    $('#main-container').html(view.render().el);
    $('#your-turn').fadeIn();
  },

  hideButtons: function() {
    $('#ttt-human').hide();
    $('#ttt-gregbot').hide();
  },

  setUpMessages: function() {
    var that = this;
    this.messagesRef = new Firebase('https://games-by-greg.firebaseIO.com/messages');
    this.messagesRef.limit(20).on('child_added', function(snapshot) {
      var message = snapshot.val();
      var html = '<div><strong>' + message.name + '</strong>: ' + message.message + '</div>';
      $('#chatbox').prepend(html);
      $('#chatbox div:first').effect('highlight', {}, 1500);
    });
    $('#messageInput').keyup(function (e) {
      if (e.keyCode == 13) {
        var name = $('#nameInput').val();
        var message = $('#messageInput').val();
        that.messagesRef.push({name:name, message:message});
        $('#messageInput').val('');
      }
    });
  }

});
