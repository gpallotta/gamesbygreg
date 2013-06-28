window.Games = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Games.Routers.Main();
    Backbone.history.start();
  }
};

$(document).ready(function() {
  Games.initialize();
});
