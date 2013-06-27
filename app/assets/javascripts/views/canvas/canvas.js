Games.Views.Canvas = Backbone.View.extend({

  template: HandlebarsTemplates['canvas/canvas'],

  initialize: function() {
    $('#canvas-container').html(this.render().el);
    this.canvas = document.getElementById('canvas');
    this.gallows();
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  gallows: function() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(70,290);
    ctx.lineTo(70,25);
    ctx.moveTo(70,25);
    ctx.lineTo(140,25);
    ctx.closePath();
    ctx.stroke();
  },

  noose: function() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(140,25);
    ctx.lineTo(150,50);
    ctx.closePath();
    ctx.stroke();
  },

  head: function() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(150,70,20,0,Math.PI*2);
    ctx.closePath();
    ctx.stroke();
  },

  body: function() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 90);
    ctx.lineTo(150, 140);
    ctx.closePath();
    ctx.stroke();
  },

  leftLeg: function() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 140);
    ctx.lineTo(125, 190);
    ctx.closePath();
    ctx.stroke();
  },

  rightLeg: function() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 140);
    ctx.lineTo(175, 190);
    ctx.closePath();
    ctx.stroke();
  },

  leftArm: function() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 110);
    ctx.lineTo(185, 100);
    ctx.closePath();
    ctx.stroke();
  },

  rightArm: function() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 110);
    ctx.lineTo(115, 100);
    ctx.closePath();
    ctx.stroke();
  },

  sadFace: function() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(155,80);
    ctx.arc(150,80,5,0,Math.PI,true);
    ctx.moveTo(145,65);
    ctx.arc(145,65,2,0,Math.PI*2,true);
    ctx.moveTo(155,65);
    ctx.arc(155,65,2,0,Math.PI*2,true);
    ctx.closePath();
    ctx.stroke();
  }

});
