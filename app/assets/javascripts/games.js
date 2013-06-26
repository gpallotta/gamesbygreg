window.Games = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Games.Routers.Words;
    Backbone.history.start();
  }
};

$(document).ready(function() {
  Games.initialize();
});
